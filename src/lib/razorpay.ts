declare global {
  interface Window {
    Razorpay?: new (options: Record<string, unknown>) => { open: () => void };
  }
}

const SDK_URL = 'https://checkout.razorpay.com/v1/checkout.js';

export const razorpayKey: string = (import.meta.env.VITE_RAZORPAY_KEY_ID as string | undefined)?.trim() ?? '';

/** True when a real Razorpay key id is configured, so we can show the honest mode. */
export const razorpayConfigured = razorpayKey.startsWith('rzp_');

let loader: Promise<boolean> | null = null;

function loadCheckout(): Promise<boolean> {
  if (typeof window === 'undefined') return Promise.resolve(false);
  if (window.Razorpay) return Promise.resolve(true);
  if (loader) return loader;
  loader = new Promise<boolean>((resolve) => {
    const script = document.createElement('script');
    script.src = SDK_URL;
    script.async = true;
    script.onload = () => resolve(Boolean(window.Razorpay));
    script.onerror = () => {
      loader = null;
      resolve(false);
    };
    document.head.appendChild(script);
  });
  return loader;
}

export type RazorpayResult = { status: 'paid'; paymentId: string } | { status: 'dismissed' } | { status: 'failed'; reason: string };

/**
 * Opens the real Razorpay Checkout sheet. Amount is in rupees here and converted
 * to paise as Razorpay expects. Without a key we never pretend a payment happened.
 */
export async function payWithRazorpay(input: {
  amount: number;
  name: string;
  description: string;
  email: string;
  contact: string;
  receipt: string;
}): Promise<RazorpayResult> {
  if (!razorpayConfigured) return { status: 'failed', reason: 'not-configured' };
  const ready = await loadCheckout();
  if (!ready || !window.Razorpay) return { status: 'failed', reason: 'sdk-unavailable' };

  return new Promise<RazorpayResult>((resolve) => {
    const checkout = new window.Razorpay!({
      key: razorpayKey,
      amount: Math.round(input.amount * 100),
      currency: 'INR',
      name: 'Tapri Campus',
      description: input.description,
      image:
        'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64"><rect width="64" height="64" rx="16" fill="%23c9f94b"/></svg>',
      receipt: input.receipt,
      prefill: { name: 'Aarav Singh', email: input.email, contact: input.contact },
      notes: { campus: 'TIET Patiala', outlet: input.name },
      theme: { color: '#c9f94b', backdrop_color: '#08090b' },
      method: { upi: true, card: true, netbanking: true, wallet: true },
      handler: (response: { razorpay_payment_id: string }) =>
        resolve({ status: 'paid', paymentId: response.razorpay_payment_id }),
      modal: {
        ondismiss: () => resolve({ status: 'dismissed' }),
      },
    });
    checkout.open();
  });
}
