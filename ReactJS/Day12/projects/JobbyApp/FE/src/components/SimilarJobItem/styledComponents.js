import styled from 'styled-components'

export const SimilarProductItem = styled.li`
  display: flex;
  flex-direction: column;
  list-style-type: none;
  max-width: 300px;
  background-color: #272727;
  margin-top: 60px;
  border-radius: 10px;
  margin-bottom: 20px;
  padding: 20px;
  transition: transform 0.2s ease-in-out, box-shadow 0.2s ease-in-out;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
  }

  @media screen and (min-width: 768px) {
    width: 280px;
    margin-right: 20px;
    margin-top: 40px;
  }

  @media screen and (max-width: 480px) {
    max-width: 100%;
    margin-top: 30px;
  }
`

export const CompanyContainer = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 20px;
`

export const CompanyLogo = styled.img`
  width: 65px;
  height: 70px;
  margin-right: 20px;
  border-radius: 8px;
`

export const CompanyTitle = styled.h1`
  color: white;
  font-size: 18px;
  font-weight: 600;
  font-family: 'Roboto';
  padding-bottom: 0px;
  margin-bottom: 8px;
  line-height: 1.2;

  @media screen and (max-width: 480px) {
    font-size: 16px;
  }
`

export const StarIcon = styled.div`
  color: gold;
  width: 20px;
  height: 20px;
  margin-right: 10px;
  display: flex;
  align-items: center;

  svg {
    width: 20px;
    height: 20px;
  }
`

export const Rating = styled.p`
  color: white;
  font-weight: 600;
  font-family: 'Roboto';
  margin: 0;
  font-size: 14px;
`

export const CompanyInfo = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 15px;
  flex-wrap: wrap;
  gap: 10px;
`

export const CompanyDetails = styled.div`
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  gap: 15px;
`

export const LocationIcon = styled.div`
  color: white;
  margin-right: 8px;
  display: flex;
  align-items: center;

  svg {
    width: 16px;
    height: 16px;
  }
`

export const Place = styled.p`
  color: #ffffff;
  font-size: 14px;
  margin: 0;
  font-family: 'Roboto';
`

export const TypeIcon = styled.div`
  color: #ffffff;
  margin-right: 8px;
  display: flex;
  align-items: center;

  svg {
    width: 16px;
    height: 16px;
  }
`

export const LocationGroup = styled.div`
  display: flex;
  align-items: center;
`

export const EmploymentGroup = styled.div`
  display: flex;
  align-items: center;
`

export const Salary = styled.p`
  color: #f1f5f9;
  font-size: 16px;
  font-family: 'Roboto';
  font-weight: 500;
  margin: 0;

  @media screen and (max-width: 480px) {
    font-size: 14px;
  }
`

export const Line = styled.hr`
  border: none;
  height: 1px;
  background-color: #475569;
  margin: 15px 0;
`

export const JobDescription = styled.h1`
  color: #ffffff;
  font-family: 'Roboto';
  font-weight: 500;
  font-size: 16px;
  margin-bottom: 10px;

  @media screen and (max-width: 480px) {
    font-size: 14px;
  }
`

export const JobDescriptionText = styled.p`
  color: #ffffff;
  font-family: 'Roboto';
  font-weight: 300;
  line-height: 1.5;
  margin: 0;
  font-size: 14px;
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;

  @media screen and (max-width: 480px) {
    font-size: 12px;
  }
`

// Legacy styled components for backward compatibility (if needed)
export const SimilarProductImage = styled.img`
  width: 200px;
  border-radius: 8px;
`

export const SimilarProductTitle = styled.h3`
  color: #171f46;
  font-family: 'Roboto';
  font-size: 16px;
  font-weight: 500;
  margin-bottom: 6px;
`

export const SimilarProductsBrand = styled.p`
  color: #594d6d;
  font-family: 'Roboto';
  font-size: 16px;
  margin-top: 6px;
`

export const SimilarProductPriceRatingContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 200px;
`

export const SimilarProductPrice = styled.p`
  color: #171f46;
  font-family: 'Roboto';
  font-size: 18px;
  font-weight: 700;
`

export const SimilarProductRatingContainer = styled.div`
  display: flex;
  align-items: center;
  background-color: #3b82f6;
  border-radius: 6px;
  padding: 4px 8px;
`

export const SimilarProductRating = styled.p`
  color: #ffffff;
  font-family: 'Roboto';
  font-size: 14px;
  font-weight: 500;
  margin: 0 4px 0 0;
`

export const SimilarProductStar = styled.img`
  height: 14px;
  width: 14px;
`
