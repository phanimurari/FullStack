import React from 'react';
import { useNavigate } from 'react-router-dom';
import { OrderSuccessContainer } from './styledComponents';
import { FaCheckCircle } from 'react-icons/fa';

const OrderSuccess = () => {
  const navigate = useNavigate();

  return (
    <OrderSuccessContainer>
      <FaCheckCircle className="success-icon" />
      <h1>Payment Successful</h1>
      <p>Thank you for ordering.</p>
      <p>Your payment is successfully completed.</p>
      <button onClick={() => navigate('/')}>Go To Home Page</button>
    </OrderSuccessContainer>
  );
};

export default OrderSuccess;
