import { useState, useEffect } from 'react';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import axiosInstance from '../../api/axios';
import { OfferImage } from './styledComponent';

const Offers = () => {
  const [offers, setOffers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOffers = async () => {
      try {
        const response = await axiosInstance.get('/restaurant/offers');
        setOffers(response.data.offers);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching offers:', error);
        setLoading(false);
      }
    };

    fetchOffers();
  }, []);

  if (loading) {
    return <div>Loading offers...</div>;
  }

  return (
    <Carousel
      showThumbs={false}
      autoPlay
      infiniteLoop
      showStatus={false}
    >
      {offers.map((offer) => (
        <div key={offer.id}>
          <OfferImage src={offer.image_url} alt={`Offer ${offer.id}`} />
        </div>
      ))}
    </Carousel>
  );
};

export default Offers;
