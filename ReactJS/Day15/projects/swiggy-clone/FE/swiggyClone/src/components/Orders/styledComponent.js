import styled from 'styled-components';

export const OrdersContainer = styled.div`
  padding: 2rem;
  max-width: 800px;
  margin: 0 auto;
`;

export const PageTitle = styled.h1`
  font-size: 2rem;
  margin-bottom: 1.5rem;
  color: #333;
  text-align: center;
`;

export const OrderCard = styled.div`
  background: #fff;
  border: 1px solid #ddd;
  border-radius: 8px;
  padding: 1.5rem;
  margin-bottom: 1.5rem;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);

  h3 {
    font-size: 1.2rem;
    margin-bottom: 1rem;
    color: #555;
  }

  ul {
    list-style: none;
    padding: 0;
    margin-bottom: 1rem;
  }
`;

export const OrderItem = styled.li`
  font-size: 1rem;
  color: #666;
  margin-bottom: 0.5rem;
`;

export const OrderStatus = styled.p`
  font-size: 1rem;
  font-weight: bold;
  color: #333;
  margin-bottom: 1rem;
`;

export const OrderTotal = styled.p`
  font-size: 1.1rem;
  font-weight: bold;
  text-align: right;
  color: #e67e22;
`;

export const Loading = styled.div`
  font-size: 1.5rem;
  text-align: center;
  padding: 2rem;
`;

export const Error = styled.div`
  font-size: 1.2rem;
  color: #e74c3c;
  text-align: center;
  padding: 2rem;
`;
