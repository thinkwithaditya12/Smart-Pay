import { useLocation } from 'react-router-dom';
import MinimalLayout from './components/MinimalLayout';
import MinimalHome from './pages/MinimalHome';
import MinimalOutlets from './pages/MinimalOutlets';
import MinimalOutlet from './pages/MinimalOutlet';
import MinimalCheckout from './pages/MinimalCheckout';
import MinimalWallet from './pages/MinimalWallet';

export default function App() {
  const { pathname } = useLocation();

  let page = <MinimalHome />;
  if (pathname === '/outlets') page = <MinimalOutlets />;
  else if (pathname.startsWith('/outlet/')) page = <MinimalOutlet />;
  else if (pathname === '/checkout') page = <MinimalCheckout />;
  else if (pathname === '/wallet') page = <MinimalWallet />;

  return <MinimalLayout>{page}</MinimalLayout>;
}
