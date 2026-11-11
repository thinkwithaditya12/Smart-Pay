import { useStore } from '../store/AppStore';
import { rupees } from '../lib/format';
import QrCodeView from '../components/QrCode';
import { upiUri } from '../lib/upi';
import { CAMPUS_VPA, CAMPUS_PAYEE } from '../lib/upi';

export default function MinimalCheckout() {
  const { balance, cart } = useStore();
  const resolved = cart ? { subtotal: cart.subtotal, discount: cart.discount ?? 0, total: cart.subtotal - (cart.discount ?? 0) } : { subtotal: 0, discount: 0, total: 0 };

  return (
    <section className="checkout">
      <h2>Checkout</h2>

      {cart ? (
        <div className="summary">
          <p>Items: {cart.count}</p>
          <p>Subtotal: {rupees(resolved.subtotal)}</p>
          {resolved.discount > 0 && <p>Discount: -{rupees(resolved.discount)}</p>}
          <p className="total">Total: {rupees(resolved.total)}</p>
        </div>
      ) : (
        <p>Your cart is empty</p>
      )}

      <div className="payment-options">
        <h3>Pay with</h3>
        <div className="pay-option">
          <span>UPI · Scan QR</span>
          <QrCodeView
            value={upiUri({
              vpa: CAMPUS_VPA,
              payeeName: CAMPUS_PAYEE,
              amount: resolved.total,
              note: 'Tapri campus order',
              txnRef: `ORD-${Date.now()}`,
            })}
            size={100}
            label="Scan to pay"
          />
        </div>
        <div className="pay-option">
          <span>Campus wallet</span>
          <p>Balance: {rupees(balance)}</p>
        </div>
        <div className="pay-option">
          <span>Card · Razorpay</span>
          <p>Configure VITE_RAZORPAY_KEY_ID to enable payment options</p>
        </div>
      </div>

      <div className="actions">
        <button className="btn">Place order</button>
        <button className="btn secondary" onClick={() => window.history.back()}>Cancel</button>
      </div>
    </section>
  );
}