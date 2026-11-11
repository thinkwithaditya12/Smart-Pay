import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useReducer,
  type ReactNode,
} from 'react';
import { COUPONS, getOutlet, outletItem, type Coupon, type Outlet } from '../data/outlets';

export type PaymentMethod = 'upi' | 'wallet' | 'card';

export type CartLine = { itemId: string; qty: number };

export type Cart = { outletSlug: string; lines: CartLine[] } | null;

export type Txn = {
  id: string;
  token: string;
  outletSlug: string;
  outletName: string;
  outletEmoji: string;
  lines: { name: string; qty: number; price: number }[];
  subtotal: number;
  discount: number;
  tip: number;
  total: number;
  method: PaymentMethod;
  upiApp?: string;
  reference: string;
  couponCode?: string;
  createdAt: number;
};

type State = {
  balance: number;
  txns: Txn[];
  cart: Cart;
  couponCode: string | null;
};

type Action =
  | { type: 'add'; outletSlug: string; itemId: string }
  | { type: 'setQty'; itemId: string; qty: number }
  | { type: 'clearCart' }
  | { type: 'coupon'; code: string | null }
  | { type: 'topup'; amount: number; reference: string }
  | { type: 'pay'; txn: Txn };

const STORAGE_KEY = 'tapri.state.v1';

function seedTxns(): Txn[] {
  const day = 86_400_000;
  const now = Date.now();
  const seed: Array<[string, number, Txn['lines'], number, PaymentMethod, string]> = [
    ['chai-vyanjan', 1, [{ name: 'Kulhad chai', qty: 2, price: 30 }, { name: 'Bun maska', qty: 1, price: 50 }], 110, 'upi', 'gpay'],
    ['streat', 2, [{ name: 'Veg thali', qty: 1, price: 129 }], 129, 'wallet', ''],
    ['burgrill', 4, [{ name: 'Crispy chicken burger', qty: 1, price: 179 }, { name: 'Cheesy fries', qty: 1, price: 139 }], 318, 'upi', 'phonepe'],
    ['dominos', 6, [{ name: 'Farmhouse', qty: 1, price: 319 }, { name: 'Choco lava cake', qty: 2, price: 109 }], 537, 'card', ''],
    ['anna-chowpati', 9, [{ name: 'Masala dosa', qty: 2, price: 119 }, { name: 'Filter coffee', qty: 2, price: 49 }], 336, 'upi', 'gpay'],
    ['gblock', 12, [{ name: 'Masala Maggi', qty: 1, price: 45 }, { name: 'Kulhad chai', qty: 2, price: 20 }], 85, 'wallet', ''],
  ];

  return seed.map(([slug, daysAgo, lines, total, method, upiApp], index) => {
    const outlet = getOutlet(slug)!;
    return {
      id: `seed-${index}-${slug}`,
      token: `T-${140 + index * 17}`,
      outletSlug: outlet.slug,
      outletName: outlet.name,
      outletEmoji: outlet.emoji,
      lines,
      subtotal: total,
      discount: 0,
      tip: 0,
      total,
      method,
      upiApp,
      reference: `TPR${(93_847_112 + index * 3_871).toString()}`,
      createdAt: now - daysAgo * day - index * 5_400_000,
    };
  });
}

function initialState(): State {
  return { balance: 1240, txns: seedTxns(), cart: null, couponCode: null };
}

function loadState(): State {
  if (typeof window === 'undefined') return initialState();
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return initialState();
    const parsed = JSON.parse(raw) as Partial<State>;
    if (typeof parsed.balance !== 'number' || !Array.isArray(parsed.txns)) return initialState();
    return {
      balance: parsed.balance,
      txns: parsed.txns,
      cart: parsed.cart ?? null,
      couponCode: parsed.couponCode ?? null,
    };
  } catch {
    return initialState();
  }
}

function reducer(state: State, action: Action): State {
  switch (action.type) {
    case 'add': {
      const sameOutlet = state.cart?.outletSlug === action.outletSlug;
      const lines = sameOutlet ? state.cart!.lines : [];
      const existing = lines.find((line) => line.itemId === action.itemId);
      const nextLines = existing
        ? lines.map((line) => (line.itemId === action.itemId ? { ...line, qty: line.qty + 1 } : line))
        : [...lines, { itemId: action.itemId, qty: 1 }];
      return {
        ...state,
        cart: { outletSlug: action.outletSlug, lines: nextLines },
        couponCode: sameOutlet ? state.couponCode : null,
      };
    }
    case 'setQty': {
      if (!state.cart) return state;
      const lines = state.cart.lines
        .map((line) => (line.itemId === action.itemId ? { ...line, qty: action.qty } : line))
        .filter((line) => line.qty > 0);
      return { ...state, cart: lines.length ? { ...state.cart, lines } : null, couponCode: lines.length ? state.couponCode : null };
    }
    case 'clearCart':
      return { ...state, cart: null, couponCode: null };
    case 'coupon':
      return { ...state, couponCode: action.code };
    case 'topup':
      return { ...state, balance: state.balance + action.amount };
    case 'pay': {
      const next = { ...state, txns: [action.txn, ...state.txns], cart: null, couponCode: null };
      if (action.txn.method === 'wallet') next.balance = state.balance - action.txn.total;
      return next;
    }
  }
  return state;
}

export type CartView = {
  outlet: Outlet;
  lines: Array<{ itemId: string; qty: number; name: string; price: number; veg: boolean; lineTotal: number }>;
  count: number;
  subtotal: number;
  discount: number;
  coupon: Coupon | null;
};

