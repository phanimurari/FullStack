import { BsFillStarFill, BsBriefcaseFill } from 'react-icons/bs'
import { MdLocationOn } from 'react-icons/md'
import {
  CardLink,
  JobItemCard,
  CompanyLogo,
  CompanyContainer,
  CompanyTitle,
  StarIcon,
  Rating,
  CompanyDetails,
  LocationIcon,
  Place,
  TypeIcon,
  CompanyInfo,
  Salary,
  Line,
  JobDescription,
  JobDescriptionText
} from './styledComponents'

const JobItemCards = props => {
  const { item } = props
  
  return (
    <CardLink to={`/jobs/${item.id}`}>
      <JobItemCard>
        <CompanyContainer>
          <CompanyLogo
            src={item.companyLogoUrl}
            alt="company logo"
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
            <LocationIcon>
              <MdLocationOn />
            </LocationIcon>
            <Place>{item.location}</Place>
            <TypeIcon>
              <BsBriefcaseFill />
            </TypeIcon>
            <Place>{item.employment}</Place>
          </CompanyDetails>
          <Salary>{item.packagePerAnnum}</Salary>
        </CompanyInfo>
        
        <Line />
        
        <div>
          <JobDescription>Description</JobDescription>
          <JobDescriptionText>{item.jobDescription}</JobDescriptionText>
        </div>
      </JobItemCard>
    </CardLink>
  )
}

export default JobItemCards
