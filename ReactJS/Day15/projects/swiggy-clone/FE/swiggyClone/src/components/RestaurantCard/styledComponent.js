import styled from 'styled-components';

export const Card = styled.div`
  border: 1px solid #e2e2e2;
  border-radius: 10px;
  overflow: hidden;
  transition: transform 0.2s;
  &:hover {
    transform: scale(1.05);
  }
`;

export const CardImage = styled.img`
  width: 100%;
  height: 150px;
  object-fit: cover;
`;

export const CardBody = styled.div`
  padding: 15px;
`;

export const CardTitle = styled.h3`
  font-size: 1.2rem;
  margin: 0 0 10px;
`;

export const CardText = styled.p`
  margin: 0;
  color: #666;
`;

export const RatingContainer = styled.div`
  display: flex;
  align-items: center;
  margin-top: 10px;
`;

export const Rating = styled.div`
  display: flex;
  align-items: center;
  background-color: #4caf50;
  color: white;
  padding: 2px 8px;
  border-radius: 5px;
  margin-right: 10px;
`;

export const StarIcon = styled.span`
  margin-right: 5px;
`;
