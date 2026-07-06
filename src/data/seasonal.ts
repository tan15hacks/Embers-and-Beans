export type SeasonalDrink = {
  name: string;
  notes: string;
  price: string;
  tag: string;
  image: string;
  imageAlt: string;
};

export const seasonalDrinks: SeasonalDrink[] = [
  {
    name: "Autumn Maple Latte",
    notes: "Maple · Espresso · Cinnamon",
    price: "₱190",
    tag: "Seasonal",
    image: "/images/drinks/autumn-maple-latte.jpg",
    imageAlt: "Autumn maple latte with warm maple accents on a walnut café table",
  },
  {
    name: "Velvet Mocha",
    notes: "Dark cocoa · Cream · Sea salt",
    price: "₱185",
    tag: "Rich",
    image: "/images/drinks/velvet-mocha.jpg",
    imageAlt: "Velvet mocha with chocolate accents in warm café light",
  },
  {
    name: "Golden Chai Cold Foam",
    notes: "Chai · Vanilla · Oat milk",
    price: "₱175",
    tag: "Spiced",
    image: "/images/drinks/golden-chai-cold-foam.jpg",
    imageAlt: "Golden chai drink with spices on a warm walnut café table",
  },
];
