import styled from 'styled-components'

export const JobCard = styled.div`
  display: flex;
  margin: auto;
  width: 80%;
  max-width: 1460px;
  margin-top: 30px;
  gap: 20px;

  @media screen and (max-width: 768px) {
    flex-direction: column;
    width: 90%;
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
  border: none;
  height: 1px;
  background-color: #475569;
  margin: 20px 0;
`

export const ResultsContainer = styled.div`
  flex: 1;
  min-height: 100vh;
`

export const SearchContainer = styled.div`
  display: flex;
  align-items: center;
  background-color: #272727;
  border-radius: 8px;
  margin-bottom: 30px;
  overflow: hidden;
`

export const SearchBar = styled.input`
  background-color: #272727;
  color: #ffffff;
  font-family: 'Roboto';
  font-size: 16px;
  border: none;
  outline: none;
  padding: 12px 16px;
  flex: 1;

  &::placeholder {
    color: #94a3b8;
  }

  &:focus {
    background-color: #374151;
  }
`

export const SearchButton = styled.button`
  background-color: #272727;
  border: none;
  outline: none;
  padding: 12px 16px;
  cursor: pointer;
  color: #ffffff;
  transition: background-color 0.2s ease;

  &:hover {
    background-color: #374151;
  }

  &:active {
    background-color: #1f2937;
  }
`

export const SearchIcon = styled.div`
  width: 20px;
  height: 20px;
  display: flex;
  align-items: center;
  justify-content: center;

  svg {
    width: 18px;
    height: 18px;
  }
`

export const JobsListOrder = styled.ul`
  list-style-type: none;
  padding-left: 0px;
  margin: 0;
`

export const LoaderContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 60vh;
  color: white;
  font-family: 'Roboto';
  font-size: 18px;
`

export const NoProductsView = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding-bottom: 64px;
  margin-top: 48px;
  text-align: center;

  @media screen and (min-width: 768px) {
    margin-left: 30px;
    width: 100%;
    min-height: 100vh;
    padding-bottom: 0;
    margin-top: 0px;
  }
`

export const NoProductsImg = styled.img`
  width: 250px;
  height: 180px;
  margin-bottom: 20px;

  @media screen and (min-width: 768px) {
    width: 459px;
    height: 315px;
  }
`

export const NoProductsHeading = styled.h1`
  color: #ffffff;
  font-family: 'Roboto';
  font-size: 20px;
  font-weight: 500;
  line-height: 1.3;
  margin-bottom: 12px;

  @media screen and (min-width: 768px) {
    margin-top: 32px;
    font-size: 24px;
  }
`

export const NoProductsDescription = styled.p`
  text-align: center;
  color: #94a3b8;
  font-family: 'Roboto';
  font-size: 14px;
  width: 90%;
  max-width: 288px;
  line-height: 1.4;
  margin: 0;

  @media screen and (min-width: 768px) {
    margin-top: 12px;
    font-size: 18px;
    width: 60%;
    max-width: 466px;
  }
`

export const ProductsErrorViewContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-top: 48px;
  padding-bottom: 64px;
  text-align: center;

  @media screen and (min-width: 768px) {
    margin-top: 0px;
    margin-left: 30px;
    width: 70%;
    padding-bottom: 0;
    min-height: 60vh;
  }
`

export const ProductsFailureImg = styled.img`
  width: 250px;
  height: 200px;
  margin-bottom: 20px;

  @media screen and (min-width: 768px) {
    width: 400px;
    height: 350px;
  }
`

export const ProductFailureHeadingText = styled.h1`
  color: #ffffff;
  font-family: 'Roboto';
  font-size: 20px;
  font-weight: 500;
  line-height: 1.3;
  margin-bottom: 12px;

  @media screen and (min-width: 768px) {
    font-size: 24px;
  }
`

export const ProductsFailureDescription = styled.p`
  text-align: center;
  color: #94a3b8;
  font-family: 'Roboto';
  font-size: 14px;
  width: 90%;
  max-width: 288px;
  line-height: 1.4;
  margin-bottom: 20px;

  @media screen and (min-width: 768px) {
    font-size: 18px;
    width: 60%;
    max-width: 466px;
  }
`

export const RetryButton = styled.button`
  background-color: #4f46e5;
  color: white;
  font-size: 14px;
  outline: none;
  border: none;
  padding: 12px 24px;
  border-radius: 6px;
  font-family: 'Roboto';
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    background-color: #4338ca;
    transform: translateY(-1px);
  }

  &:active {
    transform: translateY(0);
  }
`
