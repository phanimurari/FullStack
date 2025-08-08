import React, { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import axiosInstance from '../../api/axios';
import {
  OrdersContainer,
  OrderCard,
  OrderItem,
  OrderStatus,
  OrderTotal,
  PageTitle,
  Loading,
  Error,
} from './styledComponent';

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { user } = useAuth();

  useEffect(() => {
    const fetchOrders = async () => {
      if (!user) {
        setLoading(false);
        return;
      }

      try {
        const response = await axiosInstance.get(`/users/orders`);
        if (response.data.success) {
          setOrders(response.data.data);
        }
      } catch (err) {
        setError('Failed to fetch orders. Please try again later.');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, [user]);

  if (loading) {
    return <Loading>Loading your orders...</Loading>;
  }

  if (error) {
    return <Error>{error}</Error>;
  }

  return (
    <OrdersContainer>
      <PageTitle>Your Orders</PageTitle>
      {orders.length === 0 ? (
        <p>You have no orders yet.</p>
      ) : (
        orders.map((order) => (
          <OrderCard key={order._id}>
            <h3>Order ID: {order._id}</h3>
            <OrderStatus>Status: {order.orderStatus}</OrderStatus>
            <ul>
              {order.items.map((item) => (
                <OrderItem key={item._id}>
                  {item.name} - {item.quantity} x ₹{item.price}
                </OrderItem>
              ))}
            </ul>
            <OrderTotal>Total: ₹{order.totalAmount}</OrderTotal>
          </OrderCard>
        ))
      )}
    </OrdersContainer>
  );
};

export default Orders;
