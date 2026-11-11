import { Link } from 'react-router-dom';

type Props = { outlet: { slug: string; name: string; open: string; close: string; emoji: string; category: string; queue: number; rating: number; location: string; tagline: string; cuisine: string[]; accent: [string, string] } };

export default function MinimalOutletCard({ outlet }: Props) {
  return (
    <Link
      to={`/outlet/${outlet.slug}`}
      className="card"
      style={{ borderLeft: `4px solid ${outlet.accent[1]}`, background: outlet.accent[0] }}
    >
      <span className="emoji" aria-hidden="true">{outlet.emoji}</span>
      <div className="body">
        <h3>{outlet.name}</h3>
        <p>{outlet.tagline}</p>
        <p className="meta">{outlet.queue} min · {outlet.location}</p>
      </div>
    </Link>
  );
}