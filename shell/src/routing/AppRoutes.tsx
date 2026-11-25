import { Route, Routes } from 'react-router';
import RemoteApp from '../components/RemoteApp';
import HomePage from '../pages/HomePage';
import NotFoundPage from '../pages/NotFoundPage';

const AppRoutes = () => (
  <Routes>
    <Route path="/" element={<HomePage />} />
    <Route
      path="/agents"
      element={<RemoteApp key="agents" remote="agents" name="Агенты" />}
    />
    <Route
      path="/incidents"
      element={<RemoteApp key="incidents" remote="incidents" name="Инциденты" />}
    />
    <Route path="*" element={<NotFoundPage />} />
  </Routes>
);

export default AppRoutes;
