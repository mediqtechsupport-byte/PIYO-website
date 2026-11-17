import React, { useState } from 'react';
import { X, Flame, Sparkles, UtensilsCrossed, MapPin } from 'lucide-react';
import DishOrbitCarousel, { type Dish } from '@/components/ui/dish-orbit-carousel';
import { MENU_ITEMS } from '../data/menuData';
import { formatPeso } from '../utils/hours';

const SPOTLIGHT_META = [
  {
    menuId: 'bacolod-cansi',
    storyTitle: 'Slow-Simmered with Authentic Batwan',
    prepSteps: [
      'Beef shank & bone marrow gently simmered for hours until fork-tender.',
      'Soured naturally with Negros batwan fruit, lemongrass, and young jackfruit.',
      'Served steaming hot for cool Tagaytay weather — ask for free soup refills!',
    ],
    pairWith: 'Toasted Garlic Rice + Calamansi & Chili',
  },
  {
    menuId: 'bacolod-chicken-inasal',
    storyTitle: 'Charcoal-Grilled Outside, Smoke-Free Inside',
    prepSteps: [
      'Marinated overnight in fresh calamansi, tanglad, ginger, garlic, and native vinegar.',
      'Seared over live coals at our separated outdoor grill station and basted with annatto oil.',
      'Plated on fragrant banana leaf with spiced chicken oil, chili, and warm broth.',
    ],
    pairWith: 'Garlic Rice + House Atchara Relish',
  },
  {
    menuId: 'sizzling-bulalo-steak',
    storyTitle: 'Tagaytay’s Marrow Classic on Cast Iron',
    prepSteps: [
      'Braised beef shank finished on a screaming-hot cast-iron platter.',
      'Topped with rich cracked-pepper mushroom gravy and caramelized onions.',
      'Served sizzling straight to your table alongside buttery mashed potato.',
    ],
    pairWith: 'Mango Dragon Swirl + Steamed Rice',
  },
  {
    menuId: 'crispy-pata',
    storyTitle: 'Built for 6–8 Seater Family Tables',
    prepSteps: [
      'Whole pork knuckle braised gently with bay leaves and whole peppercorns.',
      'Air-chilled and fried to crackling, shattering golden skin with juicy meat inside.',
      'Carved for the table with spiced soy-cane vinegar dip and crispy garlic.',
    ],
    pairWith: 'Ilonggo Laswa + Platter of Garlic Rice',
  },
  {
    menuId: 'pork-adobo-pizza',
    storyTitle: 'Where Filipino Comfort Meets Artisan Crust',
    prepSteps: [
      '10-inch hand-stretched dough topped with savory shredded garlic-soy pork adobo.',
      'Layered with molten mozzarella, sweet caramelized onions, and scallions.',
      'Baked crisp into 8 slices — a crowd-pleaser for kids and barkada road trips.',
    ],
    pairWith: 'Guyabano Breeze or Berry Burst',
  },
];

