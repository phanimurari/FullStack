import styled from 'styled-components'
import { Link } from 'react-router-dom'

export const CardLink = styled(Link)`
  text-decoration: none;
`

export const JobItemCard = styled.li`
  background-color: #272727;
  padding: 10px 25px 15px 25px;
  border-radius: 15px;
  margin-bottom: 25px;
  list-style: none;
  transition: transform 0.2s ease-in-out;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  }
`

export const CompanyLogo = styled.img`
  width: 65px;
  height: 70px;
  margin-right: 20px;
`

export const CompanyContainer = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 0px;
`

export const CompanyTitle = styled.h1`
  color: white;
  font-size: 20px;
  font-weight: 600;
  font-family: 'Roboto';
  padding-bottom: 0px;
  margin-bottom: 0px;
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

export const CompanyInfo = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
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
  margin: 15px 0;
`

export const JobDescription = styled.h1`
  color: #ffffff;
  font-family: 'Roboto';
  font-weight: 400;
  font-size: 18px;
  margin-bottom: 10px;
`

export const JobDescriptionText = styled.p`
  color: #ffffff;
  font-family: 'Roboto';
  font-weight: 300;
  line-height: 1.5;
  margin: 0;
`
