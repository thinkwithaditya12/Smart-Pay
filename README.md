# Smart Pay — one checkout for every food joint on campus

Built for **PromptWars**. Campus life runs on food, and campus food runs on a different app, a different wallet and a different QR code at every counter. Smart Pay (branded **Tapri**) puts every outlet at TIET Patiala behind one frontend: browse the counter, build the order, pay by UPI or campus wallet, done.

**Live demo:** https://site-f23795aad07945b7b860fa15358623ed.freebuff.page

## What it does

- **Outlet directory** — 14 real campus food spots: Kravings food court (Domino's, Subway, Burgrill, Anna Chowpati, Moti Mahal, Barista, Chai Vyanjan), STREAT by Sodexo, G-Block Canteen, Nescafé, the juice corner, the Amul/Verka stall and the hostel night canteen.
- **Outlet menus** — veg/non-veg marks, prices, add-to-cart with quantity controls and a live cart total.
- **Checkout** — order summary, a real NPCI `upi://pay` QR you can scan with any UPI app, campus wallet balance, and Razorpay card checkout when a key is configured.
- **Wallet** — persistent balance and cart (localStorage), so a refresh never loses an order.

All data is sample data for the demo; the UPI payloads and QR codes are genuine, but the VPA is a placeholder, so no money moves.

## Stack

React 19 · TypeScript · Vite · React Router · lucide-react · `qrcode`

## Run locally

```bash
npm install
npm run dev        # http://localhost:3000
```

```bash
npm run typecheck  # tsc
npm run build      # typecheck + production build into dist/
```

## Payments

### UPI (works with no setup)

`src/lib/upi.ts` builds a standard NPCI deep link:

```
upi://pay?pa=<vpa>&pn=<payee>&am=<amount>&cu=INR&tn=<note>&tr=<ref>
```

Checkout renders that payload as a scannable QR, and per-app variants (`gpay://upi/pay`, `phonepe://pay`, `paytmmp://pay`, `bhim://pay`) are available via `appUri()`.

### Razorpay (optional)

```bash
cp .env.example .env
# set VITE_RAZORPAY_KEY_ID=rzp_test_xxxxxxxx
```

With a key present, `src/lib/razorpay.ts` loads Razorpay Checkout, opens the sheet with UPI/card/netbanking enabled, and resolves on `handler`. Without a key the UI says the key is not configured — it never fakes a successful payment.

> Note: a real Razorpay integration needs a tiny backend to create orders and verify signatures. This repo is frontend-only by design, so treat the card flow as a checkout-shell demo.

## Project structure

```
src/
  App.tsx                  route switch
  components/
    MinimalLayout.tsx      header, nav, wallet pill, cart button, footer
    MinimalOutletCard.tsx  outlet tile
    QrCode.tsx             SVG QR renderer
  data/outlets.ts          outlet catalogue + menus + coupons
  lib/
    format.ts              ₹ and date formatting
    razorpay.ts            Razorpay Checkout loader
    upi.ts                 UPI intent links
  pages/                   Home, Outlets, Outlet, Checkout, Wallet
  store/AppStore.tsx       reducer + localStorage persistence
worker.js / deploy.json    static SPA deployment manifest
```

Adding a campus outlet means adding one object to `src/data/outlets.ts`.

## Deploy

`npm run build` produces a static site in `dist/`. `deploy.json` + `worker.js` serve it as an SPA on Cloudflare Workers (assets binding with SPA fallback); any static host works too.

## Disclaimer

Not affiliated with TIET Patiala or any outlet listed. Outlet names are used to make the demo realistic. Wallet balances and transactions are local sample data.
