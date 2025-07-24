import styled from 'styled-components'

export const JobContainer = styled.div`
  background-color: #000000;
  min-height: 100vh;
`

export const JobCardDetailsContainer = styled.div`
  width: 100%;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
`

export const ItemDetails = styled.div`
  width: 80%;
  max-width: 1500px;
  background-color: #272727;
  margin-top: 60px;
  border-radius: 10px;
  margin-bottom: 20px;
`

export const JobsListOrder = styled.div`
  padding: 0;
`

export const JobItemCard = styled.div`
  background-color: #272727;
  padding: 25px;
  border-radius: 10px;
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
`

export const CompanyTitle = styled.h1`
  color: white;
  font-size: 20px;
  font-weight: 600;
  font-family: 'Roboto';
  margin-bottom: 8px;
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
`

export const CompanyInfo = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
`

export const CompanyDetails = styled.div`
  display: flex;
  align-items: center;
`

export const LocationIcon = styled.div`
  color: white;
  margin-right: 10px;
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
  margin-right: 20px;
  margin: 0 20px 0 0;
`

export const TypeIcon = styled.div`
  color: #ffffff;
  margin-right: 10px;
  display: flex;
  align-items: center;

  svg {
    width: 16px;
    height: 16px;
  }
`

export const Salary = styled.p`
  color: #f1f5f9;
  font-size: 18px;
  font-family: 'Roboto';
  font-weight: 500;
  margin: 0;
`

export const Line = styled.hr`
  border: none;
  height: 1px;
  background-color: #475569;
  margin: 20px 0;
`

export const WebsiteLink = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 15px;
`

export const WebsiteLinkAnchor = styled.a`
  text-decoration: none;
  color: #6366f1;
  display: flex;
  align-items: center;
  transition: color 0.2s ease;

  &:hover {
    color: #4f46e5;
  }
`

export const Website = styled.span`
  font-size: 18px;
  margin-right: 10px;
  font-family: 'Roboto';
`

export const JobDescription1 = styled.h1`
  color: #ffffff;
  font-family: 'Roboto';
  font-weight: 500;
  font-size: 20px;
  margin: 0;
`

export const JobDescription2 = styled.h1`
  color: #ffffff;
  font-family: 'Roboto';
  font-weight: 500;
  font-size: 20px;
  margin-top: 40px;
  margin-bottom: 20px;
`

export const JobDescriptionText = styled.p`
  color: #ffffff;
  font-family: 'Roboto';
  font-weight: 300;
  line-height: 1.6;
  margin-bottom: 30px;
`

export const SkillContainer = styled.ul`
  display: flex;
  flex-wrap: wrap;
  width: 100%;
  margin-top: 20px;
  justify-content: flex-start;
  margin-bottom: 40px;
  padding-left: 0;
  list-style: none;
`

export const SkillCard = styled.li`
  display: flex;
  align-items: center;
  width: 300px;
  margin: 10px 20px 10px 0;
`

export const SkillImage = styled.img`
  width: 40px;
  height: 40px;
  margin-right: 15px;
`

export const JobDescriptionText1 = styled.p`
  color: #ffffff;
  font-family: 'Roboto';
  font-weight: 500;
  margin: 0;
`

export const JobDescriptionText3 = styled.p`
  color: #ffffff;
  width: 60%;
  font-family: 'Roboto';
  font-weight: 400;
  line-height: 1.8;
  font-size: 17px;
  margin: 0;
`

export const Office = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 30px;
`

export const CompanyBuilding = styled.img`
  width: 400px;
  border-radius: 8px;
`

export const SimilarContainer = styled.div`
  width: 80%;
  max-width: 1500px;
  margin-bottom: 40px;
`

export const SimilarProductsHeading = styled.h1`
  color: #ffffff;
  font-family: 'Roboto';
  font-size: 28px;
  font-weight: 500;
  margin: 0 0 30px 0;

  @media screen and (min-width: 768px) {
    font-size: 32px;
    margin-top: 40px;
  }
`

export const SimilarProductsList = styled.ul`
  display: flex;
  flex-direction: column;
  padding-left: 0;
  list-style: none;

  @media screen and (min-width: 768px) {
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: space-between;
    margin-top: 0px;
    padding-top: 0px;
  }
`

export const LoaderContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 60vh;
  color: white;
  font-family: 'Roboto';
`

export const ProductsErrorViewContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  min-height: 60vh;
  padding: 20px;
`

export const ProductsFailureImg = styled.img`
  width: 270px;
  margin-bottom: 20px;

  @media screen and (min-width: 768px) {
    width: 350px;
  }
`

export const ProductFailureHeadingText = styled.h1`
  color: #ffffff;
  font-family: 'Roboto';
  font-size: 24px;
  font-weight: 500;
  text-align: center;
  margin-bottom: 10px;

  @media screen and (min-width: 768px) {
    font-size: 28px;
  }
`

export const ProductsFailureDescription = styled.p`
  color: #94a3b8;
  font-family: 'Roboto';
  font-size: 16px;
  text-align: center;
  margin-bottom: 20px;
  line-height: 1.4;

  @media screen and (min-width: 768px) {
    font-size: 18px;
  }
`

export const RetryButton = styled.button`
  background-color: #4f46e5;
  color: white;
  font-size: 12px;
  outline: none;
  border: none;
  padding: 12px 24px;
  border-radius: 4px;
  font-family: 'Roboto';
  font-weight: 500;
  cursor: pointer;
  transition: background-color 0.2s ease;

  &:hover {
    background-color: #4338ca;
  }

  &:active {
    transform: translateY(1px);
  }
`
