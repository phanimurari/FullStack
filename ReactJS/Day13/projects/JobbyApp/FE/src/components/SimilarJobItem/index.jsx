import React from 'react'
import { BsFillStarFill, BsBriefcaseFill } from 'react-icons/bs'
import { MdLocationOn } from 'react-icons/md'
import {
  SimilarProductItem as StyledSimilarProductItem,
  CompanyContainer,
  CompanyLogo,
  CompanyTitle,
  StarIcon,
  Rating,
  CompanyInfo,
  CompanyDetails,
  LocationIcon,
  Place,
  TypeIcon,
  LocationGroup,
  EmploymentGroup,
  Salary,
  Line,
  JobDescription,
  JobDescriptionText
} from './styledComponents'

const SimilarProductItem = props => {
  const { productDetails } = props
  const item = productDetails

  return (
    <StyledSimilarProductItem key={item.id}>
      <CompanyContainer>
        <CompanyLogo
          src={item.companyLogoUrl}
          alt="similar job company logo"
        />
        <div>
          <CompanyTitle>{item.title}</CompanyTitle>
          <CompanyContainer>
            <StarIcon>
              <BsFillStarFill />
            </StarIcon>
            <Rating>{item.rating}</Rating>
          </CompanyContainer>
        </div>
      </CompanyContainer>
      
      <CompanyInfo>
        <CompanyDetails>
          <LocationGroup>
            <LocationIcon>
              <MdLocationOn />
            </LocationIcon>
            <Place>{item.location}</Place>
          </LocationGroup>
          <EmploymentGroup>
            <TypeIcon>
              <BsBriefcaseFill />
            </TypeIcon>
            <Place>{item.employmentType}</Place>
          </EmploymentGroup>
        </CompanyDetails>
        <Salary>{item.packagePerAnnum}</Salary>
      </CompanyInfo>
      
      <Line />
      
      <div>
        <JobDescription>Description</JobDescription>
        <JobDescriptionText>{item.jobDescription}</JobDescriptionText>
      </div>
    </StyledSimilarProductItem>
  )
}

export default SimilarProductItem
