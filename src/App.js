import './App.css';
import StripeCheckout from 'react-stripe-checkout';
import { useState } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';

const MySwal = withReactContent(Swal);

function App() {
  const publishableKey =
    'pk_test_51Kul9TF5AX92kPVJOSRsOOMNn0FFPQ551IZqkH1EAVFrTmyKUVy1uNT9xEoavyFe1ieW3ZuKs2mpBi3djZATM0iC00bPEJsmr0';

  const [product] = useState({
    name: 'HeadPhone',
    price: 15,
  });

  const priceForStripe = product.price * 100;

  const handleSucces = () => {
    MySwal.fire({
      icon: 'success',
      title: 'Payment was succes',
      time: 4000,
    });
  };

  const handleFailure = () => {
    MySwal.fire({
      icon: 'error',
      title: 'Payment was not succes',
      time: 4000,
    });
  };

  const payNow = async (token) => {
    try {
      const response = await axios({
        url: 'http://localhost:3001/payment',
        method: 'post',
        data: {
          amount: priceForStripe,
          token,
        },
      });
      if (response.status === 200) {
        handleSucces();
      }
    } catch (error) {
      handleFailure()
      console.log(error.message);
    }
  };

  return (
    <div className='App'>
      <div style={{ background: 'black', color: 'white' }}>
        <br />
        <h2>React Stripe Integration with Node Backend</h2>
        <br />
      </div>
      <div>
        <br />
        <span>Product : {product.name}</span>
        <br />
        <br />
        {}
        <span>Price : </span>${product.price}
        <br />
        <br />
      </div>
      <div>
        <StripeCheckout
          stripeKey={publishableKey}
          label='Pay Now'
          name='Pay with Credit Card'
          billingAddress
          shippingAddress
          amount={priceForStripe}
          description={`Your total is ${product.price}`}
          token={payNow}
        />
      </div>
    </div>
  );
}

export default App;