export function resolveCart(cart: Cart, couponCode: string | null): CartView | null {
  if (!cart) return null;
  const outlet = getOutlet(cart.outletSlug);
  if (!outlet) return null;
  const lines = cart.lines.flatMap((line) => {
    const item = outletItem(outlet, line.itemId);
    if (!item) return [];
    return [{ itemId: item.id, qty: line.qty, name: item.name, price: item.price, veg: item.veg, lineTotal: item.price * line.qty }];
  });
  const subtotal = lines.reduce((sum, line) => sum + line.lineTotal, 0);
  const coupon = COUPONS.find((c) => c.code === couponCode) ?? null;
  const usable = coupon && subtotal >= coupon.minimum;
  const discount = usable ? Math.min(Math.round((subtotal * coupon.percent) / 100), coupon.cap) : 0;
  return {
    outlet,
    lines,
    count: lines.reduce((sum, line) => sum + line.qty, 0),
    subtotal,
    discount,
    coupon: usable ? coupon : null,
  };
}

function makeToken(): string {
  return `T-${Math.floor(100 + Math.random() * 899)}`;
}

function makeReference(): string {
  return `TPR${Math.floor(10_000_000 + Math.random() * 89_999_999)}`;
}

type StoreValue = {
  balance: number;
  txns: Txn[];
  cart: CartView | null;
  couponCode: string | null;
  addItem: (outletSlug: string, itemId: string) => void;
  setQty: (itemId: string, qty: number) => void;
  clearCart: () => void;
  applyCoupon: (code: string | null) => void;
  topUp: (amount: number) => void;
  pay: (input: {
    subtotal: number;
    discount: number;
    tip: number;
    total: number;
    method: PaymentMethod;
    upiApp?: string;
  }) => Txn;
  getTxn: (id: string) => Txn | undefined;
};

const StoreContext = createContext<StoreValue | null>(null);

export function StoreProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(reducer, undefined, loadState);

  useEffect(() => {
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    } catch {
      /* storage full or blocked — the demo still works in memory */
    }
  }, [state]);

  const cart = useMemo(() => resolveCart(state.cart, state.couponCode), [state.cart, state.couponCode]);

  const pay = useCallback<StoreValue['pay']>(
    ({ subtotal, discount, tip, total, method, upiApp }) => {
      const outlet = state.cart ? getOutlet(state.cart.outletSlug) : undefined;
      const resolved = resolveCart(state.cart, state.couponCode);
      const txn: Txn = {
        id: `txn-${Date.now()}-${Math.floor(Math.random() * 1000)}`,
        token: makeToken(),
        outletSlug: outlet?.slug ?? 'unknown',
        outletName: outlet?.name ?? 'Campus outlet',
        outletEmoji: outlet?.emoji ?? '🍽️',
        lines: resolved?.lines.map(({ name, qty, price }) => ({ name, qty, price })) ?? [],
        subtotal,
        discount,
        tip,
        total,
        method,
        upiApp,
        reference: makeReference(),
        couponCode: state.couponCode ?? undefined,
        createdAt: Date.now(),
      };
      dispatch({ type: 'pay', txn });
      return txn;
    },
    [state.cart, state.couponCode],
  );

  const value = useMemo<StoreValue>(
    () => ({
      balance: state.balance,
      txns: state.txns,
      cart,
      couponCode: state.couponCode,
      addItem: (outletSlug, itemId) => dispatch({ type: 'add', outletSlug, itemId }),
      setQty: (itemId, qty) => dispatch({ type: 'setQty', itemId, qty }),
      clearCart: () => dispatch({ type: 'clearCart' }),
      applyCoupon: (code) => dispatch({ type: 'coupon', code }),
      topUp: (amount) => dispatch({ type: 'topup', amount, reference: makeReference() }),
      pay,
      getTxn: (id) => state.txns.find((txn) => txn.id === id),
    }),
    [state.balance, state.txns, cart, state.couponCode, pay],
  );

  return <StoreContext.Provider value={value}>{children}</StoreContext.Provider>;
}

export function useStore(): StoreValue {
  const value = useContext(StoreContext);
  if (!value) throw new Error('useStore must be used inside <StoreProvider>');
  return value;
}

/** Monthly spend, savings and order count used on the home and wallet screens. */
export function useInsights() {
  const { txns } = useStore();
  return useMemo(() => {
    const start = new Date();
    start.setDate(1);
    start.setHours(0, 0, 0, 0);
    const monthly = txns.filter((txn) => txn.createdAt >= start.getTime());
    const spend = monthly.reduce((sum, txn) => sum + txn.total, 0);
    const saved = monthly.reduce((sum, txn) => sum + txn.discount, 0) + 128;
    const byOutlet = new Map<string, { name: string; emoji: string; total: number; count: number }>();
    for (const txn of monthly) {
      const entry = byOutlet.get(txn.outletSlug) ?? { name: txn.outletName, emoji: txn.outletEmoji, total: 0, count: 0 };
      entry.total += txn.total;
      entry.count += 1;
      byOutlet.set(txn.outletSlug, entry);
    }
    const topOutlets = [...byOutlet.values()].sort((a, b) => b.total - a.total);
    const days: Array<{ label: string; total: number }> = [];
    for (let i = 6; i >= 0; i -= 1) {
      const day = new Date();
      day.setDate(day.getDate() - i);
      day.setHours(0, 0, 0, 0);
      const next = day.getTime() + 86_400_000;
      const total = txns
        .filter((txn) => txn.createdAt >= day.getTime() && txn.createdAt < next)
        .reduce((sum, txn) => sum + txn.total, 0);
      days.push({ label: day.toLocaleDateString('en-IN', { weekday: 'short' }).slice(0, 2), total });
    }
    return { spend, saved, orders: monthly.length, topOutlets, days, monthly };
  }, [txns]);
}
