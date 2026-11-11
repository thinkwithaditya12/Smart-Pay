export type UpiRequest = {
  vpa: string;
  payeeName: string;
  amount: number;
  note: string;
  txnRef: string;
};

/**
 * Standard NPCI UPI deep link. Any UPI app can resolve this, and the same
 * payload is what we encode into the QR so a demo on a real phone works.
 */
export function upiUri({ vpa, payeeName, amount, note, txnRef }: UpiRequest): string {
  const params = new URLSearchParams({
    pa: vpa,
    pn: payeeName,
    am: amount.toFixed(2),
    cu: 'INR',
    tn: note,
    tr: txnRef,
  });
  return `upi://pay?${params.toString()}`;
}

const APP_SCHEMES: Record<string, string> = {
  gpay: 'gpay://upi/pay',
  phonepe: 'phonepe://pay',
  paytm: 'paytmmp://pay',
  bhim: 'bhim://pay',
};

/** Same payload, handed to a specific app's scheme so it opens the right screen. */
export function appUri(app: keyof typeof APP_SCHEMES, request: UpiRequest): string {
  const universal = upiUri(request);
  const query = universal.slice(universal.indexOf('?') + 1);
  return `${APP_SCHEMES[app]}?${query}`;
}

/** VPA-shaped handle for the wallet, derived from the student id. */
export const CAMPUS_VPA = 'tapri.campus@icici';
export const CAMPUS_PAYEE = 'Tapri Campus Wallet';
