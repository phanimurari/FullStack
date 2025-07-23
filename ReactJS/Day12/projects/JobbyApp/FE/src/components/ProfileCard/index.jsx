import { useState, useEffect } from 'react'
import Cookies from 'js-cookie'
import {
  FilterSection,
  ProfileImage,
  ProfileUsername,
  ProfileBio,
  LoaderContainer,
  RetryButton
} from './styledComponents'

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'INPROGRESS',
}

const ProfileCard = () => {
  const [profileData, setProfileData] = useState({})
  const [apiStatus, setApiStatus] = useState(apiStatusConstants.initial)

  useEffect(() => {
    getProfile()
  }, [])

  const getProfile = async () => {
    setApiStatus(apiStatusConstants.inProgress)
    const jwtToken = Cookies.get('jwt_token')
    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: 'GET',
    }
    
    try {
      const response = await fetch('https://jobbyapp-be.onrender.com/api/auth/profile', options)
      if (response.ok === true) {
        const data = await response.json()
        const updateData = {
          name: data.profile_details.name,
          imageUrl: data.profile_details.profile_image_url,
          bio: data.profile_details.short_bio,
        }
        setProfileData(updateData)
        setApiStatus(apiStatusConstants.success)
      } else {
        setApiStatus(apiStatusConstants.failure)
      }
    } catch (error) {
      setApiStatus(apiStatusConstants.failure)
    }
  }

  const renderProfile = () => {
    return (
      <FilterSection>
        <ProfileImage
          src={profileData.imageUrl}
          alt="profile"
        />
        <ProfileUsername>{profileData.name}</ProfileUsername>
        <ProfileBio>{profileData.bio}</ProfileBio>
      </FilterSection>
    )
  }

  const renderProgressView = () => (
    <LoaderContainer data-testid="loader">
      <h1>Loading....</h1>
    </LoaderContainer>
  )

  const renderFailureView = () => (
    <LoaderContainer>
      <RetryButton type="button" onClick={getProfile}>
        Retry
      </RetryButton>
    </LoaderContainer>
  )

  const renderProfileDetails = () => {
    switch (apiStatus) {
      case apiStatusConstants.success:
        return renderProfile()
      case apiStatusConstants.inProgress:
        return renderProgressView()
      case apiStatusConstants.failure:
        return renderFailureView()
      default:
        return null
    }
  }

  return <>{renderProfileDetails()}</>
}

export default ProfileCard
