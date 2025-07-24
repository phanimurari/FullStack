import styled from 'styled-components'

export const JobContainer = styled.div`
  min-height: 100vh;
  background-color: #000000;
  padding-top: 0;
`

export const JobDetailsContainer = styled.div`
  width: 100%;
  max-width: 1600px;
  margin: 0 auto;
  display: flex;
  justify-content: center;
  padding: 0 10px;
`

// Additional styled components that might be used by child components
export const JobsListOrder = styled.ul`
  list-style-type: none;
  padding-left: 0px;
  margin: 0;
`

export const JobCardContainer = styled.div`
  display: flex;
  margin: auto;
  width: 80%;
  max-width: 1700px;
  margin-top: 30px;
  gap: 60px;

  @media screen and (max-width: 768px) {
    flex-direction: column;
    gap: 20px;
    width: 95%;
  }
`

export const ProfileName = styled.h2`
  color: white;
  font-family: 'Roboto';
  margin: 0;
`

export const FilterSection = styled.div`
  background-image: url('https://assets.ccbp.in/frontend/react-js/profile-bg.png');
  background-size: cover;
  width: 330px;
  height: 210px;
  padding: 40px 20px 20px 20px;
  border-radius: 20px;
  display: flex;
  flex-direction: column;
  
  @media screen and (max-width: 768px) {
    width: 100%;
    max-width: 330px;
  }
`

export const ProfileImage = styled.img`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  margin-bottom: 15px;
`

export const ProfileUsername = styled.h3`
  font-size: 20px;
  font-weight: 500;
  font-family: 'Roboto';
  color: #6366f1;
  margin: 0 0 15px 0;
`

export const ProfileBio = styled.p`
  color: #2c364c;
  font-weight: 400;
  font-family: 'Roboto';
  font-size: 14px;
  line-height: 1.4;
  margin: 0;
`

export const LoaderContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 330px;
  height: 210px;
  color: white;
  font-family: 'Roboto';

  @media screen and (max-width: 768px) {
    width: 100%;
  }
`

export const SideBar = styled.div`
  display: flex;
  flex-direction: column;
  width: 40%;
  max-width: 330px;

  @media screen and (max-width: 768px) {
    width: 100%;
    max-width: none;
  }
`

export const Line = styled.hr`
  width: 100%;
  margin-top: 30px;
  border: none;
  height: 1px;
  background-color: #475569;
`

export const ResultsContainer = styled.div`
  flex: 1;
  margin-left: 60px;

  @media screen and (max-width: 768px) {
    margin-left: 0;
    margin-top: 30px;
  }
`

export const SearchContainer = styled.div`
  width: 400px;
  max-width: 100%;
  border: 1px solid #475569;
  border-radius: 5px;
  display: flex;
  justify-content: space-between;
  height: 40px;
  margin-bottom: 30px;
  overflow: hidden;
`

export const SearchBar = styled.input`
  background-color: transparent;
  outline: none;
  border: none;
  color: white;
  width: 100%;
  padding: 15px 20px;
  font-family: 'Roboto';
  font-size: 14px;

  &::placeholder {
    color: #94a3b8;
  }

  &:focus {
    background-color: rgba(55, 65, 81, 0.3);
  }
`

export const SearchIcon = styled.button`
  background-color: #2c364c;
  border: none;
  outline: none;
  width: 50px;
  color: white;
  height: 100%;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: background-color 0.2s ease;

  &:hover {
    background-color: #374151;
  }

  &:active {
    background-color: #1f2937;
  }
`
