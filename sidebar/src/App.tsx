import { NavLink } from 'react-router';
import './Sidebar.scss';

const App = () => (
  <div className="sidebar">
    <div className="sidebar__brand">EDR</div>
    <nav className="sidebar__nav">
      <NavLink to="/" end>
        Главная
      </NavLink>
      <NavLink to="/agents" end>
        Агенты
      </NavLink>
      <NavLink to="/incidents" end>
        Инциденты
      </NavLink>
    </nav>
  </div>
);

export default App;
