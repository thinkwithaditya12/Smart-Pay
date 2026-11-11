import { Link } from 'react-router-dom';
import { OUTLETS } from '../data/outlets';

export default function MinimalOutlets() {
  return (
    <section className="outlets">
      <h2>Every counter on campus</h2>
      <p>From Kravings to the night canteen. One checkout. No app switching.</p>
      <div className="grid">
        {OUTLETS.map((o) => (
          <Link
            key={o.slug}
            to={`/outlet/${o.slug}`}
            className="card"
            style={{ borderLeftColor: o.accent[1], background: o.accent[0] }}
          >
            <span className="emoji" aria-hidden="true">
              {o.emoji}
            </span>
            <div>
              <strong>{o.name}</strong>
              <p>{o.tagline}</p>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}