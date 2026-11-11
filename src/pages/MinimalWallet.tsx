import { useStore } from '../store/AppStore';
import { rupees } from '../lib/format';

export default function MinimalWallet() {
  const { balance } = useStore();

  return (
    <section className="wallet">
      <h2>Campus wallet</h2>
      <p className="balance">Balance: {rupees(balance)}</p>
      <p>Your Tapri wallet linked to tapri.campus@icici</p>
      <button className="btn">Add money</button>
    </section>
  );
}