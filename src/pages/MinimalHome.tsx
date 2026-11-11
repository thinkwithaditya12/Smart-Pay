import { Link } from 'react-router-dom';
import MinimalOutletCard from '../components/MinimalOutletCard';
import { OUTLETS } from '../data/outlets';

export default function MinimalHome() {
  const openNow = OUTLETS.filter((o) => o.open <= '23:00' && o.close >= '09:00');
  const featured = openNow.slice(0, 6);
  return (
    <section className="home">
      <h1>Tapri — pay every stall on campus</h1>
      <p>
        From Kravings to the night canteen. One checkout. No app switching.
      </p>
      <div className="grid">
        {featured.map((o) => (
          <MinimalOutletCard key={o.slug} outlet={o} />
        ))}
      </div>
      <div className="cta">
        <Link to="/outlets" className="btn">
          Browse all outlets <span className="arrow">→</span>
        </Link>
      </div>
    </section>
  );
}