const PIYO_ORBIT_DISHES: Dish[] = [
  {
    title: 'Bacolod',
    subtitle: 'Cansi',
    image: '/images/dish-kansi.jpg',
    eyebrow: '#1 Most loved in Tagaytay · Free soup refills',
    label: 'Bacolod Cansi',
    rating: 4.9,
    chef: 'PIYO Kitchen',
    kitchen: 'Tagaytay–Nasugbu Hwy · Km. 64',
    description:
      'Slow-simmered beef shank and marrow soured naturally with batwan fruit, jackfruit, and lemongrass. Free soup refills!',
    likes: 342,
    ingredients: [
      'Beef Shank',
      'Bone Marrow',
      'Batwan Fruit',
      'Jackfruit',
      'Lemongrass',
      'Free Soup Refills',
    ],
    accent: '#9DC3AB',
  },
  {
    title: 'Chicken',
    subtitle: 'Inasal',
    image: '/images/dish-inasal.jpg',
    eyebrow: '#2 Charcoal sinugba signature',
    label: 'Chicken Inasal',
    rating: 4.8,
    chef: 'Charcoal Grill',
    kitchen: 'Smoke-free indoor dining hall',
    description:
      'Marinated in calamansi, tanglad, and ginger, flame-grilled and basted with vibrant annatto oil on fresh banana leaf.',
    likes: 289,
    ingredients: [
      'Chicken Leg Quarter',
      'Annatto Oil',
      'Calamansi',
      'Tanglad',
      'Garlic Rice',
      'Banana Leaf',
    ],
    accent: '#E8CA8C',
  },
  {
    title: 'Sizzling',
    subtitle: 'Bulalo',
    image: '/images/dish-specials.jpg',
    eyebrow: '#3 Cast-iron Tagaytay warmer',
    label: 'Sizzling Bulalo',
    rating: 4.8,
    chef: 'Steak Skillet',
    kitchen: 'Served piping hot at the table',
    description:
      'Fork-tender braised beef shank seared on a cast-iron skillet with rich cracked-pepper mushroom gravy and marrow.',
    likes: 267,
    ingredients: [
      'Beef Shank',
      'Bone Marrow',
      'Mushroom Gravy',
      'Cracked Pepper',
      'Caramelized Onion',
    ],
    accent: '#A8C9B5',
  },
  {
    title: 'Crispy',
    subtitle: 'Pata',
    image: '/images/dish-specials.jpg',
    eyebrow: '#4 Family sharing centerpiece',
    label: 'Crispy Pata',
    rating: 4.9,
    chef: 'Family Feast',
    kitchen: '6–8 Seater Family Tables',
    description:
      'Golden-crackling braised pork knuckle fried until the skin shatters cleanly, served with spiced soy-vinegar dip.',
    likes: 254,
    ingredients: [
      'Whole Pork Knuckle',
      'Bay Leaves',
      'Peppercorns',
      'Soy-Vinegar Dip',
      'Atchara',
    ],
    accent: '#B5CEBE',
  },
  {
    title: 'Pork Adobo',
    subtitle: 'Pizza',
    image: '/images/dish-pasta-pizza.jpg',
    eyebrow: '#5 Filipino fusion favorite · 10-inch',
    label: 'Adobo Pizza',
    rating: 4.7,
    chef: 'Artisan Oven',
    kitchen: '8 Slices · Great for Sharing',
    description:
      'Where a Filipino classic meets crisp hand-stretched crust — tender garlic-soy pork adobo flakes and molten mozzarella.',
    likes: 198,
    ingredients: [
      'Pork Adobo Flakes',
      'Mozzarella',
      'Artisan Crust',
      'Caramelized Onion',
      'Chili Garlic Oil',
    ],
    accent: '#DFBE88',
  },
];

type SignatureOrbitSectionProps = {
  onSelectMenuDish?: (dish: (typeof MENU_ITEMS)[number]) => void;
};

