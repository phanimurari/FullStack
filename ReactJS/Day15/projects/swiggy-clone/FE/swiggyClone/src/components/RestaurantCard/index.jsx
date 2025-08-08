import React from 'react';
import { Link } from 'react-router-dom';
import {
  Card,
  CardImage,
  CardBody,
  CardTitle,
  CardText,
  RatingContainer,
  Rating,
  StarIcon,
} from './styledComponent';

const RestaurantCard = ({ restaurant }) => {
  const { id, name, cuisine, user_rating, image } = restaurant;
  const { rating, reviews } = user_rating;

  return (
    <Link to={`/restaurant/${id}`}  style={{ textDecoration: 'none' }}>
      <Card>
        <CardImage src={image} alt={name} />
        <CardBody>
          <CardTitle>{name}</CardTitle>
          <CardText>{cuisine}</CardText>
          <RatingContainer>
            <Rating>
              <StarIcon>★</StarIcon> {rating}
            </Rating>
            <CardText>({reviews} ratings)</CardText>
          </RatingContainer>
        </CardBody>
      </Card>
    </Link>
  );
};

export default RestaurantCard;
