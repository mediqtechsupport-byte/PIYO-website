export const RESTAURANT_INFO = {
  name: 'PIYO Grill & Restaurant',
  shortName: 'PIYO',
  established: 'Est. 2025',
  tagline: 'Bringing smiles to every plate!',
  heroSubheadline:
    'Authentic Negros heritage soups, charcoal-grilled sinugba, and comforting Filipino favorites served in the cool Tagaytay breeze.',
  address: 'Km. 64, Tagaytay-Nasugbu Highway, Brgy. Bagong Tubig, Tagaytay City, Cavite 4120',
  shortAddress: 'Km. 64 Tagaytay-Nasugbu Hwy, Brgy. Bagong Tubig, Tagaytay',
  mobile: '0939 637 4163',
  mobileTel: '+639396374163',
  landline: '(046) 889 5133',
  landlineTel: '+63468895133',
  email: 'piyoresto.tagaytay@gmail.com',
  website: 'https://www.piyogrill.com/',
  facebook: 'https://www.facebook.com/p/Piyo-Grill-Restaurant-61571825014712/',
  instagram: 'https://www.instagram.com/piyogrillandrestaurant',
  googleMapsUrl:
    'https://www.google.com/maps/search/?api=1&query=Piyo+Grill+and+Restaurant+Km+64+Tagaytay+Nasugbu+Highway+Bagong+Tubig+Tagaytay+City',
  wazeUrl:
    'https://waze.com/ul?q=Piyo%20Grill%20and%20Restaurant%20Bagong%20Tubig%20Tagaytay%20City',
  services: ['Dine-In', 'Takeout', 'Reservations', 'Group & Family Events'],
  rating: {
    score: '4.7',
    label: 'Loved across Tagaytay',
    breakdown: 'Food 5/5 · Service 5/5 · Atmosphere 5/5',
  },
  hours: [
    { days: 'Monday – Thursday', time: '11:00 AM – 8:00 PM', openHour: 11, closeHour: 20 },
    { days: 'Friday – Sunday', time: '7:00 AM – 10:00 PM', openHour: 7, closeHour: 22 },
  ],
};

export const MENU_CATEGORIES = [
  { id: 'all', label: 'All Menu', icon: 'UtensilsCrossed' },
  { id: 'soups', label: 'Negros Soups', icon: 'Soup' },
  { id: 'grill', label: 'Sinugba & Specials', icon: 'Flame' },
  { id: 'pasta-pizza', label: 'Silog, Pasta & Pizza', icon: 'Pizza' },
  { id: 'appetizers', label: 'Appetizers', icon: 'Sparkles' },
  { id: 'drinks', label: 'Coolers & Shakes', icon: 'CupSoda' },
  { id: 'sides', label: 'Rice & Sides', icon: 'Bowl' },
];

export const QUICK_FILTERS = [
  { id: 'all', label: 'All Dishes' },
  { id: 'bestseller', label: 'House Bestsellers' },
  { id: 'negros', label: 'Negros Heritage' },
  { id: 'sharing', label: 'Good for Sharing' },
  { id: 'warmer', label: 'Tagaytay Warmers' },
];

