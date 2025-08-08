import styled from 'styled-components';

export const OrderSuccessContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 80vh;
  text-align: center;

  .success-icon {
    color: #28a745;
    font-size: 5rem;
    margin-bottom: 1rem;
  }

  h1 {
    font-size: 2rem;
    margin-bottom: 1rem;
  }

  p {
    font-size: 1.2rem;
    margin-bottom: 0.5rem;
  }

  button {
    background-color: #f79f1f;
    color: white;
    border: none;
    padding: 0.8rem 1.5rem;
    font-size: 1rem;
    border-radius: 5px;
    cursor: pointer;
    margin-top: 1.5rem;
    transition: background-color 0.3s ease;

    &:hover {
      background-color: #e68a00;
    }
  }
`;
