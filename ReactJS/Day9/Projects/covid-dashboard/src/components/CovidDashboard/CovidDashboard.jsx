import {
  useEffect,
  useState,
  useCallback,
  Suspense,
  lazy
} from 'react';
import { ErrorBoundary } from 'react-error-boundary';
import './CovidDashboard.css';

// Lazy loaded charts
const VaccinationCoverage = lazy(() => import('../VaccinationCoverage/VaccinationCoverage'));
const VaccinationByGender = lazy(() => import('../VaccinationByGender/VaccinationByGender'));
const VaccinationByAge = lazy(() => import('../VaccinationByAge/VaccinationByAge'));

const API_STATUS = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS'
};

const ErrorFallback = ({ error, resetErrorBoundary }) => (
  <div role="alert" className="failure-view">
    <img
      className="failure-image"
      src="https://assets.ccbp.in/frontend/react-js/api-failure-view.png"
      alt="failure view"
    />
    <h1 className="failure-text">Something went wrong</h1>
    <p>{error.message}</p>
    <button onClick={resetErrorBoundary}>Try Again</button>
  </div>
);

function CovidDashboard() {
  const [vaccinationData, setVaccinationData] = useState({});
  const [apiStatus, setApiStatus] = useState(API_STATUS.initial);

  const fetchVaccinationData = useCallback(async () => {
    setApiStatus(API_STATUS.inProgress);
    try {
      const response = await fetch('https://apis.ccbp.in/covid-vaccination-data');
      if (!response.ok) throw new Error('API Request Failed');

      const fetchedData = await response.json();

      const formattedData = {
        last7DaysVaccination: fetchedData.last_7_days_vaccination.map(data => ({
          vaccineDate: data.vaccine_date,
          dose1: data.dose_1,
          dose2: data.dose_2
        })),
        vaccinationByGender: fetchedData.vaccination_by_gender,
        vaccinationByAge: fetchedData.vaccination_by_age
      };

      setVaccinationData(formattedData);
      setApiStatus(API_STATUS.success);
    } catch (error) {
      setApiStatus(API_STATUS.failure);
    }
  }, []);

  useEffect(() => {
    fetchVaccinationData();
  }, [fetchVaccinationData]);

  const renderContent = () => {
    switch (apiStatus) {
      case API_STATUS.success:
        return (
          <>
            <Suspense fallback={<h2>Loading Vaccination Coverage...</h2>}>
              <VaccinationCoverage vaccinationCoverageDetails={vaccinationData.last7DaysVaccination} />
            </Suspense>
            <Suspense fallback={<h2>Loading Vaccination by Gender...</h2>}>
              <VaccinationByGender vaccinationByGenderDetails={vaccinationData.vaccinationByGender} />
            </Suspense>
            <Suspense fallback={<h2>Loading Vaccination by Age...</h2>}>
              <VaccinationByAge vaccinationByAgeDetails={vaccinationData.vaccinationByAge} />
            </Suspense>
          </>
        );
      case API_STATUS.failure:
        return <ErrorFallback error={new Error("Unable to fetch vaccination data")} resetErrorBoundary={fetchVaccinationData} />;
      case API_STATUS.inProgress:
        return (
          <div className="loading-view" data-testid="loader">
            <h1>Loading...</h1>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="app-container">
      <div className="cowin-dashboard-container">
        <div className="logo-container">
          <img
            className="logo"
            src="https://assets.ccbp.in/frontend/react-js/cowin-logo.png"
            alt="website logo"
          />
          <h1 className="logo-heading">Co-WIN</h1>
        </div>
        <h1 className="heading">CoWIN Vaccination in India</h1>
        <ErrorBoundary FallbackComponent={ErrorFallback} onReset={fetchVaccinationData}>
          {renderContent()}
        </ErrorBoundary>
      </div>
    </div>
  );
}

export default CovidDashboard;
