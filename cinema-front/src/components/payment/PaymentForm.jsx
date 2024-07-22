// src/PaymentForm.js

import React, { useState } from 'react';
import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import axios from 'axios';

const PaymentForm = () => {
  const stripe = useStripe();
  const elements = useElements();
  const [amount, setAmount] = useState('');
  const [currency, setCurrency] = useState('usd');
  const [error, setError] = useState(null);
  const [paymentStatus, setPaymentStatus] = useState(null);

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    const cardElement = elements.getElement(CardElement);

    try {
      const { paymentMethod } = await stripe.createPaymentMethod({
        type: 'card',
        card: cardElement,
      });

      const paymentData = {
        amount: parseFloat(amount),
        currency,
        paymentMethodId: paymentMethod.id,
      };

      const response = await axios.post('http://localhost:8080/payments/process', paymentData);

      if (response.status === 200) {
        setPaymentStatus('Payment successful!');
      } else {
        setPaymentStatus('Payment failed.');
      }
    } catch (error) {
      setError(error.message);
      setPaymentStatus('Payment failed.');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Amount:
        <input
          type="number"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          required
        />
      </label>
      <label>
        Currency:
        <select
          value={currency}
          onChange={(e) => setCurrency(e.target.value)}
          required
        >
          <option value="usd">USD</option>
          <option value="eur">EUR</option>
        </select>
      </label>
      <CardElement />
      <button type="submit" disabled={!stripe}>
        Pay
      </button>
      {error && <div style={{ color: 'red' }}>{error}</div>}
      {paymentStatus && <div>{paymentStatus}</div>}
    </form>
  );
};

export default PaymentForm;
