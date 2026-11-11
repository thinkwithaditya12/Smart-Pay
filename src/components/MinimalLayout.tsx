import { NavLink, useLocation } from 'react-router-dom';
import { useEffect, type ReactNode } from 'react';
import { ScanLine } from 'lucide-react';
import { useStore } from '../store/AppStore';
import { rupees } from '../lib/format';

export default function MinimalLayout({ children }: { children: ReactNode }) {
  const { pathname } = useLocation();
  const { balance, cart } = useStore();

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, [pathname]);

  return (
    <div className="app">
      <header className="topbar">
        <div className="topbar-inner">
          <NavLink to="/" className="brand">
            Tapri<span className="brand-dot">.</span>
          </NavLink>
          <nav className="nav">
            <NavLink to="/" className="nav-link">Home</NavLink>
            <NavLink to="/outlets" className="nav-link">Outlets</NavLink>
            <NavLink to="/wallet" className="nav-link">Wallet</NavLink>
          </nav>
          <div className="topbar-right">
            <NavLink to="/wallet" className="balance-pill">
              <span className="balance-dot" />
              {rupees(balance)}
            </NavLink>
            <NavLink to="/checkout" className="icon-btn cart-btn" aria-label="Open cart">
              <ScanLine size={18} />
              {cart ? <span className="cart-count">{cart.count}</span> : null}
            </NavLink>
          </div>
        </div>
      </header>

      <main className="page">{children}</main>

      <footer className="footer">
        <div className="footer-inner">
          <strong>Tapri · a PromptWars build</strong>
          <p className="footer-fine">
            Demo wallet with sample data. UPI links and QR codes are real NPCI payloads — scan with any UPI app to test.
          </p>
        </div>
      </footer>
    </div>
  );
}
