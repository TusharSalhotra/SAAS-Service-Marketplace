import { useMemo, useState } from 'react';
import { AppRoute, getRouteFromPath } from './routes/routes';
import Layout from './pages/layout/layout';
import Dashboard from './pages/dashboard';
import EnrollmentForm from './pages/enrollment-form';
import OfficeEnrollment from './pages/office';
import Marketplace from './pages/marketplace';
import ClientPortal from './pages/client-portal';

function App() {
  const [route, setRoute] = useState<AppRoute>(() => getRouteFromPath(window.location.pathname));

  const navigate = (nextRoute: AppRoute) => {
    window.history.pushState(null, '', nextRoute);
    setRoute(nextRoute);
  };

  const page = useMemo(() => {
    if (route === '/marketplace') return <Marketplace />;
    if (route === '/client-portal') return <ClientPortal />;
    if (route === '/enrollment-form') return <EnrollmentForm onComplete={() => navigate('/office-enrollment')} />;
    if (route === '/office-enrollment') return <OfficeEnrollment onStart={() => navigate('/enrollment-form')} />;
    return <Dashboard onStart={() => navigate('/enrollment-form')} />;
  }, [route]);

  return (
    <Layout activeRoute={route} onNavigate={navigate}>
      {page}
    </Layout>
  );
}

export default App;
