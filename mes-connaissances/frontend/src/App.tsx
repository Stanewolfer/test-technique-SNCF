import { BrowserRouter as Router, Routes, Route, NavLink } from 'react-router-dom';
import ConnaissancesPage from './pages/ConnaissancesPage';
import CategoriesPage from './pages/CategoriesPage';

export default function App() {
  return (
    <Router>
      <nav className="bg-gray-800 text-white p-4 flex space-x-4">
        <NavLink to="/" className={({ isActive }: { isActive: boolean }) => isActive ? 'underline' : ''}>Connaissances</NavLink>
        <NavLink to="/categories" className={({ isActive }: { isActive: boolean }) => isActive ? 'underline' : ''}>Catégories</NavLink>
      </nav>
      <div className="bg-gray-100 min-h-screen">
        <Routes>
          <Route path="/" element={<ConnaissancesPage />} />
          <Route path="/categories" element={<CategoriesPage />} />
        </Routes>
      </div>
    </Router>
  );
}
