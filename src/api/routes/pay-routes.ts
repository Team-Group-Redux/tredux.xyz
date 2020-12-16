import { stripe } from '../server';
import { Stripe } from 'stripe';

import { Router } from 'express';
import { getUser, sendError } from '../modules/api-utils';
import Deps from '../../utils/deps';
import Users from '../../data/users';
import bodyParser from 'body-parser';

const items: Stripe.Checkout.SessionCreateParams.LineItem[] = [
  {
    name: '✪ Redux+ [1 Mês]',
    description: 'Support ✪ Redux, and unlock exclusive features!',
    amount: 1250,
    currency: 'brl',
    quantity: 1
  },
  {
    name: '✪ Redux+ [3 Meses]',
    description: 'Support ✪ Redux, and unlock exclusive features!',
    amount: 2000,
    currency: 'brl',
    quantity: 1
  },
  {
    name: '✪ Redux+ [Forever]',
    description: 'Support ✪ Redux, and unlock exclusive features!',
    amount: 5000,
    currency: 'brl',
    quantity: 1
  }
];

export const router = Router();

const users = Deps.get<Users>(Users);

router.get('/user/pay', async(req, res) => {
  try {
    const { key, plan } = req.query as any;
    const { id } = await getUser(key);

    const session = await stripe.checkout.sessions.create({
      success_url: `${ process.env.DASHBOARD_URL}/payment-success`,
      cancel_url: `${ process.env.DASHBOARD_URL}/plus`,
      payment_method_types: ['card'],
      metadata: { id, plan },
      line_items: [ items[+plan] ]
    });
    res.send(session);
  } catch (error) { sendError(res, 400, error); }
});

router.post('/stripe-webhook', bodyParser.raw({ type: 'application/json' }), async(req, res) => {
  try {
    let event = stripe.webhooks
      .constructEvent(req.body, req.headers['stripe-signature'],  process.env.STRIPE_WEBHOOK_SECRET);
    
    if (event.type === 'checkout.session.completed') {
      const { id, plan } = (event.data.object as any).metadata;
      await users.givePlus(id, +plan);

      return res.json({ success: true });
    }
    res.json({ received: true });
  } catch (error) { sendError(res, 400, error); }
});