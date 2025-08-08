import styled from 'styled-components';

export const CartContainer = styled.div`
  padding: 20px;
`;

export const CartItem = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  border: 1px solid #ddd;
  border-radius: 10px;
  padding: 15px;
  margin-bottom: 15px;

  img {
    width: 100px;
    height: 100px;
    object-fit: cover;
    border-radius: 10px;
    margin-right: 15px;
  }

  .item-details {
    flex-grow: 1;
    h3 {
      margin: 0;
    }
    p {
      margin: 5px 0;
    }
  }

  .quantity-controls {
    display: flex;
    align-items: center;

    button {
      background-color: #f0ad4e;
      color: white;
      border: none;
      padding: 5px 10px;
      border-radius: 5px;
      cursor: pointer;
      margin: 0 5px;
    }
  }

  .price {
    font-weight: bold;
    margin: 0 20px;
  }

  .delete-btn {
    background: none;
    border: none;
    color: #d9534f;
    font-size: 20px;
    cursor: pointer;
  }
`;

export const OrderTotal = styled.div`
  margin-top: 20px;
  text-align: right;
  font-size: 18px;
  font-weight: bold;
  border-top: 1px solid #ddd;
  padding-top: 10px;

  p {
    margin: 5px 0;
  }

  .actions {
    margin-top: 10px;
    button {
      background-color: #f0ad4e;
      color: white;
      border: none;
      padding: 10px 20px;
      border-radius: 5px;
      cursor: pointer;
      margin-left: 10px;
    }
  }
`;

export const EmptyCartContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  margin-top: 50px;

  h3 {
    color: orange;
    font-size: 24px;
  }

  button {
    background-color: orange;
    color: white;
    border: none;
    padding: 10px 20px;
    border-radius: 5px;
    cursor: pointer;
    margin-top: 10px;
  }
`;
