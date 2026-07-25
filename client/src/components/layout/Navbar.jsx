import { Link, useNavigate } from 'react-router-dom';
import { Menu, Search, ShoppingBag, LogOut } from 'lucide-react';
import { useContext } from 'react';
import { AuthContext } from '../../context/AuthContext';

export default function Navbar() {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    navigate('/login');
  };

  return (
    <header className="sticky top-0 z-50">
      {/* Global Nav (Black) */}
      <div className="bg-surface-black text-on-dark h-[44px] flex items-center justify-center px-4">
        <div className="w-full max-w-[1024px] flex items-center justify-between text-[12px] tracking-tight-display font-text">
          <Link to="/" className="text-on-dark hover:text-body-muted transition-colors">
            <span className="font-display font-semibold tracking-normal text-sm">Digital Heroes</span>
          </Link>
          
          <nav className="hidden md:flex items-center gap-8">
            <a href="#features" className="hover:text-body-muted transition-colors">Platform</a>
            <a href="#contact" className="hover:text-body-muted transition-colors">Contact</a>
            {user ? (
              <Link to="/admin" className="hover:text-body-muted transition-colors">Admin Dashboard</Link>
            ) : (
              <Link to="/admin" className="hover:text-body-muted transition-colors">Admin</Link>
            )}
          </nav>
          
          <div className="flex items-center gap-4">
            <button className="hover:text-body-muted transition-colors">
              <Search className="w-4 h-4" />
            </button>
            {user && (
              <button onClick={handleLogout} className="hover:text-body-muted transition-colors flex items-center gap-1" title="Logout">
                <LogOut className="w-4 h-4" />
                <span className="hidden md:inline">Logout</span>
              </button>
            )}
            <button className="md:hidden hover:text-body-muted transition-colors">
              <Menu className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
      
      {/* Sub Nav (Frosted) */}
      <div className="bg-canvas-parchment/80 backdrop-blur-xl h-[52px] border-b border-divider-soft flex items-center justify-center px-4">
        <div className="w-full max-w-[1024px] flex items-center justify-between">
          <h2 className="text-[21px] font-semibold font-display tracking-tight-display text-ink">Lead Capture</h2>
          <div className="flex items-center gap-4">
            <span className="hidden md:inline text-[14px] font-text text-ink">Enterprise Edition</span>
            <a href="#contact" className="btn-primary py-1 px-4 text-[14px]">Get Started</a>
          </div>
        </div>
      </div>
    </header>
  );
}