export const MENU_ITEMS = [
  // Negros Heritage Soups
  {
    id: 'bacolod-cansi',
    name: 'Bacolod Cansi',
    category: 'soups',
    price: 666,
    image: '/images/dish-kansi.jpg',
    badge: 'House Favorite',
    tags: ['bestseller', 'negros', 'sharing', 'warmer'],
    serving: 'Sharing Bowl · Free Soup Refills',
    prepTime: '15–20 min',
    spiceLevel: 'Mild (Optional Chili)',
    shortDesc:
      'Signature Ilonggo beef shank soup naturally soured with batwan, rich bone marrow, and tender beef.',
    fullDesc:
      'A true taste of Negros in cool Tagaytay weather. Slow-simmered beef shank and marrow infused with authentic batwan fruit for that unmistakable savory-tangy broth, paired with jackfruit and lemongrass. Guests love our generous free soup refills!',
    variants: [
      { label: 'Classic Sharing Bowl', priceDelta: 0 },
      { label: 'Extra Bone Marrow Add-on', priceDelta: 150 },
    ],
    addons: [
      { id: 'garlic-rice', label: 'Add Garlic Rice', price: 45 },
      { id: 'plain-rice', label: 'Add Steamed Rice', price: 35 },
    ],
  },
  {
    id: 'tagaytay-bulalo',
    name: 'Tagaytay Classic Bulalo',
    category: 'soups',
    price: 666,
    image: '/images/dish-kansi.jpg',
    badge: 'Tagaytay Classic',
    tags: ['bestseller', 'sharing', 'warmer'],
    serving: 'Sharing Pot · Good for 2–3',
    prepTime: '15–20 min',
    spiceLevel: 'None',
    shortDesc:
      'Slow-simmered beef shank and marrow broth with sweet corn, cabbage, and fresh Tagaytay pechay.',
    fullDesc:
      'Comfort in a steaming pot built for misty Tagaytay mornings and evenings. Tender fall-apart beef shank simmered for hours until the broth turns deeply aromatic, finished with crisp local greens.',
    variants: [
      { label: 'Regular Sharing Pot', priceDelta: 0 },
      { label: 'Family Pot (4–5 pax)', priceDelta: 240 },
    ],
    addons: [
      { id: 'garlic-rice', label: 'Add Garlic Rice', price: 45 },
      { id: 'calamansi-patis', label: 'Extra Calamansi & Sili', price: 0 },
    ],
  },
  {
    id: 'kbl-negros',
    name: 'KBL (Kadyos, Baboy, Langka)',
    category: 'soups',
    price: 666,
    image: '/images/dish-kansi.jpg',
    badge: 'Negros Specialty',
    tags: ['negros', 'sharing', 'warmer'],
    serving: 'Sharing Bowl · Good for 2–3',
    prepTime: '15 min',
    spiceLevel: 'Mild',
    shortDesc:
      'Beloved Ilonggo heirloom stew of pigeon peas, tender pork hock, and young jackfruit soured with batwan.',
    fullDesc:
      'A comforting Negrense classic rarely found along the Tagaytay ridge. Earthy kadyos beans, slow-braised pork hock, and tender langka simmered with batwan and lemongrass for a rich, soul-warming broth.',
    variants: [{ label: 'Heritage Sharing Bowl', priceDelta: 0 }],
    addons: [{ id: 'plain-rice', label: 'Add Steamed Rice', price: 35 }],
  },
  {
    id: 'batchoy-overload',
    name: 'Batchoy Overload',
    category: 'soups',
    price: 286,
    image: '/images/dish-kansi.jpg',
    badge: 'Solo / Duo Warmer',
    tags: ['bestseller', 'negros', 'warmer'],
    serving: 'Loaded Solo Bowl',
    prepTime: '10–12 min',
    spiceLevel: 'None',
    shortDesc:
      'Hearty Iloilo-style miki noodle soup topped with pork slices, crispy chicharon, toasted garlic, and egg.',
    fullDesc:
      'Rich roasted pork and shrimp-kissed broth poured steaming hot over springy egg noodles, crowned generously with crushed pork cracklings, green onions, and crispy garlic bits.',
    variants: [
      { label: 'Regular Overload', priceDelta: 0 },
      { label: 'Extra Egg & Chicharon', priceDelta: 45 },
    ],
    addons: [{ id: 'garlic-bread', label: 'Side Garlic Toast', price: 55 }],
  },
  {
    id: 'laswa-soup',
    name: 'Ilonggo Laswa',
    category: 'soups',
    price: 286,
    image: '/images/dish-kansi.jpg',
    badge: 'Light & Fresh',
    tags: ['negros', 'warmer'],
    serving: 'Sharing Bowl',
    prepTime: '10–12 min',
    spiceLevel: 'None',
    shortDesc:
      'Wholesome Ilonggo mixed vegetable soup with squash, okra, string beans, and malunggay.',
    fullDesc:
      'A bright, comforting bowl of garden vegetables simmered in savory shrimp-seasoned broth — light, nourishing, and pairs wonderfully with grilled meats.',
    variants: [{ label: 'Regular Bowl', priceDelta: 0 }],
    addons: [{ id: 'plain-rice', label: 'Add Steamed Rice', price: 35 }],
  },

  // Sinugba & House Specials
  {
    id: 'bacolod-chicken-inasal',
    name: 'Bacolod Chicken Inasal',
    category: 'grill',
    price: 401,
    image: '/images/dish-inasal.jpg',
    badge: 'Bestseller',
    tags: ['bestseller', 'negros'],
    serving: 'Served on Banana Leaf w/ Soup & Rice',
    prepTime: '15–18 min',
    spiceLevel: 'Mild Savory',
    shortDesc:
      'Charcoal-grilled chicken quarter basted with smoky annatto oil, tanglad, calamansi, and ginger.',
    fullDesc:
      'Marinated the authentic Bacolod way in vinegar, calamansi, lemongrass, and garlic, then grilled over live coals and brushed with vibrant annatto oil. Served on a fresh banana leaf with garlic rice, calamansi, chili, and warm broth.',
    variants: [
      { label: 'Paa (Leg Quarter) Meal', priceDelta: 0 },
      { label: 'Pecho (Breast & Wing) Meal', priceDelta: 20 },
      { label: '2-Piece Family Duo', priceDelta: 340 },
    ],
    addons: [
      { id: 'garlic-rice', label: 'Extra Garlic Rice', price: 45 },
      { id: 'atchara', label: 'Side Atchara', price: 45 },
    ],
  },
  {
    id: 'crispy-pata',
    name: 'Crispy Pata',
    category: 'grill',
    price: 1379,
    image: '/images/dish-specials.jpg',
    badge: 'Feast Centerpiece',
    tags: ['bestseller', 'sharing'],
    serving: 'Whole Knuckle · Good for 4–5',
    prepTime: '25 min',
    spiceLevel: 'None',
    shortDesc:
      'Golden-crackling deep-fried pork knuckle with melt-in-your-mouth tender meat and spiced soy-vinegar dip.',
    fullDesc:
      'Our showstopper for Tagaytay family gatherings. Slowly braised in bay leaves and peppercorns, air-dried, and fried until the skin shatters cleanly at the touch of a fork.',
    variants: [{ label: 'Whole Family Knuckle', priceDelta: 0 }],
    addons: [
      { id: 'atchara', label: 'Atchara Papaya Relish', price: 45 },
      { id: 'garlic-rice', label: 'Platter of Garlic Rice (4x)', price: 160 },
    ],
  },
  {
    id: 'boneless-lechon',
    name: 'Boneless Lechon',
    category: 'grill',
    price: 1138,
    image: '/images/dish-specials.jpg',
    badge: 'Weekend Hit',
    tags: ['sharing'],
    serving: 'Sharing Platter · Good for 3–4',
    prepTime: '20 min',
    spiceLevel: 'None',
    shortDesc:
      'Aromatic rolled pork belly stuffed with lemongrass, garlic, and scallions, roasted to blistered crispness.',
    fullDesc:
      'Every slice combines crackling blistered skin with juicy herb-perfumed pork belly, served alongside classic spiced vinegar and savory liver sauce.',
    variants: [{ label: 'Sharing Roll Platter', priceDelta: 0 }],
    addons: [{ id: 'garlic-rice', label: 'Add Garlic Rice', price: 45 }],
  },
  {
    id: 'sizzling-bulalo-steak',
    name: 'Sizzling Bulalo Steak',
    category: 'grill',
    price: 953,
    image: '/images/dish-specials.jpg',
    badge: 'Chef Signature',
    tags: ['bestseller', 'sharing', 'warmer'],
    serving: 'Sizzling Cast-Iron · Good for 2–3',
    prepTime: '18 min',
    spiceLevel: 'Peppery Savory',
    shortDesc:
      'Fork-tender braised beef shank seared on a cast-iron skillet with rich roasted mushroom gravy and marrow.',
    fullDesc:
      'A Tagaytay indulgence served piping hot at your table. Tender slow-cooked shank smothered in velvety cracked-pepper mushroom gravy with caramelized onions and buttery mashed potato or corn.',
    variants: [{ label: 'Sizzling Sharing Plate', priceDelta: 0 }],
    addons: [
      { id: 'mashed-potato', label: 'Extra Mashed Potato', price: 85 },
      { id: 'garlic-rice', label: 'Add Garlic Rice', price: 45 },
    ],
  },
  {
    id: 'back-ribs',
    name: 'Piyo Hickory Back Ribs',
    category: 'grill',
    price: 976,
    image: '/images/dish-specials.jpg',
    badge: 'Grill House Pick',
    tags: ['sharing'],
    serving: 'Full Rack Sharing · or Rice Meal',
    prepTime: '18 min',
    spiceLevel: 'Sweet & Smoky',
    shortDesc:
      'Fall-off-the-bone pork back ribs glazed in smoky house BBQ sauce with roasted garlic and corn.',
    fullDesc:
      'Low-and-slow braised pork ribs finished over open flame with Piyo’s sweet-tangy glaze for deep smoky caramelization.',
    variants: [
      { label: 'Full Sharing Slab', priceDelta: 0 },
      { label: 'Solo Rice Meal Option', priceDelta: -545 },
    ],
    addons: [{ id: 'mashed-potato', label: 'Side Mashed Potato', price: 85 }],
  },
  {
    id: 'crispy-kare-kare',
    name: 'Crispy Kare-Kare',
    category: 'grill',
    price: 976,
    image: '/images/dish-specials.jpg',
    badge: 'Family Favorite',
    tags: ['sharing'],
    serving: 'Sharing Pot · Good for 3–4',
    prepTime: '18–20 min',
    spiceLevel: 'None',
    shortDesc:
      'Crispy pork belly slices over velvety roasted peanut stew with sitaw, eggplant, and house-sautéed bagoong.',
    fullDesc:
      'Silky toasted peanut and rice-flour sauce paired with crisp vegetables and golden crunch-top pork belly so every bite balances creaminess and crunch.',
    variants: [{ label: 'Sharing Platter', priceDelta: 0 }],
    addons: [{ id: 'plain-rice', label: 'Add Steamed Rice', price: 35 }],
  },
  {
    id: 'sizzling-pork-sisig',
    name: 'Sizzling Pork Sisig',
    category: 'grill',
    price: 436,
    image: '/images/dish-specials.jpg',
    badge: 'Sizzling Classic',
    tags: ['bestseller'],
    serving: 'Cast-Iron Platter · Good for 2',
    prepTime: '12–15 min',
    spiceLevel: 'Medium (Chili on Side)',
    shortDesc:
      'Crispy chopped pork tossed with red onions, calamansi, chili, and rich savory seasoning on a hot plate.',
    fullDesc:
      'Crunchy, citrusy, and deeply savory — finished on a sizzling skillet with crispy cracklings and fresh aromatics.',
    variants: [
      { label: 'Classic Sizzling Platter', priceDelta: 0 },
      { label: 'With Sunny-Side-Up Egg', priceDelta: 25 },
    ],
    addons: [{ id: 'garlic-rice', label: 'Add Garlic Rice', price: 45 }],
  },
  {
    id: 'grilled-liempo',
    name: 'Sinugba Grilled Liempo',
    category: 'grill',
    price: 401,
    image: '/images/dish-inasal.jpg',
    badge: 'Charcoal Grilled',
    tags: ['bestseller'],
    serving: 'Rice Meal or Ala Carte',
    prepTime: '15 min',
    spiceLevel: 'Mild',
    shortDesc:
      'Thick-cut pork belly marinated in citrus, soy, and garlic, flame-grilled for smoky caramelized edges.',
    fullDesc:
      'Prepared in our dedicated outdoor grill station so the dining hall stays cool and fresh while your liempo gets real charcoal char.',
    variants: [
      { label: 'With Garlic Rice & Atchara', priceDelta: 0 },
      { label: 'Double Sharing Cut', priceDelta: 260 },
    ],
    addons: [{ id: 'atchara', label: 'Extra Atchara', price: 45 }],
  },
  {
    id: 'grilled-bangus',
    name: 'Stuffed Grilled Bangus',
    category: 'grill',
    price: 410,
    image: '/images/dish-inasal.jpg',
    badge: 'Fresh Catch',
    tags: ['sharing'],
    serving: 'Whole Butterfly or Stuffed',
    prepTime: '18 min',
    spiceLevel: 'None',
    shortDesc:
      'Boneless milkfish stuffed with diced tomatoes, onions, ginger, and calamansi wrapped in banana leaf.',
    fullDesc:
      'Steamed and charred inside fragrant banana leaf so the fish stays flaky, moist, and aromatic, served with soy-calamansi dip.',
    variants: [{ label: 'Whole Grilled Bangus', priceDelta: 0 }],
    addons: [{ id: 'garlic-rice', label: 'Add Garlic Rice', price: 45 }],
  },
  {
    id: 'homestyle-fried-chicken',
    name: "Piyo's Homestyle Fried Chicken",
    category: 'grill',
    price: 369,
    image: '/images/dish-inasal.jpg',
    badge: 'Kid & Family Hit',
    tags: ['bestseller'],
    serving: 'Half / Whole Options',
    prepTime: '15–18 min',
    spiceLevel: 'None',
    shortDesc:
      'Crispy golden seasoned fried chicken marinated with garlic and herbs, served with house gravy.',
    fullDesc:
      'Juicy, crunchy comfort chicken seasoned to the bone — a reliable favorite for kids, families, and relaxed Tagaytay lunches.',
    variants: [
      { label: 'Half Chicken Basket', priceDelta: 0 },
      { label: 'Whole Family Basket', priceDelta: 320 },
    ],
    addons: [{ id: 'mashed-potato', label: 'Side Mashed Potato', price: 85 }],
  },

  // Silog, Pasta & Artisan 10" Pizzas
  {
    id: 'taste-of-home-silog',
    name: 'A Taste of Home Silog',
    category: 'pasta-pizza',
    price: 265,
    image: '/images/dish-silog.jpg',
    badge: 'Fri–Sun 7AM Breakfast',
    tags: ['bestseller', 'warmer'],
    serving: 'With Garlic Rice, Egg & Brewed Coffee',
    prepTime: '10–12 min',
    spiceLevel: 'None',
    shortDesc:
      'Garlic fried rice, sunny-side-up egg, choice of caramelized pork tocino or grilled liempo, and Tagaytay coffee.',
    fullDesc:
      'Featured on our page for early Tagaytay mornings: *"Some mornings call for a little more than just coffee."* Served with tomato-onion relish and spiced vinegar.',
    variants: [
      { label: 'Pork Tocino Silog', priceDelta: 0 },
      { label: 'Grilled Liempo Silog', priceDelta: 45 },
      { label: 'Chicken Inasal Silog', priceDelta: 55 },
    ],
    addons: [{ id: 'extra-egg', label: 'Extra Sunny-Side Egg', price: 25 }],
  },
  {
    id: 'creamy-bacon-pasta',
    name: 'Creamy Bacon & Mushroom Fettuccine',
    category: 'pasta-pizza',
    price: 365,
    image: '/images/dish-pasta-pizza.jpg',
    badge: 'Facebook Feature',
    tags: ['bestseller'],
    serving: 'Served w/ Grilled Garlic Breadstick',
    prepTime: '12–15 min',
    spiceLevel: 'None',
    shortDesc:
      'Al dente fettuccine tossed in velvety parmesan-herb cream with smoky bacon strips and button mushrooms.',
    fullDesc:
      '*"Pasta Cravings? We got you!"* Rich garlic-parmesan cream sauce clings to wide fettuccine ribbons, finished with cracked black pepper and charred buttered toast.',
    variants: [
      { label: 'Solo Plate', priceDelta: 0 },
      { label: 'Sharing Tray (2–3 pax)', priceDelta: 290 },
    ],
    addons: [{ id: 'garlic-bread', label: 'Extra Garlic Breadstick', price: 55 }],
  },
  {
    id: 'pork-adobo-pizza',
    name: 'Pork Adobo Artisan Pizza (10")',
    category: 'pasta-pizza',
    price: 677,
    image: '/images/dish-pasta-pizza.jpg',
    badge: 'Filipino Fusion',
    tags: ['bestseller', 'sharing'],
    serving: '10 Inches · 8 Slices',
    prepTime: '15–18 min',
    spiceLevel: 'Savory',
    shortDesc:
      'Crispy hand-stretched crust topped with tender shredded pork adobo flakes, caramelized onion, and mozzarella.',
    fullDesc:
      '*"What happens when a Filipino classic meets pizza?"* Savory garlic-soy pork adobo balanced by molten mozzarella and a delicate blistered crust.',
    variants: [{ label: '10-Inch Whole (8 Slices)', priceDelta: 0 }],
    addons: [{ id: 'chili-oil', label: 'House Chili Garlic Oil', price: 0 }],
  },
  {
    id: 'cuatro-quezo-pizza',
    name: 'Cuatro Quezo Pizza (10")',
    category: 'pasta-pizza',
    price: 677,
    image: '/images/dish-pasta-pizza.jpg',
    badge: '4-Cheese Favorite',
    tags: ['sharing'],
    serving: '10 Inches · 8 Slices',
    prepTime: '15 min',
    spiceLevel: 'None',
    shortDesc:
      'Four-cheese blend of mozzarella, cheddar, parmesan, and cream cheese baked golden with herbs.',
    fullDesc:
      'Lush, bubbling four-cheese pizza crafted for sharing alongside hot soups or iced coolers.',
    variants: [{ label: '10-Inch Whole (8 Slices)', priceDelta: 0 }],
    addons: [],
  },
  {
    id: 'hawaiian-pizza',
    name: 'Classic Hawaiian Pizza (10")',
    category: 'pasta-pizza',
    price: 677,
    image: '/images/dish-pasta-pizza.jpg',
    badge: 'Family Classic',
    tags: ['sharing'],
    serving: '10 Inches · 8 Slices',
    prepTime: '15 min',
    spiceLevel: 'None',
    shortDesc:
      'Sweet pineapple chunks, smoky ham, rich tomato sauce, and stretchy mozzarella on crisp 10-inch dough.',
    fullDesc:
      'A sweet-savory crowd pleaser baked crisp to order for kids and barkada tables.',
    variants: [{ label: '10-Inch Whole (8 Slices)', priceDelta: 0 }],
    addons: [],
  },

  // Appetizers & Pica-Pica
  {
    id: 'piyo-savory-wings',
    name: 'Piyo Savory Wings',
    category: 'appetizers',
    price: 552,
    image: '/images/dish-specials.jpg',
    badge: 'Barkada Starter',
    tags: ['sharing'],
    serving: 'Sharing Basket',
    prepTime: '14 min',
    spiceLevel: 'Savory Garlic',
    shortDesc:
      'Crisp golden chicken wings glazed in Piyo’s signature garlic-soy and honey-pepper coat.',
    fullDesc:
      'Double-fried for lasting crunch and tossed in a sweet-savory glaze with toasted sesame and dipping sauce.',
    variants: [{ label: 'Sharing Basket (8 pcs)', priceDelta: 0 }],
    addons: [],
  },
  {
    id: 'cheesy-lumpia',
    name: 'Cheesy Beef / Chicken Lumpia',
    category: 'appetizers',
    price: 309,
    image: '/images/dish-specials.jpg',
    badge: 'Crunchy Starter',
    tags: ['sharing'],
    serving: 'Sharing Plate',
    prepTime: '10 min',
    spiceLevel: 'None',
    shortDesc:
      'Crisp golden spring rolls packed with seasoned ground beef or chicken and melted cheddar.',
    fullDesc:
      'Freshly rolled and fried to crackling perfection with sweet chili dipping sauce.',
    variants: [
      { label: 'Cheesy Beef', priceDelta: 0 },
      { label: 'Cheesy Chicken', priceDelta: 0 },
    ],
    addons: [],
  },
  {
    id: 'chicharon-bulaklak',
    name: 'Chicharon Bulaklak',
    category: 'appetizers',
    price: 247,
    image: '/images/dish-specials.jpg',
    badge: 'Pulutan Favorite',
    tags: [],
    serving: 'Regular Plate w/ Spiced Vinegar',
    prepTime: '12 min',
    spiceLevel: 'None',
    shortDesc:
      'Light, shattering crispy ruffled pork cracklings served with native spiced cane vinegar.',
    fullDesc:
      'Deep-fried until airy and golden-crisp — the ideal starter while waiting for your Cansi or Sinugba.',
    variants: [{ label: 'Classic Plate', priceDelta: 0 }],
    addons: [],
  },
  {
    id: 'crispy-eggplant-sticks',
    name: 'Crispy Eggplant Sticks',
    category: 'appetizers',
    price: 217,
    image: '/images/dish-specials.jpg',
    badge: 'Guest Surprise',
    tags: ['bestseller'],
    serving: 'Sharing Basket',
    prepTime: '10 min',
    spiceLevel: 'None',
    shortDesc:
      'Lightly breaded golden eggplant fries — crisp outside, tender inside, with creamy garlic dip.',
    fullDesc:
      'Frequently praised by returning Tagaytay guests as a surprisingly addictive starter for all ages.',
    variants: [{ label: 'Classic Basket', priceDelta: 0 }],
    addons: [],
  },

  // Coolers & Shakes
  {
    id: 'mango-dragon-swirl',
    name: 'Mango Dragon Swirl',
    category: 'drinks',
    price: 197,
    image: '/images/dish-refreshers.jpg',
    badge: 'Signature Shake',
    tags: ['bestseller'],
    serving: 'Tall Chilled Glass',
    prepTime: '5 min',
    spiceLevel: 'Sweet & Tropical',
    shortDesc:
      'Vibrant layered shake of sweet Philippine mangoes swirled with fresh red dragonfruit.',
    fullDesc:
      'Made with real ripe tropical fruit — velvety, naturally vibrant, and crafted to complement smoky grilled dishes.',
    variants: [{ label: 'Tall Glass', priceDelta: 0 }],
    addons: [],
  },
  {
    id: 'berry-avocado-shakes',
    name: 'Avocado Chill / Berry Burst / Mango Dream',
    category: 'drinks',
    price: 175,
    image: '/images/dish-refreshers.jpg',
    badge: 'Fresh Fruit',
    tags: [],
    serving: 'Tall Chilled Glass',
    prepTime: '5 min',
    spiceLevel: 'Refreshing',
    shortDesc:
      'Creamy Tagaytay avocado shake, mixed berry cooler, sweet melon breeze, or pure mango dream.',
    fullDesc:
      'Choose your favorite fresh tropical blend whipped smooth to order.',
    variants: [
      { label: 'Avocado Chill', priceDelta: 0 },
      { label: 'Berry Burst', priceDelta: 0 },
      { label: 'Melon Breeze', priceDelta: 0 },
      { label: 'Mango Dream', priceDelta: 0 },
    ],
    addons: [],
  },
  {
    id: 'guyabano-breeze',
    name: 'Guyabano Breeze',
    category: 'drinks',
    price: 164,
    image: '/images/dish-refreshers.jpg',
    badge: 'Local Harvest',
    tags: [],
    serving: 'Tall Chilled Glass',
    prepTime: '5 min',
    spiceLevel: 'Crisp & Tangy',
    shortDesc:
      'Cool soursop tropical refresher — bright, gently tangy, and lightly sweetened.',
    fullDesc:
      'A refreshing palate cleanser between rich bowls of Cansi, Bulalo, and Crispy Pata.',
    variants: [{ label: 'Tall Glass', priceDelta: 0 }],
    addons: [],
  },

  // Rice & Sides
  {
    id: 'garlic-rice-side',
    name: 'Toasted Garlic Rice',
    category: 'sides',
    price: 45,
    image: '/images/dish-silog.jpg',
    badge: 'Essential Side',
    tags: [],
    serving: 'Single Cup / Sharing Platter',
    prepTime: '5 min',
    spiceLevel: 'None',
    shortDesc:
      'Fragrant steamed jasmine rice wok-tossed with golden crispy garlic chips.',
    fullDesc:
      'Essential companion for Bacolod Chicken Inasal, Sisig, and steaming bowls of Cansi.',
    variants: [
      { label: 'Single Cup', priceDelta: 0 },
      { label: 'Family Platter (4x)', priceDelta: 115 },
    ],
    addons: [],
  },
  {
    id: 'mashed-potato-atchara',
    name: 'Creamy Mashed Potato / House Atchara',
    category: 'sides',
    price: 85,
    image: '/images/dish-inasal.jpg',
    badge: 'Side Dish',
    tags: [],
    serving: 'Side Bowl',
    prepTime: '5 min',
    spiceLevel: 'None',
    shortDesc:
      'Velvety butter mashed potatoes or crisp pickled green papaya atchara relish.',
    fullDesc:
      'Choose buttery mashed potatoes for steaks and ribs, or bright tangy atchara to balance rich grilled platters.',
    variants: [
      { label: 'Creamy Mashed Potato', priceDelta: 0 },
      { label: 'House Atchara Relish', priceDelta: -40 },
    ],
    addons: [],
  },
];

