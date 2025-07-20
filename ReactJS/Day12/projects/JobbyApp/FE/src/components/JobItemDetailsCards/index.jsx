import React, { useState, useEffect } from 'react'
import { BsSearch } from 'react-icons/bs'
import Cookies from 'js-cookie'
import FilterGroup from '../FilterGroup'
import ProfileCard from '../ProfileCard'
import JobItemCards from '../JobItemCards'
import {
  JobCard,
  SideBar,
  Line,
  ResultsContainer,
  SearchContainer,
  SearchBar,
  SearchButton,
  SearchIcon,
  JobsListOrder,
  LoaderContainer,
  NoProductsView,
  NoProductsImg,
  NoProductsHeading,
  NoProductsDescription,
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

const JobItemDetailsCards = (props) => {
  const [jobsList, setJobsList] = useState([])
  const [apiStatus, setApiStatus] = useState(apiStatusConstants.initial)
  const [searchInput, setSearchInput] = useState('')
  const [checkedBoxes, setCheckedBoxes] = useState([])
  const [salaryFilter, setSalaryFilter] = useState('')

  useEffect(() => {
    getJobItemDetails()
  }, [searchInput, checkedBoxes, salaryFilter])

  const formattedData = (e) => ({
    companyLogoUrl: e.company_logo_url,
    employment: e.employment_type,
    id: e.id,
    jobDescription: e.job_description,
    packagePerAnnum: e.package_per_annum,
    rating: e.rating,
    title: e.title,
    location: e.location,
  })

  const getJobItemDetails = async () => {
    setApiStatus(apiStatusConstants.inProgress)
    const jwtToken = Cookies.get('jwt_token')
    const text = checkedBoxes.join()
    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: 'GET',
    }
    const apiUrl = `https://apis.ccbp.in/jobs?employment_type=${text}&minimum_package=${salaryFilter}&search=${searchInput}`
    console.log(apiUrl)
    const response = await fetch(apiUrl, options)
    if (response.ok === true) {
      const data = await response.json()
      const updateData = data.jobs.map((e) => formattedData(e))
      setJobsList(updateData)
      setApiStatus(apiStatusConstants.success)
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
    if (jobsList.length > 0) {
      return (
        <JobsListOrder>
          {jobsList.map((e) => (
            <JobItemCards key={e.id} item={e} />
          ))}
        </JobsListOrder>
      )
    }
    return (
      <NoProductsView>
        <NoProductsImg
          src="https://assets.ccbp.in/frontend/react-js/no-jobs-img.png"
          alt="no jobs"
        />
        <NoProductsHeading>No Jobs Found</NoProductsHeading>
        <NoProductsDescription>
          We could not find any Jobs. Try other filters.
        </NoProductsDescription>
      </NoProductsView>
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
      <RetryButton type="button" onClick={getJobItemDetails}>
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

  const onChangeSearchInput = (e) => {
    setSearchInput(e.target.value)
  }

  const onSearchEnter = (e) => {
    if (e.key === 'Enter') {
      getJobItemDetails()
    }
  }

  const onSearch = () => {
    getJobItemDetails()
  }

  const updateCheckboxes = (id) => {
    setCheckedBoxes((prev) => {
      if (prev.includes(id)) {
        return prev.filter((item) => item !== id)
      } else {
        return [...prev, id]
      }
    })
  }

  const updateSalary = (id) => {
    setSalaryFilter(id)
  }

  const { salaryRangesList, employmentTypesList } = props

  return (
    <JobCard>
      <SideBar>
        <ProfileCard />
        <Line />
        <FilterGroup
          salaryRangesList={salaryRangesList}
          employmentTypesList={employmentTypesList}
          selectedCheckBox={updateCheckboxes}
          updateSalary={updateSalary}
        />
      </SideBar>

      <ResultsContainer>
        <SearchContainer>
          <SearchBar
            type="search"
            placeholder="Search"
            onChange={onChangeSearchInput}
            onKeyDown={onSearchEnter}
            value={searchInput}
          />
          <SearchButton
            type="button"
            onClick={onSearch}
            data-testid="searchButton"
          >
            <SearchIcon>
              <BsSearch />
            </SearchIcon>
          </SearchButton>
        </SearchContainer>
        {renderJobDetails()}
      </ResultsContainer>
    </JobCard>
  )
}

export default JobItemDetailsCards
