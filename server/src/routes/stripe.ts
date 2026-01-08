import { Router } from "express";
import express from "express";
import Stripe from 'stripe';
import dotenv from 'dotenv';
import { auth } from "../middlewares/auth";
dotenv.config();

const route = Router();

const stripe = new Stripe(process.env.STRIPE_PRIVATE_KEY!, {
    apiVersion: "2025-08-27.basil"
});

route.post('/stripe',async (req, res) => {
    try {
        const { priceId } = req.body;

        
        const session = await stripe.checkout.sessions.create({
            mode: 'subscription',
            payment_method_types: ['card'],
            line_items: [{
                price: priceId,
                quantity: 1,}],
            success_url: `${process.env.FRONT_END_PORT}/Success.html?session_id={CHECKOUT_SESSION_ID}`,
            cancel_url: `${process.env.FRONT_END_PORT}/Cancel`,
            
          
        });

        res.json({  url: session.url  });
    } catch (error: any) {
        console.log("this is a stripe back-end Err", error);
        res.status(500).json({ error: error.message });
    }
});





// Define your Stripe webhook secret, usually from environment variables
const endpointSecret = process.env.STRIPE_WEBHOOK_SECRET;

route.post('/webhook', express.raw({ type: 'application/json' }),(req, res) => {
    let event = req.body;
    
    if (endpointSecret) {
        // Get the signature sent by Stripe
        const signature = req.headers['stripe-signature'];
        try {
            event = stripe.webhooks.constructEvent(
                req.body,
                signature as string,
                endpointSecret
            );
        } catch (err: any) {
            console.log(`⚠️  Webhook signature verification failed.`, err.message);
            res.sendStatus(400);
            return;     
            }
    }
    
    switch (event.type) {
        case 'payment_intent.succeeded':
            const paymentIntent = event.data.object;
            // Then define and call a method to handle the successful payment intent.
            // handlePaymentIntentSucceeded(paymentIntent);
            break;
        case 'payment_method.attached':
            const paymentMethod = event.data.object;
            // Then define and call a method to handle the successful attachment of a PaymentMethod.
            // handlePaymentMethodAttached(paymentMethod);
            break;
        // ... handle other event types
        default:
            console.log(`Unhandled event type ${event.type}`);
    }
    
    // Return a response to acknowledge receipt of the event
    res.json({ received: true });
});

export default route;