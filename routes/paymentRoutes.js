// paymentRoutes.js
const express = require('express');
const router = express.Router();
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

router.post('/create-payment-intent', async (req, res) => {
  try {
    let { amount, description, receipt_email, orderId } = req.body;
    // Convert the amount to cents
    amount = Math.round(amount * 100);

    // Check if the amount is less than the minimum charge amount
    if (amount < 50) {
      res.status(400).send({ error: 'The amount must be greater than or equal to 50 cents.' });
      return;
    }

    const paymentIntent = await stripe.paymentIntents.create({
      amount,
      currency: "usd",
      description,
      receipt_email,
      metadata: {
        orderId
      },
      payment_method_types: ['card'],
    });
    res.send({
      clientSecret: paymentIntent.client_secret
    });
  } catch (error) {
    console.error(error);
    res.status(500).send({ error: 'An error occurred while creating the payment intent.' });
  }
});

module.exports = router;