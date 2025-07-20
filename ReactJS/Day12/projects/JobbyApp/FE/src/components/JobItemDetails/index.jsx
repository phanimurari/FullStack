import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { BsFillStarFill, BsBriefcaseFill } from 'react-icons/bs'
import { FaExternalLinkAlt } from 'react-icons/fa'
import { MdLocationOn } from 'react-icons/md'
import Header from '../Header'
import SimilarJobItem from '../SimilarJobItem'
import Cookies from 'js-cookie'
import {
  JobContainer,
  JobCardDetailsContainer,
  ItemDetails,
  JobsListOrder,
  JobItemCard,
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
  Salary,
  Line,
  WebsiteLink,
  WebsiteLinkAnchor,
  Website,
  JobDescription1,
  JobDescription2,
  JobDescriptionText,
  SkillContainer,
  SkillCard,
  SkillImage,
  JobDescriptionText1,
  JobDescriptionText3,
  Office,
  CompanyBuilding,
  SimilarContainer,
  SimilarProductsHeading,
  SimilarProductsList,
  LoaderContainer,
  ProductsErrorViewContainer,
  ProductsFailureImg,
  ProductFailureHeadingText,
  ProductsFailureDescription,
  RetryButton
} from './styledComponents'

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'INPROGRESS',
}

const JobItemDetails = () => {
  const [jobDetails, setJobDetails] = useState({})
  const [apiStatus, setApiStatus] = useState(apiStatusConstants.initial)
  const [similarProductsData, setSimilarProductsData] = useState([])
  
  const { id } = useParams()

  useEffect(() => {
    getJobCardDetails()
  }, [])

  const formattedData = (e) => ({
    companyLogoUrl: e.company_logo_url,
    companyWebsiteUrl: e.company_website_url,
    employmentType: e.employment_type,
    skills: e.skills,
    id: e.id,
    jobDescription: e.job_description,
    packagePerAnnum: e.package_per_annum,
    rating: e.rating,
    title: e.title,
    location: e.location,
    lifeAtCompany: e.life_at_company,
  })

  const getFormattedData = (e) => ({
    companyLogoUrl: e.company_logo_url,
    employmentType: e.employment_type,
    id: e.id,
    jobDescription: e.job_description,
    rating: e.rating,
    title: e.title,
    location: e.location,
  })

  const getJobCardDetails = async () => {
    setApiStatus(apiStatusConstants.inProgress)
    const jwtToken = Cookies.get('jwt_token')
    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: 'GET',
    }
    const apiUrl = `https://apis.ccbp.in/jobs/${id}`
    const response = await fetch(apiUrl, options)
    if (response.ok === true) {
      const data = await response.json()
      const updatedData = formattedData(data.job_details)
      const updatedSimilarProductsData = data.similar_jobs.map(
        (eachSimilarProduct) => getFormattedData(eachSimilarProduct)
      )
      setJobDetails(updatedData)
      setApiStatus(apiStatusConstants.success)
      setSimilarProductsData(updatedSimilarProductsData)
    } else {
      setApiStatus(apiStatusConstants.failure)
    }
  }

  const renderProgressView = () => (
    <LoaderContainer data-testid="loader">
      <h1>Loading...</h1>
    </LoaderContainer>
  )

  const renderSuccessJobView = () => {
    const item = jobDetails
    return (
      <>
        <ItemDetails>
          <JobsListOrder>
            <JobItemCard>
              <CompanyContainer>
                <CompanyLogo
                  src={item.companyLogoUrl}
                  alt="job details company logo"
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
                  <Place>{item.employmentType}</Place>
                </CompanyDetails>
                <Salary>{item.packagePerAnnum}</Salary>
              </CompanyInfo>
              
              <Line />
              
              <div>
                <WebsiteLink>
                  <JobDescription1>Description</JobDescription1>
                  <WebsiteLinkAnchor
                    href={item.companyWebsiteUrl}
                    target="_blank"
                    rel="noreferrer"
                  >
                    <Website>Visit</Website>
                    <FaExternalLinkAlt />
                  </WebsiteLinkAnchor>
                </WebsiteLink>
                <JobDescriptionText>{item.jobDescription}</JobDescriptionText>
              </div>
              
              <div>
                <JobDescription2>Skills</JobDescription2>
                <SkillContainer>
                  {item.skills?.map((e) => (
                    <SkillCard key={e.name}>
                      <SkillImage src={e.image_url} alt={e.name} />
                      <JobDescriptionText1>{e.name}</JobDescriptionText1>
                    </SkillCard>
                  ))}
                </SkillContainer>
              </div>
              
              <div>
                <JobDescription2>Life at Company</JobDescription2>
                <Office>
                  <JobDescriptionText3>
                    {item.lifeAtCompany?.description}
                  </JobDescriptionText3>
                  <CompanyBuilding
                    src={item.lifeAtCompany?.image_url}
                    alt="life at company"
                  />
                </Office>
              </div>
            </JobItemCard>
          </JobsListOrder>
        </ItemDetails>
        
        <SimilarContainer>
          <SimilarProductsHeading>Similar Jobs</SimilarProductsHeading>
          <SimilarProductsList>
            {similarProductsData.map((eachSimilarProduct) => (
              <SimilarJobItem
                productDetails={eachSimilarProduct}
                key={eachSimilarProduct.id}
              />
            ))}
          </SimilarProductsList>
        </SimilarContainer>
      </>
    )
  }

  const renderFailureView = () => (
    <ProductsErrorViewContainer>
      <ProductsFailureImg
        src="https://assets.ccbp.in/frontend/react-js/failure-img.png"
        alt="failure view"
      />
      <ProductFailureHeadingText>
        Oops! Something Went Wrong
      </ProductFailureHeadingText>
      <ProductsFailureDescription>
        We cannot seem to find the page you are looking for
      </ProductsFailureDescription>
      <RetryButton
        type="button"
        onClick={getJobCardDetails}
      >
        Retry
      </RetryButton>
    </ProductsErrorViewContainer>
  )

  const renderJobDetails = () => {
    switch (apiStatus) {
      case apiStatusConstants.success:
        return renderSuccessJobView()
      case apiStatusConstants.inProgress:
        return renderProgressView()
      case apiStatusConstants.failure:
        return renderFailureView()
      default:
        return null
    }
  }

  return (
    <JobContainer>
      <JobCardDetailsContainer>
        {renderJobDetails()}
      </JobCardDetailsContainer>
    </JobContainer>
  )
}

export default JobItemDetails
