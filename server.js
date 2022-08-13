const express = require('express');
const bodyParser = require('body-parser');
require('dotenv').config();
const stripe = require('stripe')(process.env.SECRET_KEY);
var cors = require('cors');
const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());

app.post('/payment', async (req, res) => {
  let status, error;
  const { token, amount } = req.body;
    try {
        await stripe.charges.create({
            source: token.id,
            amount,
            currency: 'usd',
        })
        //res.status(200).json('success')
        status = "success"
    } catch (error) {
        console.log(error)
        status = "failure"
        //res.status(400).json('failure')
    }
    res.json({error,status})
});

app.listen(3001, (error) => {
  if (error) throw error;
  console.log('Server start on port : 3001');
});
