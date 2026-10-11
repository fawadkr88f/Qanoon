import type { DietaryPlan, MealSlot } from '@/types/qma';

/**
 * Sheets "3_Dietary Charts (Ghaza 1-6)" and "4_Weekly Meal Plans".
 * Ghaza No. N carries the temperament of Order N and counter-balances
 * the morbid order located three hops away.
 */

export const FOOD_GROUP_LABELS = {
  grains: 'Grains, cereals & flours',
  vegetables: 'Vegetables & greens',
  proteins: 'Animal proteins & dairy',
  fruits: 'Fruits & raw produce',
  spices: 'Spices, seasonings & cooking oils',
  infusions: 'Herbal infusions & teas',
} as const;

export const MEAL_SLOT_LABELS: Readonly<Record<MealSlot, string>> = {
  breakfast: 'Breakfast',
  morningSnack: 'Morning snack & drink',
  lunch: 'Lunch',
  eveningSnack: 'Evening snack',
  dinner: 'Dinner',
  bedtime: 'Bedtime infusion',
};

export const MEAL_SLOTS: readonly MealSlot[] = [
  'breakfast',
  'morningSnack',
  'lunch',
  'eveningSnack',
  'dinner',
  'bedtime',
];

export const DIETARY_PLANS: readonly DietaryPlan[] = [
  {
    ghazaNo: 1,
    temperament: { en: 'Cold & Moist', ur: 'تر سرد' },
    curesOrder: 4,
    foodGroups: {
      grains: ['Barley (Jau)', 'Basmati rice', 'Sago (Sabudana)', 'Mung bean'],
      vegetables: ['Bottle gourd (Kaddu/Lauki)', 'Zucchini (Tori)', 'Turnip', 'Cucumber'],
      proteins: ['Goat milk', 'Cow milk', 'Fresh curd', 'Boiled egg whites (avoid yolks)'],
      fruits: ['Watermelon', 'Sweet melon', 'Pears', 'Sugarcane juice', 'Green coconut water'],
      spices: ['Coriander seeds (Dhania)', 'Fennel (Saunf)', 'Olive oil', 'Cold-pressed coconut oil'],
      infusions: ['Coriander + fennel seed tea (cooled to room temperature)', 'Coconut water'],
    },
    mealPlan: {
      breakfast: 'Barley porridge (Talbina) in cow milk with unrefined cane sugar; 2 boiled egg whites',
      morningSnack: 'Fresh green coconut water or chilled cucumber slices',
      lunch: 'Stewed bottle gourd (Lauki) in olive oil with fresh coriander; 2 soft barley rotis',
      eveningSnack: 'Fresh watermelon slices or sweet melon cubes',
      dinner: 'Mung bean soup with steamed zucchini and white basmati rice',
      bedtime: 'Bruised coriander seeds (1 tsp) + fennel seeds (½ tsp) infused in lukewarm water',
    },
  },
  {
    ghazaNo: 2,
    temperament: { en: 'Dry & Cold', ur: 'خشک سرد' },
    curesOrder: 5,
    foodGroups: {
      grains: ['Chickpea flour (Besan)', 'Roasted chickpeas (Bhuna Chana)', 'Black gram'],
      vegetables: ['Potatoes', 'Tomatoes', 'Eggplant (Baingan)', 'Cabbage', 'Cauliflower'],
      proteins: ['Lean beef', 'Lean veal', 'Salted fish', 'Sour curd / sour buttermilk (Lassi)'],
      fruits: ['Sour apples', 'Sour pomegranate (Khatta Anaar)', 'Grapefruit', 'Oranges', 'Jamun'],
      spices: ['Apple cider vinegar', 'Pickles', 'Tamarind (Imli)', 'Lemon', 'Mustard oil'],
      infusions: ['Unsweetened black tea with fresh lemon juice', 'Tamarind water'],
    },
    mealPlan: {
      breakfast: 'Chickpea flour savoury pancake (Besan Chilla) with chopped onions & cumin in mustard oil',
      morningSnack: '1 cup black tea with fresh lemon juice (no milk, unsweetened)',
      lunch: 'Sour potato-chickpea chaat with lemon & cumin; lean veal cutlets pan-fried dry',
      eveningSnack: 'Sour green apple slices or sour pomegranate seeds',
      dinner: 'Stir-fried cabbage and cauliflower with mustard seed tempering; 2 missi rotis',
      bedtime: 'Light black tea with a dash of apple cider vinegar or a lemon slice',
    },
  },
  {
    ghazaNo: 3,
    temperament: { en: 'Dry & Hot', ur: 'خشک گرم' },
    curesOrder: 6,
    foodGroups: {
      grains: ['Red lentils (Masoor Dal)', 'Wheat bread', 'Roasted gram flour'],
      vegetables: ['Bitter gourd (Karela)', 'Fenugreek leaves (Methi)', 'Spinach', 'White radish'],
      proteins: ['Red mutton', 'Oxtail bone soup', 'Whole eggs (with yolks)', 'Pan-fried liver/heart'],
      fruits: ['Sour plums (Aloo Bukhara)', 'Dried figs (Injeer)', 'Dried black raisins', 'Walnuts'],
      spices: ['Cloves (Long)', 'Cinnamon (Darcheeni)', 'Black pepper', 'Mustard oil'],
      infusions: ['Long-Darcheeni Kahwa (2 cloves + 1 cinnamon stick boiled in water)'],
    },
    mealPlan: {
      breakfast: '2 whole eggs fried in mustard oil with coarse black pepper; 1 slice toasted wheat bread',
      morningSnack: 'Long-Darcheeni Kahwa: 2 cloves + 1 cinnamon stick boiled in water',
      lunch: 'Red mutton curry or oxtail soup with garlic & cinnamon; sautéed bitter gourd (Karela); wheat roti',
      eveningSnack: 'Dried black raisins (Munaqqa) and 4 roasted walnuts',
      dinner: 'Red lentil soup (Masoor dal) tempered with garlic and cloves; steamed radish; chapati',
      bedtime: 'Clove-cinnamon Kahwa with 1 dried fig (Injeer) chewed well',
    },
  },
  {
    ghazaNo: 4,
    temperament: { en: 'Hot & Dry', ur: 'گرم خشک' },
    curesOrder: 1,
    foodGroups: {
      grains: ['Pearl millet (Bajra)', 'Spelt', 'Sorghum (Jowar)', 'Pigeon peas (Toor Dal)'],
      vegetables: ['Mustard greens (Sarson ka Saag)', 'Radish tops', 'Fenugreek', 'Abundant garlic'],
      proteins: ['Lean mutton soup', 'Quail (Bater)', 'Partridge', 'Sautéed poultry/goat liver'],
      fruits: ['Semi-ripe papaya', 'Semi-ripe mango', 'Sweet pomegranate', 'Raw pistachios'],
      spices: ['Ginger (Zanjabeel)', 'Garlic (Lehsan)', 'Red/green chilli', 'Mustard seed oil'],
      infusions: ['Ginger-cinnamon-garlic Kahwa sweetened with raw jaggery'],
    },
    mealPlan: {
      breakfast: 'Pearl millet flatbread (Bajra roti) with crushed garlic chutney and cold-pressed mustard oil',
      morningSnack: 'Ginger-cinnamon Kahwa sweetened with raw jaggery (Gur)',
      lunch: 'Mustard greens (Sarson ka Saag) cooked with garlic & green chillies; sautéed chicken liver; bajra roti',
      eveningSnack: 'Small bowl of semi-ripe papaya cubes or raw pistachios',
      dinner: 'Pigeon pea soup (Toor dal) with split garlic tempering; lean mutton broth; whole wheat roti',
      bedtime: 'Fresh ginger slices + a pinch of mustard seeds boiled in water, served warm',
    },
  },
  {
    ghazaNo: 5,
    temperament: { en: 'Hot & Moist', ur: 'گرم تر' },
    curesOrder: 2,
    foodGroups: {
      grains: ['Whole wheat flatbread (Roti)', 'Split mung dal with skin', 'Brown rice'],
      vegetables: ['Sponge gourd (Ghia Tori)', 'Apple gourd (Tinda)', 'Carrots', 'Spinach with meat'],
      proteins: ['Young lamb / goat meat', 'Bone marrow broth', 'Poached eggs'],
      fruits: ['Ripe sweet mango', 'Ripe papaya', 'Sweet muskmelon', 'Sweet grapes', 'Sweet almonds'],
      spices: ['Fresh ginger', 'Cumin seeds (Zeera Safaid)', 'Turmeric', 'Pure Desi Ghee'],
      infusions: ['Fresh ginger infusion + ½ tsp crushed fennel + 1 tsp raw honey'],
    },
    mealPlan: {
      breakfast: 'Soft whole wheat roti spread with 1 tbsp melted pure Desi Ghee; 1 soft poached egg',
      morningSnack: 'Fresh ginger-honey tea or warm sweet almond drink (peeled crushed almonds in milk)',
      lunch: 'Young lamb bone marrow broth with sponge gourd (Ghia Tori) and cumin; 2 soft rotis',
      eveningSnack: 'Ripe sweet mango slices or sweet muskmelon; 5 soaked peeled almonds',
      dinner: 'Yellow split mung dal with spinach cooked in Desi Ghee; steamed brown rice or soft roti',
      bedtime: 'Fresh ginger tea with ½ tsp crushed fennel seeds and 1 tsp raw honey',
    },
  },
  {
    ghazaNo: 6,
    temperament: { en: 'Moist & Hot', ur: 'تر گرم' },
    curesOrder: 3,
    foodGroups: {
      grains: ['Fine wheat flour', 'Semolina (Sooji)', 'Sago pudding', 'Rice with milk (Kheer)'],
      vegetables: ['Yellow pumpkin (Halwa Kaddu)', 'White gourd', 'Taro root (Arvi)', 'Zucchini'],
      proteins: ['Fresh cow/goat milk', 'Clarified butter (Desi Ghee)', 'Fresh butter', 'Fresh cream'],
      fruits: ['Sweet bananas', 'Soft sweet dates (Khajoor)', 'Sweet fresh figs', 'Sweet mulberries'],
      spices: ['Green cardamom (Choti Elaichi)', 'Licorice root (Mulaithi)', 'Fennel', 'Sweet almond oil'],
      infusions: ['Cracked green cardamom + licorice root steeped in warm milk or water'],
    },
    mealPlan: {
      breakfast: 'Semolina (Sooji) halwa cooked in pure Desi Ghee and milk; or sweet banana mashed with fresh cream',
      morningSnack: 'Warm cow/goat milk infused with 2 cracked green cardamoms and crushed sweet almonds',
      lunch: 'Sweet yellow pumpkin (Halwa Kaddu) simmered in Desi Ghee & fennel gravy; soft fine wheat roti',
      eveningSnack: 'Soft sweet dates (Khajoor) or sweet ripe figs; a glass of sugarcane juice',
      dinner: 'Rice pudding (Kheer) with whole milk, sweet dates and saffron; soft zucchini stew',
      bedtime: '2 crushed green cardamoms + ½ tsp licorice root (Mulaithi) infused in warm milk',
    },
  },
];
