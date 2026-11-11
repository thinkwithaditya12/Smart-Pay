export type MenuItem = {
  id: string;
  name: string;
  price: number;
  desc: string;
  veg: boolean;
  popular?: boolean;
};

export type MenuSection = { name: string; items: MenuItem[] };

export type OutletCategory = 'Food court' | 'Cafe' | 'Quick bites' | 'Meals' | 'Late night';

export type Outlet = {
  slug: string;
  name: string;
  tagline: string;
  location: string;
  category: OutletCategory;
  cuisine: string[];
  rating: number;
  reviews: number;
  open: string;
  close: string;
  queue: number;
  prep: number;
  emoji: string;
  accent: [string, string];
  blurb: string;
  tags: string[];
  upiVpa: string;
  menu: MenuSection[];
};

export const OUTLETS: Outlet[] = [
  {
    slug: 'kravings',
    name: 'Kravings',
    tagline: 'The campus food court',
    location: 'Central lawn, behind the library',
    category: 'Food court',
    cuisine: ['Multi-cuisine', 'Fast food'],
    rating: 4.5,
    reviews: 1284,
    open: '09:00',
    close: '23:00',
    queue: 7,
    prep: 12,
    emoji: '🍱',
    accent: ['#3c2412', '#8a4b18'],
    blurb: 'Every craving under one roof — Domino’s, Subway, Burgrill and the food court counters.',
    tags: ['Seating', 'Cards accepted', 'Crowded at 1 PM'],
    upiVpa: 'kravings.tiet@icici',
    menu: [
      {
        name: 'Campus combos',
        items: [
          { id: 'kra-1', name: 'Kravings veg combo', price: 189, desc: 'Dal, paneer, 3 rotis, rice, salad', veg: true, popular: true },
          { id: 'kra-2', name: 'Kravings non-veg combo', price: 229, desc: 'Chicken curry, 3 rotis, rice, salad', veg: false, popular: true },
          { id: 'kra-3', name: 'Mini meal box', price: 129, desc: 'Rajma, rice, curd and achaar', veg: true },
        ],
      },
      {
        name: 'Quick bites',
        items: [
          { id: 'kra-4', name: 'Loaded cheese fries', price: 139, desc: 'Peri peri, jalapeños, cheese sauce', veg: true },
          { id: 'kra-5', name: 'Chicken momos (8 pc)', price: 149, desc: 'Steamed, served with schezwan', veg: false },
          { id: 'kra-6', name: 'Paneer wrap', price: 119, desc: 'Tandoori paneer, onions, mint mayo', veg: true },
        ],
      },
      {
        name: 'Drinks',
        items: [
          { id: 'kra-7', name: 'Cold coffee', price: 99, desc: 'Thick, extra ice', veg: true },
          { id: 'kra-8', name: 'Fresh lime soda', price: 59, desc: 'Sweet or salted', veg: true },
        ],
      },
    ],
  },
  {
    slug: 'dominos',
    name: "Domino's",
    tagline: 'Pizza, in 12 minutes',
    location: 'Inside Kravings, counter 2',
    category: 'Food court',
    cuisine: ['Pizza', 'Italian'],
    rating: 4.4,
    reviews: 962,
    open: '11:00',
    close: '23:00',
    queue: 9,
    prep: 14,
    emoji: '🍕',
    accent: ['#1b2d4a', '#0f5ea8'],
    blurb: 'The reliable late-afternoon pizza run. Student offer on Tuesdays.',
    tags: ['Student offer', 'Takeaway'],
    upiVpa: 'dominos.kravings@icici',
    menu: [
      {
        name: 'Pizzas',
        items: [
          { id: 'dom-1', name: 'Margherita', price: 149, desc: 'Classic cheese, 7 inch', veg: true, popular: true },
          { id: 'dom-2', name: 'Farmhouse', price: 319, desc: 'Onion, capsicum, tomato, mushroom', veg: true, popular: true },
          { id: 'dom-3', name: 'Peppy paneer', price: 299, desc: 'Paneer, capsicum, red paprika', veg: true },
          { id: 'dom-4', name: 'Chicken dominator', price: 379, desc: 'Double chicken, peri peri', veg: false },
        ],
      },
      {
        name: 'Sides & dessert',
        items: [
          { id: 'dom-5', name: 'Garlic breadsticks', price: 129, desc: 'With cheese dip', veg: true },
          { id: 'dom-6', name: 'Choco lava cake', price: 109, desc: 'Warm, gooey centre', veg: true, popular: true },
          { id: 'dom-7', name: 'Pepsi 475 ml', price: 60, desc: 'Chilled', veg: true },
        ],
      },
    ],
  },
  {
    slug: 'subway',
    name: 'Subway',
    tagline: 'Build your own sub',
    location: 'Inside Kravings, counter 4',
    category: 'Food court',
    cuisine: ['Sandwiches', 'Salads'],
    rating: 4.2,
    reviews: 618,
    open: '11:00',
    close: '22:30',
    queue: 5,
    prep: 9,
    emoji: '🥪',
    accent: ['#0e3b26', '#1f8b4c'],
    blurb: 'Fresh bread, all the veggies, and the honey mustard you always ask for extra.',
    tags: ['Healthy', 'Custom subs'],
    upiVpa: 'subway.kravings@hdfcbank',
    menu: [
      {
        name: 'Subs (6 inch)',
        items: [
          { id: 'sub-1', name: 'Paneer tikka sub', price: 199, desc: 'Tikka paneer, mint mayo, veggies', veg: true, popular: true },
          { id: 'sub-2', name: 'Veggie delite', price: 159, desc: 'All veggies, your choice of sauce', veg: true },
          { id: 'sub-3', name: 'Chicken teriyaki', price: 249, desc: 'Sweet onion, teriyaki glaze', veg: false, popular: true },
        ],
      },
      {
        name: 'Add-ons',
        items: [
          { id: 'sub-4', name: 'Cheese slice', price: 30, desc: 'Add to any sub', veg: true },
          { id: 'sub-5', name: 'Choco chip cookie', price: 60, desc: 'Baked in store', veg: true },
          { id: 'sub-6', name: 'Iced tea', price: 89, desc: 'Lemon, no sugar option', veg: true },
        ],
      },
    ],
  },
  {
    slug: 'burgrill',
    name: 'Burgrill',
    tagline: 'Grilled, loaded, messy',
    location: 'Inside Kravings, counter 1',
    category: 'Food court',
    cuisine: ['Burgers', 'Wraps'],
    rating: 4.6,
    reviews: 731,
    open: '11:00',
    close: '23:00',
    queue: 11,
    prep: 15,
    emoji: '🍔',
    accent: ['#3a1b10', '#b4471f'],
    blurb: 'The grill smells from the gate. Get the crispy chicken burger before 2 PM.',
    tags: ['Popular', 'Slow at peak hours'],
    upiVpa: 'burgrill.kravings@icici',
    menu: [
      {
        name: 'Burgers',
        items: [
          { id: 'bur-1', name: 'Crispy chicken burger', price: 179, desc: 'Buttermilk fried, slaw, chipotle', veg: false, popular: true },
          { id: 'bur-2', name: 'Paneer makhani burger', price: 169, desc: 'Makhani patty, onions, cheese', veg: true, popular: true },
          { id: 'bur-3', name: 'Double patty beast', price: 259, desc: 'Two patties, double cheese', veg: false },
        ],
      },
      {
        name: 'On the side',
        items: [
          { id: 'bur-4', name: 'Loaded nachos', price: 189, desc: 'Cheese, salsa, jalapeño', veg: true },
          { id: 'bur-5', name: 'Cheesy fries', price: 139, desc: 'House cheese sauce', veg: true },
          { id: 'bur-6', name: 'Oreo thick shake', price: 159, desc: 'Extra thick', veg: true, popular: true },
        ],
      },
    ],
  },
  {
    slug: 'anna-chowpati',
    name: 'Anna Chowpati',
    tagline: 'South Indian counter',
    location: 'Inside Kravings, counter 6',
    category: 'Food court',
    cuisine: ['South Indian'],
    rating: 4.6,
    reviews: 845,
    open: '09:00',
    close: '22:00',
    queue: 6,
    prep: 8,
    emoji: '🥘',
    accent: ['#2c2410', '#9a7b16'],
    blurb: 'Crisp dosas and filter coffee. The cheapest full meal inside Kravings.',
    tags: ['Value', 'Pure veg'],
    upiVpa: 'annachowpati.tiet@ybl',
    menu: [
      {
        name: 'Dosa & idli',
        items: [
          { id: 'ann-1', name: 'Masala dosa', price: 119, desc: 'Ghee roast, potato masala', veg: true, popular: true },
          { id: 'ann-2', name: 'Cheese burst dosa', price: 149, desc: 'Loaded with cheese', veg: true },
          { id: 'ann-3', name: 'Idli sambar (4 pc)', price: 79, desc: 'With coconut chutney', veg: true },
          { id: 'ann-4', name: 'Medu vada (2 pc)', price: 69, desc: 'Fresh from the fryer', veg: true },
        ],
      },
      {
        name: 'Drinks',
        items: [
          { id: 'ann-5', name: 'Filter coffee', price: 49, desc: 'Kumbakonam style', veg: true, popular: true },
          { id: 'ann-6', name: 'Buttermilk', price: 39, desc: 'Curry leaf, ginger', veg: true },
        ],
      },
    ],
  },
  {
    slug: 'moti-mahal',
    name: 'Moti Mahal',
    tagline: 'North Indian thali house',
    location: 'Inside Kravings, counter 7',
    category: 'Food court',
    cuisine: ['North Indian', 'Mughlai'],
    rating: 4.2,
    reviews: 502,
    open: '11:30',
    close: '22:30',
    queue: 8,
    prep: 16,
    emoji: '🍛',
    accent: ['#3b1414', '#a62b2b'],
    blurb: 'Butter chicken nights and heavy Sundays. Portions are genuinely large.',
    tags: ['Family portions', 'Dine-in'],
    upiVpa: 'motimahal.kravings@icici',
    menu: [
      {
        name: 'Mains',
        items: [
          { id: 'mot-1', name: 'Dal makhani', price: 189, desc: 'Slow cooked overnight', veg: true, popular: true },
          { id: 'mot-2', name: 'Butter chicken', price: 289, desc: 'Boneless, extra gravy', veg: false, popular: true },
          { id: 'mot-3', name: 'Paneer butter masala', price: 249, desc: 'Mild, creamy', veg: true },
        ],
      },
      {
        name: 'Breads & rice',
        items: [
          { id: 'mot-4', name: 'Tandoori roti', price: 20, desc: 'Per piece', veg: true },
          { id: 'mot-5', name: 'Jeera rice', price: 129, desc: 'Basmati', veg: true },
          { id: 'mot-6', name: 'Gulab jamun (2 pc)', price: 69, desc: 'Warm', veg: true },
        ],
      },
    ],
  },
  {
    slug: 'streat',
    name: 'STREAT',
    tagline: 'Sodexo cafeteria',
    location: 'Student arcade, ground floor',
    category: 'Meals',
    cuisine: ['Thali', 'Multi-cuisine'],
    rating: 4.1,
    reviews: 1104,
    open: '07:30',
    close: '21:00',
    queue: 12,
    prep: 6,
    emoji: '🍽️',
    accent: ['#1a2433', '#3f6383'],
    blurb: 'The everyday thali. Fast, hot, and the only place open for breakfast at 8 AM.',
    tags: ['Breakfast', 'Thali', 'Seating'],
    upiVpa: 'streat.sodexo@icici',
    menu: [
      {
        name: 'Thali',
        items: [
          { id: 'str-1', name: 'Veg thali', price: 129, desc: 'Dal, sabzi, 4 rotis, rice, curd', veg: true, popular: true },
          { id: 'str-2', name: 'Non-veg thali', price: 179, desc: 'Chicken curry, dal, rice, rotis', veg: false, popular: true },
          { id: 'str-3', name: 'Breakfast plate', price: 89, desc: 'Paratha, curd, tea', veg: true },
        ],
      },
      {
        name: 'Light',
        items: [
          { id: 'str-4', name: 'Rajma chawal', price: 99, desc: 'Comfort in a bowl', veg: true },
          { id: 'str-5', name: 'Salad bowl', price: 79, desc: 'Seasonal, with dressing', veg: true },
          { id: 'str-6', name: 'Curd rice', price: 89, desc: 'Tempered, with pickle', veg: true },
        ],
      },
    ],
  },
  {
    slug: 'gblock',
    name: 'G-Block Canteen',
    tagline: 'Between lectures',
    location: 'G-Block, ground floor',
    category: 'Quick bites',
    cuisine: ['Snacks', 'Maggi'],
    rating: 4.0,
    reviews: 389,
    open: '08:30',
    close: '19:30',
    queue: 4,
    prep: 7,
    emoji: '🍲',
    accent: ['#26301c', '#5c7a2c'],
    blurb: 'The 10-minute break stop. Maggi, parathas, and tea that is somehow always perfect.',
    tags: ['Fast', 'Budget'],
    upiVpa: 'gbcanteen.tiet@ybl',
    menu: [
      {
        name: 'Snacks',
        items: [
          { id: 'gbl-1', name: 'Aloo paratha', price: 60, desc: 'With butter and curd', veg: true, popular: true },
          { id: 'gbl-2', name: 'Masala Maggi', price: 45, desc: 'Double masala', veg: true, popular: true },
          { id: 'gbl-3', name: 'Chole bhature', price: 90, desc: 'Two bhature', veg: true },
          { id: 'gbl-4', name: 'Egg curry rice', price: 110, desc: 'Two eggs', veg: false },
        ],
      },
      {
        name: 'Chai',
        items: [
          { id: 'gbl-5', name: 'Kulhad chai', price: 20, desc: 'Adrak, extra strong', veg: true },
          { id: 'gbl-6', name: 'Cold coffee', price: 60, desc: 'Bottled shake', veg: true },
        ],
      },
    ],
  },
  {
    slug: 'chai-vyanjan',
    name: 'Chai Vyanjan',
    tagline: 'Chai and bun maska',
    location: 'Inside Kravings, kiosk 1',
    category: 'Cafe',
    cuisine: ['Chai', 'Snacks'],
    rating: 4.5,
    reviews: 921,
    open: '08:00',
    close: '23:30',
    queue: 3,
    prep: 4,
    emoji: '🫖',
    accent: ['#33210f', '#7d5220'],
    blurb: 'Where every group project actually gets discussed. The kulhad chai is the campus default.',
    tags: ['Chai', 'Late open', 'Budget'],
    upiVpa: 'chaivyanjan@ybl',
    menu: [
      {
        name: 'Chai',
        items: [
          { id: 'chy-1', name: 'Kulhad chai', price: 30, desc: 'Clay cup, cardamom', veg: true, popular: true },
          { id: 'chy-2', name: 'Adrak chai', price: 35, desc: 'Ginger heavy', veg: true, popular: true },
          { id: 'chy-3', name: 'Green tea', price: 30, desc: 'Lemon or plain', veg: true },
        ],
      },
      {
        name: 'With the chai',
        items: [
          { id: 'chy-4', name: 'Bun maska', price: 50, desc: 'Toasted, extra butter', veg: true, popular: true },
          { id: 'chy-5', name: 'Vada pav', price: 45, desc: 'Spicy, with chutney', veg: true },
          { id: 'chy-6', name: 'Samosa (2 pc)', price: 25, desc: 'Fresh batch at 5 PM', veg: true },
        ],
      },
    ],
  },
  {
    slug: 'nescafe',
    name: 'Nescafé Kiosk',
    tagline: 'Coffee between classes',
    location: 'LPU block, near the stairs',
    category: 'Cafe',
    cuisine: ['Coffee', 'Beverages'],
    rating: 4.3,
    reviews: 447,
    open: '08:00',
    close: '20:00',
    queue: 5,
    prep: 5,
    emoji: '☕',
    accent: ['#2b1613', '#8f3c2a'],
    blurb: 'The 11 AM cold coffee run. Ask for less sugar, they never do it.',
    tags: ['Coffee', 'Grab and go'],
    upiVpa: 'nescafe.tiet@icici',
    menu: [
      {
        name: 'Coffee',
        items: [
          { id: 'nes-1', name: 'Classic cold coffee', price: 89, desc: 'With ice cream', veg: true, popular: true },
          { id: 'nes-2', name: 'Cappuccino', price: 79, desc: 'Single shot', veg: true },
          { id: 'nes-3', name: 'Hazelnut latte', price: 109, desc: 'Flavoured syrup', veg: true },
        ],
      },
      {
        name: 'Quick bites',
        items: [
          { id: 'nes-4', name: 'Maggi cup', price: 55, desc: 'Instant, hot', veg: true },
          { id: 'nes-5', name: 'Chocolate cookie', price: 40, desc: 'Double choc', veg: true },
        ],
      },
    ],
  },
  {
    slug: 'barista',
    name: 'Barista',
    tagline: 'The sit-down coffee stop',
    location: 'Inside Kravings, corner unit',
    category: 'Cafe',
    cuisine: ['Coffee', 'Sandwiches'],
    rating: 4.4,
    reviews: 356,
    open: '09:30',
    close: '22:00',
    queue: 6,
    prep: 10,
    emoji: '🧋',
    accent: ['#241a2e', '#5c3e78'],
    blurb: 'Wifi that works, plugs that work, and a latte that justifies the price.',
    tags: ['WiFi', 'Study spot', 'Seating'],
    upiVpa: 'barista.kravings@hdfcbank',
    menu: [
      {
        name: 'Coffee',
        items: [
          { id: 'bar-1', name: 'Café latte', price: 149, desc: 'Regular or large', veg: true, popular: true },
          { id: 'bar-2', name: 'Espresso', price: 99, desc: 'Double shot', veg: true },
          { id: 'bar-3', name: 'Caramel frappe', price: 179, desc: 'Whipped cream', veg: true, popular: true },
        ],
      },
      {
        name: 'Bakes',
        items: [
          { id: 'bar-4', name: 'Blueberry muffin', price: 119, desc: 'Baked daily', veg: true },
          { id: 'bar-5', name: 'Grilled sandwich', price: 159, desc: 'Corn and cheese', veg: true },
        ],
      },
    ],
  },
  {
    slug: 'juice-corner',
    name: 'Fruit & Juice Corner',
    tagline: 'Cold pressed, fresh cut',
    location: 'Student arcade, near SBI ATM',
    category: 'Quick bites',
    cuisine: ['Juices', 'Fruit'],
    rating: 4.4,
    reviews: 274,
    open: '08:00',
    close: '20:30',
    queue: 2,
    prep: 5,
    emoji: '🥤',
    accent: ['#1d2f1b', '#4f8f3a'],
    blurb: 'Actual fruit, actual juice. The only place that sells a fruit bowl before 9 AM.',
    tags: ['Healthy', 'Fresh'],
    upiVpa: 'juicecorner.tiet@ybl',
    menu: [
      {
        name: 'Juices',
        items: [
          { id: 'jui-1', name: 'Fresh orange', price: 80, desc: 'No added sugar', veg: true, popular: true },
          { id: 'jui-2', name: 'Mixed fruit', price: 110, desc: 'Seasonal blend', veg: true, popular: true },
          { id: 'jui-3', name: 'Sugarcane', price: 60, desc: 'With lemon and ginger', veg: true },
          { id: 'jui-4', name: 'Watermelon', price: 70, desc: 'Chilled, salted', veg: true },
        ],
      },
      {
        name: 'Bowls',
        items: [
          { id: 'jui-5', name: 'Fruit bowl', price: 120, desc: 'Papaya, apple, banana, grapes', veg: true },
          { id: 'jui-6', name: 'Banana shake', price: 90, desc: 'Thick, with honey', veg: true },
        ],
      },
    ],
  },
  {
    slug: 'amul-stall',
    name: 'Amul & Verka Stall',
    tagline: 'Milk, curd, kulfi',
    location: 'Shopping arcade, opposite post office',
    category: 'Quick bites',
    cuisine: ['Dairy', 'Desserts'],
    rating: 4.2,
    reviews: 188,
    open: '07:00',
    close: '21:30',
    queue: 1,
    prep: 2,
    emoji: '🥛',
    accent: ['#152439', '#24547f'],
    blurb: 'Midnight lassi emergencies solved since first year.',
    tags: ['Dairy', 'Cheapest'],
    upiVpa: 'amulverka.tiet@ybl',
    menu: [
      {
        name: 'Dairy',
        items: [
          { id: 'amu-1', name: 'Amul milk 500 ml', price: 30, desc: 'Toned', veg: true },
          { id: 'amu-2', name: 'Sweet lassi', price: 50, desc: 'Chilled glass', veg: true, popular: true },
          { id: 'amu-3', name: 'Curd cup', price: 40, desc: '200 g', veg: true },
          { id: 'amu-4', name: 'Kulfi', price: 45, desc: 'Malai', veg: true, popular: true },
        ],
      },
    ],
  },
  {
    slug: 'night-canteen',
    name: 'Hostel Night Canteen',
    tagline: 'Open till 2 AM',
    location: 'Hostel H, ground floor',
    category: 'Late night',
    cuisine: ['Late night', 'Snacks'],
    rating: 3.9,
    reviews: 512,
    open: '22:00',
    close: '02:00',
    queue: 5,
    prep: 8,
    emoji: '🌙',
    accent: ['#131a2e', '#3a3f78'],
    blurb: 'The 1 AM maggi run when the assignment is due at 8. Pay before you queue.',
    tags: ['Late night', 'Hostel only'],
    upiVpa: 'nightcanteen.h@ybl',
    menu: [
      {
        name: 'Late night',
        items: [
          { id: 'nig-1', name: 'Bread omelette', price: 70, desc: 'Double egg', veg: false, popular: true },
          { id: 'nig-2', name: 'Masala Maggi', price: 50, desc: 'With cheese', veg: true, popular: true },
          { id: 'nig-3', name: 'Rajma chawal', price: 90, desc: 'Leftover-friendly', veg: true },
          { id: 'nig-4', name: 'Aloo paratha', price: 60, desc: 'With curd', veg: true },
        ],
      },
      {
        name: 'Warm up',
        items: [
          { id: 'nig-5', name: 'Kulhad chai', price: 20, desc: 'At 1 AM, priceless', veg: true },
          { id: 'nig-6', name: 'Hot milk', price: 30, desc: 'With turmeric', veg: true },
        ],
      },
    ],
  },
];

