import {
  NotFoundContainer,
  NotFoundImg,
  NotFoundHeading,
  NotFoundDescription
} from './styledComponents'

const NotFound = () => (
  <NotFoundContainer>
    <NotFoundImg
      src="https://assets.ccbp.in/frontend/react-js/jobby-app-not-found-img.png"
      alt="not found"
    />
    <NotFoundHeading>Page Not Found</NotFoundHeading>
    <NotFoundDescription>
      We're sorry, the page you requested could not be found
    </NotFoundDescription>
  </NotFoundContainer>
)

export default NotFound
