import { NavLink } from 'react-router-dom';

const navItems = [
  { label: 'Inicio', path: '/' },
  { label: 'Editor', path: '/editor' },
  { label: 'Vista previa', path: '/preview' },
  { label: 'Dashboard', path: '/dashboard' },
  { label: 'Acerca de', path: '/about' },
];

function Navbar() {
  return (
    <nav className="navbar">
      <NavLink className="navbar-brand" to="/">
        PamilonCV
      </NavLink>

      <div className="navbar-links">
        {navItems.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            className={({ isActive }) =>
              isActive ? 'navbar-link navbar-link-active' : 'navbar-link'
            }
          >
            {item.label}
          </NavLink>
        ))}
      </div>
    </nav>
  );
}

export default Navbar;
