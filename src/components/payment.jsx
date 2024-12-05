import React, { useState, useEffect } from "react";
import { createClient } from "@supabase/supabase-js";

const PayPalButton = ({total, onSuccess}) => {
  // const [total, setTotal] = useState(null);
  // Initialize Supabase client
  const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
  const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY;
  const supabase = createClient(supabaseUrl, supabaseKey);
  const accessToken = "WU9VUl9DTElFTlRfSUQ6QVRzVlU4LVZvQS1LUDUzZTE0T09rSlpWUWNBZUxRQlJEckZYaC1qdWw4dXdqSFJOa3cyVk5FVTVKYmUwVlpKVVA4a2FZSTAxVXBzWGk0aHI="
  useEffect(() => {
    // Check if PayPal SDK is loaded
    // if (!window.paypal) {
      const script = document.createElement("script");
      script.src = "https://www.sandbox.paypal.com/sdk/js?client-id=AT610ovnk_ToT_UARmLIr503I-Mj_co4Bt4-3GEYNacvBQsx3TbPhr6RorP0C_sNyIUMPLLxlZ_BSc-l"; // Replace with your PayPal client ID
      script.async = true;
      script.onload = () => {
        // Initialize PayPal Buttons after the script is loaded
        window.paypal.Buttons({
          style: {
            shape: "rect",
            layout: "vertical",
            color: "gold",
            label: "paypal",
          },
          createOrder: async (data, actions) => {
            try {
              // Request to your backend to create the order
              const response = await fetch("/api/orders", {
                method: "POST",
                headers: {
                  "Content-Type": "application/json",
                  "Authorization": `Bearer ${accessToken}`,
                },
                body: JSON.stringify({
                  intent: "CAPTURE",
                  purchase_units: [
                    {
                      amount: {
                        currency_code: "USD",
                        value: total.toString(),  // Amount in the smallest unit (cents) if needed
                      },
                    },
                  ],
                }),
              });
              console.log("Response Status:", response.status);  // Log the status code

              if (!response.ok) {
                const errorText = await response.text();
                console.log("Error Response Text:", errorText);  // Log the raw error response
                return; // Stop execution if response is not ok
              }
              console.log("orderDate");
              const orderData = await response.json();
              console.log("orderDate", orderData);
              if (!orderData.orderID) {
                const errorDetail = orderData.details[0];
                errorMessage = errorDetail? `${errorDetail.issue} ${errorDetail.description} (${orderData.debug_id})`: "Unexpected error occurred, please try again.";
                throw new Error(errorMessage);
              }
              return orderData.orderID;
              } catch (error) {
              console.error("Error creating order:", error);
              alert("Failed to create order fe.");
              return null; // Returning null or undefined will cancel the PayPal transaction
            }
          },

          onApprove: async (data, actions) => {
              const response = await fetch(`/api/orders/${data.orderID}/capture`, {
              method: "POST",
              body: JSON.stringify({
              orderID: data.orderID
              })
              })
              const details = await response.json();
              // Show success message to buyer
              // alert(`Transaction completed by ${details.payer.name.given_name}`);
              if (onSuccess) {
                await onSuccess();
              }
          },
        }).render("#paypal-button-container");
      };

      // Append the script to the document body
      document.body.appendChild(script);
    // }
  }, []);

  return <div id="paypal-button-container"></div>;
};

export default PayPalButton;
