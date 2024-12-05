
import express from "express";
import dotenv from "dotenv";
import {
  ApiError,
  CheckoutPaymentIntent,
  Client,
  Environment,
  LogLevel,
  OrdersController,
} from "@paypal/paypal-server-sdk";
import bodyParser from "body-parser";
import { createClient } from '@supabase/supabase-js'
import fx from "money";

// Set exchange rates and base currency
fx.base = "VND";  // Set the base currency to VND
fx.rates = {
    VND: 1,        // 1 VND = 1 VND
    USD: 0.000039,  // Example rate: 1 VND = 0.000042 USD (you can replace this with the actual rate)
};

dotenv.config();
const accessToken = "A21AAKfkBl5ruoTptEo1J2hnfj2ySZHJAFAtQP1sQ1_P0iR0eBSKCiySsXifdBq2_HxYP1P7bmgyQ7KOFDfcNbqAympdkcCJg"

const app = express();
app.use(bodyParser.json()); // Middleware to parse JSON bodies

const supabaseUrl = process.env.VITE_SUPABASE_URL;
const supabaseKey = process.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseKey) {
  throw new Error("Supabase URL and Key must be provided!");
}

const supabase = createClient(supabaseUrl, supabaseKey);

const { PAYPAL_CLIENT_ID, PAYPAL_CLIENT_SECRET, PORT = 3000 } = process.env;

const client = new Client({
  clientCredentialsAuthCredentials: {
    oAuthClientId: PAYPAL_CLIENT_ID,
    oAuthClientSecret: PAYPAL_CLIENT_SECRET,
  },
  timeout: 0,
  environment: Environment.Sandbox,
  logging: {
    logLevel: LogLevel.Info,
    logRequest: {
      logBody: true,
    },
    logResponse: {
      logHeaders: true,
    },
  },
});

const ordersController = new OrdersController(client);

/**
 * Create an order to start the transaction.
 * @see https://developer.paypal.com/docs/api/orders/v2/#orders_create
 */
const createOrder = async (totalAmount) => {
  totalAmount = fx(totalAmount).from("VND").to("USD").toFixed(2);
  console.log("Converted amount:", totalAmount);
  const collect = {
    body: {
      intent: CheckoutPaymentIntent.Capture,
      purchaseUnits: [
        {
          amount: {
            currencyCode: "USD",
            value: totalAmount.toLocaleString("en-US"), // Use the totalAmount passed from the frontend
          },
        },
      ],
    },
  };

  try {
    const { body, ...httpResponse } = await ordersController.ordersCreate(collect);
    const responseData = JSON.parse(body);

    if (responseData.id) {
      return {
        orderId: responseData.id, // Return the order ID from the response
        httpStatusCode: httpResponse.statusCode,
      };
    } else {
      throw new Error("No order ID returned from PayPal");
    }
  } catch (error) {
    if (error instanceof ApiError) {
      throw new Error(error.message);
    }
    throw new Error("Failed to create PayPal order");
  }
};

app.post("/api/orders", async (req, res) => {
  try {
    const { purchase_units } = req.body; // Expecting purchase_units directly from frontend

    if (!purchase_units || purchase_units.length === 0) {
      return res.status(400).json({ error: "Invalid purchase units." });
    }
    // Calculate the total amount from purchase_units (assuming only one unit here)
    const totalAmount = purchase_units[0]?.amount?.value;

    if (!totalAmount || isNaN(totalAmount)) {
      return res.status(400).json({ error: "Invalid total amount." });
    }

    // Call the createOrder function to create the order with PayPal
    const { orderId, httpStatusCode } = await createOrder(totalAmount);
      // Return the PayPal order ID back to the frontend
      res.status(201).json({ orderID: orderId });
      } catch (error) {
        console.error("Failed to create order:", error);
        res.status(500).json({ error: "Failed to create order be." });
      }
  });


  app.post("/api/orders/:orderID/capture", async (req, res) => {
    try {
      const { orderID } = req.params;
      const { jsonResponse, httpStatusCode } = await captureOrder(orderID);
      res.status(httpStatusCode).json(jsonResponse);
    } catch (error) {
      console.error("Failed to create order:", error);
      res.status(500).json({ error: "Failed to capture order capture." });
    }
  });

app.listen(PORT, () => {
  console.log(`Node server listening at http://localhost:${PORT}/`);
});

