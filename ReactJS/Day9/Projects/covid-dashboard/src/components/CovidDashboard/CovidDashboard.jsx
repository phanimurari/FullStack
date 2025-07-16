import { use, Suspense, lazy } from 'react';
import { ErrorBoundary } from 'react-error-boundary';
import './CovidDashboard.css';

// Lazy loaded subcomponents
const VaccinationCoverage = lazy(() => import('../VaccinationCoverage/VaccinationCoverage'));
const VaccinationByGender = lazy(() => import('../VaccinationByGender/VaccinationByGender'));
const VaccinationByAge = lazy(() => import('../VaccinationByAge/VaccinationByAge'));

// 🔁 Global memoized promise (prevents refetching on every render)
let vaccinationPromise;

function fetchVaccinationData() {
  if (!vaccinationPromise) {
    vaccinationPromise = fetch('https://apis.ccbp.in/covid-vaccination-data')
      .then((res) => {
        if (!res.ok) {
          throw new Error('Failed to fetch vaccination data');
        }
        return res.json();
      })
      .then((data) => ({
        last7DaysVaccination: data.last_7_days_vaccination.map((d) => ({
          vaccineDate: d.vaccine_date,
          dose1: d.dose_1,
          dose2: d.dose_2,
        })),
        vaccinationByGender: data.vaccination_by_gender,
        vaccinationByAge: data.vaccination_by_age,
      }));
  }
  return vaccinationPromise;
}

function ErrorFallback({ error, resetErrorBoundary }) {
  return (
    <div className="failure-view" role="alert">
      <img
        className="failure-image"
        src="https://assets.ccbp.in/frontend/react-js/api-failure-view.png"
        alt="failure view"
      />
      <h1 className="failure-text">Something went wrong</h1>
      <pre>{error.message}</pre>
      <button onClick={() => {
        vaccinationPromise = null; // reset the promise
        resetErrorBoundary();
      }}>
        Retry
      </button>
    </div>
  );
}

function DashboardContent() {
  // 🔁 Suspends until resolved or throws if error
  const vaccinationData = use(fetchVaccinationData());

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
}

function CovidDashboard() {
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

        <ErrorBoundary FallbackComponent={ErrorFallback}>
          <Suspense fallback={<h2>Loading Dashboard...</h2>}>
            <DashboardContent />
          </Suspense>
        </ErrorBoundary>
      </div>
    </div>
  );
}

export default CovidDashboard;
