import {
  HomeContainer,
  HomeIntro,
  HomeHeading,
  HomeDescription,
  HomeButton,
  JobsLink
} from './styledComponents'

const Home = () => {
  return (
    <HomeContainer>
      <HomeIntro>
        <HomeHeading>Find the Job That Fits Your Life</HomeHeading>
        <HomeDescription>
          Millions of people are searching for jobs, salary information,
          company reviews. Find the job that fits your abilities and potential
        </HomeDescription>
        <JobsLink to="/jobs">
          <HomeButton type="button">
            Find Jobs
          </HomeButton>
        </JobsLink>
      </HomeIntro>
    </HomeContainer>
  )
}

export default Home