export function SignatureOrbitSection({
  onSelectMenuDish,
}: SignatureOrbitSectionProps) {
  const [storyIndex, setStoryIndex] = useState<number | null>(null);

  const handleOrder = (_dish: Dish, index: number) => {
    const meta = SPOTLIGHT_META[index];
    const matched = meta
      ? MENU_ITEMS.find((item) => item.id === meta.menuId)
      : undefined;
    if (matched && onSelectMenuDish) {
      onSelectMenuDish(matched);
    }
  };

  const handlePlay = (_dish: Dish, index: number) => {
    setStoryIndex(index);
  };

  const activeStoryDish = storyIndex !== null ? PIYO_ORBIT_DISHES[storyIndex] : null;
  const activeStoryMeta = storyIndex !== null ? SPOTLIGHT_META[storyIndex] : null;
  const activeMenuDish = activeStoryMeta
    ? MENU_ITEMS.find((item) => item.id === activeStoryMeta.menuId)
    : undefined;

  return (
    <section
      id="spotlight"
      aria-label="Signature Dish Orbit Showcase"
      className="border-b border-[#143D28]/12 bg-[#F5EFE2]"
    >
      <DishOrbitCarousel
        dishes={PIYO_ORBIT_DISHES}
        height="var(--piyo-orbit-h, calc(100svh - 65px))"
        backdrop="/images/hero-facade.jpg"
        loop={false}
        onOrder={handleOrder}
        onPlay={handlePlay}
        className="piyo-orbit"
      />

      {/* Kitchen Story Modal triggered by "Play video" / Spotlight preview */}
      {activeStoryDish && activeStoryMeta && (
        <div
          className="fixed inset-0 z-50 flex items-end justify-center bg-[#0C2618]/75 backdrop-blur-sm sm:items-center sm:p-4"
          onClick={() => setStoryIndex(null)}
          role="dialog"
          aria-modal="true"
          aria-label={`${activeStoryDish.title} ${activeStoryDish.subtitle} kitchen spotlight`}
        >
          <div
            className="w-full max-w-lg overflow-hidden rounded-t-3xl bg-[#FAF6EC] text-[#1D231E] shadow-2xl sm:rounded-3xl pb-safe"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="relative h-48 bg-[#143D28] sm:h-56">
              <img
                src={activeStoryDish.image}
                alt={`${activeStoryDish.title} ${activeStoryDish.subtitle}`}
                className="h-full w-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0C2618]/90 via-[#0C2618]/25 to-transparent" />
              <button
                type="button"
                onClick={() => setStoryIndex(null)}
                className="absolute right-3.5 top-3.5 flex h-9 w-9 items-center justify-center rounded-full bg-[#0C2618]/80 text-[#FAF6EC] hover:bg-[#143D28]"
                aria-label="Close kitchen spotlight"
              >
                <X className="h-5 w-5" />
              </button>
              <div className="absolute bottom-4 left-5 right-5">
                <span className="inline-flex items-center gap-1 rounded-full bg-[#D8B36A] px-2.5 py-0.5 text-[11px] font-bold text-[#0C2618]">
                  <Flame className="h-3 w-3" />
                  From the PIYO Kitchen
                </span>
                <h3 className="mt-1.5 font-serif text-2xl font-semibold text-[#FAF6EC] sm:text-3xl">
                  {activeStoryDish.title} {activeStoryDish.subtitle}
                </h3>
              </div>
            </div>

            <div className="space-y-4 p-5">
              <div>
                <h4 className="font-serif text-xl font-semibold text-[#143D28]">
                  {activeStoryMeta.storyTitle}
                </h4>
                <ol className="mt-2.5 space-y-2 text-sm text-[#344037]">
                  {activeStoryMeta.prepSteps.map((step, i) => (
                    <li key={step} className="flex items-start gap-2.5">
                      <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-[#143D28] text-[11px] font-bold text-[#D8B36A]">
                        {i + 1}
                      </span>
                      <span>{step}</span>
                    </li>
                  ))}
                </ol>
              </div>

              <div className="flex items-center justify-between rounded-2xl bg-[#E5EDE7]/80 px-4 py-3 text-xs">
                <span className="flex items-center gap-1.5 font-semibold text-[#143D28]">
                  <Sparkles className="h-4 w-4 text-[#C29645]" />
                  Best paired with: {activeStoryMeta.pairWith}
                </span>
                <span className="hidden items-center gap-1 text-[#255E40] sm:inline-flex">
                  <MapPin className="h-3.5 w-3.5" />
                  Km. 64 Tagaytay
                </span>
              </div>

              <div className="flex items-center gap-2.5 pt-1">
                <button
                  type="button"
                  onClick={() => setStoryIndex(null)}
                  className="rounded-full border border-[#143D28]/25 px-4 py-2.5 text-xs font-bold text-[#143D28] hover:bg-[#E5EDE7]"
                >
                  Close
                </button>
                {activeMenuDish && onSelectMenuDish && (
                  <button
                    type="button"
                    onClick={() => {
                      setStoryIndex(null);
                      onSelectMenuDish(activeMenuDish);
                    }}
                    className="flex flex-1 items-center justify-center gap-2 rounded-full bg-[#143D28] px-5 py-2.5 text-xs font-bold text-[#FAF6EC] shadow-sm hover:bg-[#1B4E33]"
                  >
                    <UtensilsCrossed className="h-4 w-4 text-[#D8B36A]" />
                    <span>
                      Customize &amp; Order · {formatPeso(activeMenuDish.price)}
                    </span>
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