export const CATEGORIES: Array<OutletCategory | 'All'> = [
  'All',
  'Food court',
  'Cafe',
  'Quick bites',
  'Meals',
  'Late night',
];

export function getOutlet(slug: string | undefined): Outlet | undefined {
  return OUTLETS.find((outlet) => outlet.slug === slug);
}

export function outletItem(outlet: Outlet, itemId: string): MenuItem | undefined {
  for (const section of outlet.menu) {
    const found = section.items.find((item) => item.id === itemId);
    if (found) return found;
  }
  return undefined;
}

/** Open/closed using the outlet's local hours; handles past-midnight closing times. */
export function isOpenNow(outlet: Outlet, now = new Date()): boolean {
  const minutes = now.getHours() * 60 + now.getMinutes();
  const toMin = (value: string) => {
    const [h, m] = value.split(':').map(Number);
    return h * 60 + m;
  };
  const open = toMin(outlet.open);
  const close = toMin(outlet.close);
  if (close > open) return minutes >= open && minutes < close;
  return minutes >= open || minutes < close;
}

export function closingLabel(outlet: Outlet): string {
  const [h, m] = outlet.close.split(':').map(Number);
  const hour12 = h % 12 === 0 ? 12 : h % 12;
  return `${hour12}${m ? `:${String(m).padStart(2, '0')}` : ''} ${h < 12 ? 'AM' : 'PM'}`;
}

export type Coupon = { code: string; label: string; percent: number; cap: number; minimum: number };

export const COUPONS: Coupon[] = [
  { code: 'TAPRI10', label: '10% off your order', percent: 10, cap: 50, minimum: 0 },
  { code: 'PROMPTWARS', label: '15% off, hackathon special', percent: 15, cap: 75, minimum: 100 },
  { code: 'FIRST50', label: '₹50 off orders over ₹150', percent: 100, cap: 50, minimum: 150 },
];
