import { createServer } from "http";
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
import { createClient } from "@supabase/supabase-js";
import fx from "money";

dotenv.config();
const app = express();
app.use(bodyParser.json());

// Supabase setup
const supabaseUrl = process.env.VITE_SUPABASE_URL;
const supabaseKey = process.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseKey) {
  throw new Error("Supabase URL and Key must be provided!");
}

const supabase = createClient(supabaseUrl, supabaseKey);

// PayPal setup
const { PAYPAL_CLIENT_ID, PAYPAL_CLIENT_SECRET } = process.env;

const client = new Client({
  clientCredentialsAuthCredentials: {
    oAuthClientId: PAYPAL_CLIENT_ID,
    oAuthClientSecret: PAYPAL_CLIENT_SECRET,
  },
  timeout: 0,
  environment: Environment.Sandbox,
  logging: {
    logLevel: LogLevel.Info,
    logRequest: { logBody: true },
    logResponse: { logHeaders: true },
  },
});

const ordersController = new OrdersController(client);

// Convert money setup
fx.base = "VND";
fx.rates = {
  VND: 1,
  USD: 0.000039,
};

// PayPal Order Creation
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
            value: totalAmount.toLocaleString("en-US"),
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
        orderId: responseData.id,
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

// API Routes
app.post("/api/orders", async (req, res) => {
  try {
    const { purchase_units } = req.body;

    if (!purchase_units || purchase_units.length === 0) {
      return res.status(400).json({ error: "Invalid purchase units." });
    }

    const totalAmount = purchase_units[0]?.amount?.value;

    if (!totalAmount || isNaN(totalAmount)) {
      return res.status(400).json({ error: "Invalid total amount." });
    }

    const { orderId } = await createOrder(totalAmount);
    res.status(201).json({ orderID: orderId });
  } catch (error) {
    console.error("Failed to create order:", error);
    res.status(500).json({ error: "Failed to create order." });
  }
});

// Capture Order
app.post("/api/orders/:orderID/capture", async (req, res) => {
  try {
    const { orderID } = req.params;
    const { jsonResponse, httpStatusCode } = await captureOrder(orderID);
    res.status(httpStatusCode).json(jsonResponse);
  } catch (error) {
    console.error("Failed to capture order:", error);
    res.status(500).json({ error: "Failed to capture order." });
  }
});

// Export handler for Vercel
export default (req, res) => {
  const server = createServer(app);
  server.emit("request", req, res);
};
