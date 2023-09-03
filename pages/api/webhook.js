import { mongooseConnect } from "@/lib/mongoose";
import { buffer} from 'micro';
const stripe = require('stripe')(process.env.STRIPE_SK);
import { Order } from '@/models/Order';

const endpointSecret = "whsec_dff59563edf4453b0d764816cce704b3ae816fb17ace27abfb14908c2a66c226";

export default async function handler(req,res) {
  await mongooseConnect();
  const sig = req.headers['stripe-signature'];

  let event;

  try {
    event = stripe.webhooks.constructEvent(await buffer(req), sig, endpointSecret);
  } catch (err) {
    res.status(400).send(`Webhook Error: ${err.message}`);
    return;
  }

  // Handle the event
  switch (event.type) {
    case 'checkout.session.completed':
      const data = event.data.object;
      const orderId = data.metadata.orderId;
      const paid = data.payment_status === 'paid';
      if (orderId && paid) {
        await Order.findByIdAndUpdate(orderId,{
          paid:true,
        })
      }
      break;
    default:
      console.log(`Unhandled event type ${event.type}`);
  }

  res.status(200).send('ok');
}

export const config = {
  api: {bodyParser:false,}
};

//humour-assure-supple-fair
//acct_1NHtGBJ3myE9Bx2z