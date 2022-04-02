/**
 * @author Meha Desai
 */

import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { Typography } from "antd";
import {
    PaymentElement,
    useStripe,
    useElements
} from "@stripe/react-stripe-js";
import { Box } from "@mui/material";
import AppButton from "../../components/Button/Button";

const { Title } = Typography;

export default function Payment() {
    const stripe = useStripe();
    const elements = useElements();

    const [message, setMessage] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const { state } = useLocation()

    useEffect(() => {
        localStorage.setItem("formData", JSON.stringify(state?.formValues))

        if (!stripe) {
            return;
        }

        const clientSecret = new URLSearchParams(window.location.search).get(
            "payment_intent_client_secret"
        );

        if (!clientSecret) {
            return;
        }

        stripe.retrievePaymentIntent(clientSecret).then(({ paymentIntent }) => {
            switch (paymentIntent.status) {
                case "succeeded":
                    setMessage("Payment succeeded!");
                    break;
                case "processing":
                    setMessage("Your payment is processing.");
                    break;
                case "requires_payment_method":
                    setMessage("Your payment was not successful, please try again.");
                    break;
                default:
                    setMessage("Something went wrong.");
                    break;
            }
        });
    }, [stripe]);

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!stripe || !elements) {
            // Stripe.js has not yet loaded.
            // Make sure to disable form submission until Stripe.js has loaded.
            return;
        }

        setIsLoading(true);

        const { error } = await stripe.confirmPayment({
            elements,
            confirmParams: {
                return_url: "http://localhost:3000/confirmation",
            },
        });

        if (error.type === "card_error" || error.type === "validation_error") {
            setMessage(error.message);
        } else {
            setMessage("An unexpected error occured.");
        }

        setIsLoading(false);
    };

    return (
        <div>
            <Title level={2} className="title">
                Payment Method
            </Title>
            <PaymentElement id="payment-element" />
            <Box sx={{
                marginTop: "20px"
            }}>
                <AppButton color="secondary"
                    disabled={isLoading || !stripe || !elements} id="submit" onClick={handleSubmit}>
                    <span id="button-text">
                        {isLoading ? <div className="spinner" id="spinner"></div> : "Pay now"}
                    </span>
                </AppButton>
            </Box>
            {message && <div id="payment-message">{message}</div>}
        </div>
    );
}