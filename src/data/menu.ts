export type MenuItem = {
  name: string;
  description: string;
  price: string;
  image?: string;
  imageAlt?: string;
};

export type MenuSection = {
  eyebrow: string;
  title: string;
  description: string;
  items: MenuItem[];
};

export const featuredDrinks: MenuItem[] = [
  {
    name: "Honey Oat Latte",
    description: "Espresso, oat milk, wildflower honey, cinnamon.",
    price: "₱185",
    image: "/images/contacts/counter.png",
    imageAlt: "Honey oat latte served on a warm café counter",
  },
  {
    name: "Brown Sugar Cold Brew",
    description: "Slow-steeped cold brew with brown sugar cream.",
    price: "₱175",
    image: "/images/cafe/interior.png",
    imageAlt: "Cold coffee enjoyed inside a warm modern café interior",
  },
  {
    name: "Maple Ember Cappuccino",
    description: "Velvety espresso, maple, steamed milk, cocoa dust.",
    price: "₱180",
    image: "/images/hero/hero-cafe.png",
    imageAlt: "Cappuccino atmosphere inside Ember and Bean in morning light",
  },
];

export const classicBrews: MenuItem[] = [
  {
    name: "House Drip Coffee",
    description: "Daily rotating single-origin brew served smooth and balanced.",
    price: "₱120",
  },
  {
    name: "Café Latte",
    description: "Double espresso with silky steamed milk and a soft finish.",
    price: "₱155",
  },
  {
    name: "Spanish Latte",
    description: "Creamy espresso with condensed milk and a caramel-like sweetness.",
    price: "₱165",
  },
];

export const icedFavorites: MenuItem[] = [
  {
    name: "Iced Americano",
    description: "Bold espresso poured over chilled water and ice.",
    price: "₱130",
  },
  {
    name: "Vanilla Cream Cold Brew",
    description: "Cold brew finished with vanilla cream and a mellow sweetness.",
    price: "₱175",
  },
  {
    name: "Mocha Cloud",
    description: "Chocolate, espresso, milk, and a light cocoa cream top.",
    price: "₱180",
  },
];

export const pastries: MenuItem[] = [
  {
    name: "Almond Croissant",
    description: "Buttery laminated pastry with toasted almond cream.",
    price: "₱145",
    image: "/images/pastries/croissant.png",
    imageAlt: "Buttery almond croissant on a ceramic plate",
  },
  {
    name: "Cardamom Morning Bun",
    description: "Soft, spiced, and finished with a delicate sugar crust.",
    price: "₱135",
  },
  {
    name: "Sea Salt Chocolate Cookie",
    description: "Dark chocolate chunks, brown butter, and flaky sea salt.",
    price: "₱95",
  },
  {
    name: "Lemon Olive Oil Loaf",
    description: "Bright citrus loaf with a tender crumb and light glaze.",
    price: "₱120",
  },
];

export const menuSections: MenuSection[] = [
  {
    eyebrow: "House Favorites",
    title: "Signature Sips",
    description: "Coffee-forward drinks with the warm, slow-crafted Ember & Bean character.",
    items: featuredDrinks,
  },
  {
    eyebrow: "Daily Rituals",
    title: "Classic Brews",
    description: "Comforting espresso and brewed coffee staples for everyday visits.",
    items: classicBrews,
  },
  {
    eyebrow: "Chilled & Smooth",
    title: "Iced Favorites",
    description: "Refreshing cold coffee drinks made for warm afternoons and easy conversations.",
    items: icedFavorites,
  },
  {
    eyebrow: "Fresh From The Counter",
    title: "Pastries",
    description: "Simple, comforting bakes that pair beautifully with every cup.",
    items: pastries,
  },
];
