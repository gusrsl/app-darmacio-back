// paymentRoutes.js
const express = require('express');
const router = express.Router();
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

/**
 * @swagger
 * /create-payment-intent:
 *   post:
 *     summary: Crea una intención de pago con Stripe
 *     tags: [Payments]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               amount:
 *                 type: number
 *                 description: El monto a cobrar en dólares
 *               description:
 *                 type: string
 *                 description: Descripción del pago
 *               receipt_email:
 *                 type: string
 *                 description: El correo electrónico donde se enviará el recibo
 *               orderId:
 *                 type: string
 *                 description: El ID del pedido asociado al pago
 *     responses:
 *       200:
 *         description: La intención de pago ha sido creada correctamente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 clientSecret:
 *                   type: string
 *       400:
 *         description: El monto es menor a 50 centavos
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *       500:
 *         description: Ocurrió un error al crear la intención de pago
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 */
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


/**
 * @swagger
 * /get-payment-intent/{id}:
 *   get:
 *     summary: Obtiene los detalles de una intención de pago con Stripe
 *     tags: [Payments]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: El ID de la intención de pago
 *     responses:
 *       200:
 *         description: Los detalles de la intención de pago
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/PaymentIntent'
 *       404:
 *         description: La intención de pago no existe
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *       500:
 *         description: Ocurrió un error al obtener los detalles de la intención de pago
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 */
router.get('/get-payment-intent/:id', async (req, res) => {
  try {
    const paymentIntent = await stripe.paymentIntents.retrieve(req.params.id);
    res.send(paymentIntent);
  } catch (error) {
    console.error(error);
    if (error.type === 'StripeInvalidRequestError') {
      res.status(404).send({ error: 'The payment intent does not exist.' });
    } else {
      res.status(500).send({ error: 'An error occurred while retrieving the payment intent.' });
    }
  }
});


/**
 * @swagger
 * /get-all-payment-intents:
 *   get:
 *     summary: Obtiene todas las intenciones de pago de la cuenta de Stripe
 *     tags: [Payments]
 *     responses:
 *       200:
 *         description: La lista de todas las intenciones de pago
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/PaymentIntent'
 *       500:
 *         description: Ocurrió un error al obtener las intenciones de pago
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 */
router.get('/get-all-payment-intents', async (req, res) => {
  try {
    const paymentIntents = await stripe.paymentIntents.list();
    res.send(paymentIntents);
  } catch (error) {
    console.error(error);
    res.status(500).send({ error: 'An error occurred while retrieving the payment intents.' });
  }
});


router.get('/get-all-customers', async (req, res) => {
  try {
    const customers = await stripe.customers.list();
    res.send(customers);
  } catch (error) {
    console.error(error);
    res.status(500).send({ error: 'An error occurred while retrieving the customers.' });
  }
});


router.get('/get-all-charges', async (req, res) => {
  try {
    const charges = await stripe.charges.list();
    res.send(charges);
  } catch (error) {
    console.error(error);
    res.status(500).send({ error: 'An error occurred while retrieving the charges.' });
  }
});


module.exports = router;