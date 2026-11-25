import AppRoutes from '../routing/AppRoutes';
import Header from './Header';
import Sidebar from './Sidebar';

const App = () => {
  return (
    <div className="app">
      <Sidebar />
      <div className="app__workspace">
        <Header />
        <main id="content" className="app__content">
          <AppRoutes />
        </main>
      </div>
    </div>
  );
};

export default App;