export const TESTIMONIALS = [
  {
    id: 'averilla',
    author: 'J. Averilla',
    source: 'Verified Facebook Guest Review',
    quote:
      'First try and we instantly loved this place. We sat on a small table and later on asked if we are allowed on the bigger table since it was a bit stuffed, surprised that it was fine with them even if table was like 6–8 seater. Food was super good specially the Kansi ❤️ We brought our parents on our second visit and they loved it too! The soup had free refills and worth the price too! Good serving for the price and good service too. Definitely one of our faves in Tagaytay!',
    ratings: { food: '5/5', service: '5/5', atmosphere: '5/5' },
    highlightDish: 'Bacolod Cansi',
  },
  {
    id: 'negros-heritage',
    author: 'Tagaytay Food Adventurers',
    source: 'Dining Community Highlight',
    quote:
      'Authentic Negros food along the Tagaytay-Nasugbu Highway — having real batwan-soured Cansi, Bacolod Chicken Inasal, and Batchoy Overload with cozy indoor seating away from the grill smoke makes every weekend drive worthwhile.',
    ratings: { food: '5/5', service: '5/5', atmosphere: '5/5' },
    highlightDish: 'Bacolod Chicken Inasal & KBL',
  },
  {
    id: 'family-weekend',
    author: 'Weekend Family Diners',
    source: 'Local Platform Feedback',
    quote:
      'Generous portions built for sharing, warm staff who welcome big family tables, and early Friday–Sunday breakfast hours starting at 7 AM. Crispy Eggplant Sticks and Mango Dragon Swirl were a surprise hit alongside the Bulalo!',
    ratings: { food: '4.7/5', service: '5/5', atmosphere: '5/5' },
    highlightDish: 'Crispy Eggplant Sticks & Bulalo',
  },
];
