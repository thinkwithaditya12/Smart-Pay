import { Link, useParams } from 'react-router-dom';
import { Plus, Minus, ArrowLeft } from 'lucide-react';
import { getOutlet } from '../data/outlets';
import { rupees } from '../lib/format';
import { useStore } from '../store/AppStore';

export default function MinimalOutlet() {
  const { slug } = useParams();
  const outlet = getOutlet(slug);
  const { cart, addItem, setQty } = useStore();

  if (!outlet) {
    return (
      <section className="outlet">
        <h2>Outlet not found</h2>
        <Link to="/outlets" className="btn">Back to outlets</Link>
      </section>
    );
  }

  const qtyOf = (itemId: string) =>
    cart?.outlet.slug === outlet.slug ? cart.lines.find((line) => line.itemId === itemId)?.qty ?? 0 : 0;
  const myCart = cart?.outlet.slug === outlet.slug ? cart : null;

  return (
    <section className="outlet">
      <Link to="/outlets" className="link-back">
        <ArrowLeft size={14} /> All outlets
      </Link>

      <header className="outlet-head" style={{ background: outlet.accent[0], borderColor: outlet.accent[1] }}>
        <span className="outlet-emoji">{outlet.emoji}</span>
        <div>
          <h1>{outlet.name}</h1>
          <p className="muted">{outlet.tagline} · {outlet.location}</p>
          <p className="muted small">
            ⭐ {outlet.rating.toFixed(1)} · ~{outlet.queue} min queue · {outlet.open}–{outlet.close} · UPI {outlet.upiVpa}
          </p>
        </div>
      </header>

      {outlet.menu.map((section) => (
        <div className="menu-section" key={section.name}>
          <h3>{section.name}</h3>
          <ul className="menu-list">
            {section.items.map((item) => {
              const qty = qtyOf(item.id);
              return (
                <li className="menu-item" key={item.id}>
                  <span className={`veg ${item.veg ? 'green' : 'red'}`} />
                  <div className="menu-body">
                    <strong>{item.name}</strong>
                    <p>{item.desc}</p>
                    <span className="price">{rupees(item.price)}</span>
                  </div>
                  {qty ? (
                    <div className="qty">
                      <button onClick={() => setQty(item.id, qty - 1)} aria-label="Remove one"><Minus size={13} /></button>
                      <span>{qty}</span>
                      <button onClick={() => addItem(outlet.slug, item.id)} aria-label="Add one"><Plus size={13} /></button>
                    </div>
                  ) : (
                    <button className="btn btn-sm" onClick={() => addItem(outlet.slug, item.id)}>Add</button>
                  )}
                </li>
              );
            })}
          </ul>
        </div>
      ))}

      {myCart && myCart.count > 0 ? (
        <div className="cart-bar">
          <span>{myCart.count} item{myCart.count > 1 ? 's' : ''} · {rupees(myCart.subtotal)}</span>
          <Link to="/checkout" className="btn">Checkout →</Link>
        </div>
      ) : null}
    </section>
  );
}
