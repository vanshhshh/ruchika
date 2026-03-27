import { Product, BlogPost, Review, Service, NavItem } from "@/types";

export const NAV_ITEMS: NavItem[] = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  { label: "Blog", href: "/blog" },
  { label: "Reviews", href: "/reviews" },
  { label: "Digital Products", href: "/products" },
  { label: "My Products", href: "/my-products" },
];

export const SERVICES: Service[] = [
  {
    id: "1",
    title: "Personalized Meal Plans",
    description:
      "Custom nutrition plans tailored to your body type, health goals, and food preferences. No crash diets — just sustainable, delicious eating.",
    icon: "utensils",
    features: [
      "Macro-balanced recipes",
      "Weekly grocery lists",
      "Swap-friendly options",
      "Festival & travel guides",
    ],
  },
  {
    id: "2",
    title: "Weight Management",
    description:
      "Science-backed strategies for healthy weight loss or gain. We focus on metabolic health, not just the scale.",
    icon: "scale",
    features: [
      "Body composition analysis",
      "Metabolic rate optimization",
      "Behavioral coaching",
      "Progress tracking",
    ],
  },
  {
    id: "3",
    title: "PCOS & Hormonal Health",
    description:
      "Specialized nutrition protocols for PCOS, thyroid disorders, and hormonal imbalances. Food as medicine for hormonal harmony.",
    icon: "heart-pulse",
    features: [
      "Anti-inflammatory diet plans",
      "Supplement guidance",
      "Cycle-syncing nutrition",
      "Insulin management",
    ],
  },
  {
    id: "4",
    title: "Gut Health Restoration",
    description:
      "Heal your gut, heal your life. Targeted plans for IBS, bloating, acidity, and digestive wellness using prebiotics, probiotics, and whole foods.",
    icon: "leaf",
    features: [
      "Elimination diet protocols",
      "Microbiome support",
      "Fermented food guides",
      "Stress-gut connection",
    ],
  },
];

export const PRODUCTS: Product[] = [
  {
    id: "prod_1",
    title: "The 28-Day Reset Meal Plan",
    description:
      "A complete 4-week Indian meal plan designed to reset your metabolism, reduce inflammation, and build lasting healthy habits.",
    longDescription:
      "This comprehensive 28-day meal plan is your roadmap to a healthier you. Each week progressively introduces cleaner eating patterns with delicious Indian recipes your whole family will love. Includes breakfast, lunch, dinner, and 2 snacks per day with full macro breakdowns, grocery lists, and meal prep guides.",
    price: 999,
    originalPrice: 1499,
    image: "/images/product-meal-plan.jpg",
    category: "meal-plan",
    features: [
      "112 unique Indian recipes",
      "Complete macro breakdowns",
      "Weekly grocery lists",
      "Meal prep guides for busy professionals",
      "Vegetarian & non-veg options",
      "Festival season alternatives",
    ],
    badge: "Bestseller",
    slug: "28-day-reset-meal-plan",
    storagePath: "28-day-reset-meal-plan.pdf",
  },
  {
    id: "prod_2",
    title: "PCOS Nutrition Guide",
    description:
      "Evidence-based nutrition strategies specifically designed for women managing PCOS and hormonal imbalances.",
    longDescription:
      "Understanding PCOS nutrition doesn't have to be confusing. This guide breaks down the science into actionable steps — from managing insulin resistance with the right carbs to anti-inflammatory eating patterns. Includes 60+ recipes, supplement recommendations, and lifestyle tips.",
    price: 799,
    originalPrice: 1199,
    image: "/images/product-pcos.jpg",
    category: "guide",
    features: [
      "60+ PCOS-friendly recipes",
      "Insulin management strategies",
      "Supplement guide with dosages",
      "Cycle-syncing meal templates",
      "Exercise & nutrition pairing",
      "Stress management protocols",
    ],
    badge: "Popular",
    slug: "pcos-nutrition-guide",
    storagePath: "pcos-nutrition-guide.pdf",
  },
  {
    id: "prod_3",
    title: "Gut Health Masterclass eBook",
    description:
      "Everything you need to know about healing your gut — from understanding your microbiome to cooking gut-friendly meals.",
    longDescription:
      "Your gut is your second brain, and this eBook teaches you how to nourish it. Learn about the gut-brain axis, identify food sensitivities, and master fermentation at home. Complete with a 3-phase gut healing protocol, 45 recipes, and a symptom tracker.",
    price: 599,
    image: "/images/product-gut.jpg",
    category: "ebook",
    features: [
      "3-phase gut healing protocol",
      "45 gut-friendly recipes",
      "Home fermentation guide",
      "Food sensitivity identification",
      "Symptom tracking templates",
      "Probiotic & prebiotic guide",
    ],
    slug: "gut-health-masterclass",
    storagePath: "gut-health-masterclass.pdf",
  },
  {
    id: "prod_4",
    title: "Family Nutrition Toolkit",
    description:
      "Make healthy eating a family affair. Kid-friendly recipes, tiffin ideas, and strategies to get even the pickiest eaters on board.",
    longDescription:
      "Tired of cooking separate meals for kids and adults? This toolkit bridges the gap with 80+ family-friendly recipes that are nutritious AND delicious. Includes school tiffin planners, healthy snack alternatives to packaged foods, and strategies for handling picky eaters without mealtime battles.",
    price: 699,
    originalPrice: 999,
    image: "/images/product-family.jpg",
    category: "guide",
    features: [
      "80+ kid-approved recipes",
      "Monthly tiffin planners",
      "Healthy snack alternatives",
      "Picky eater strategies",
      "Birthday party menu ideas",
      "Nutrition milestones by age",
    ],
    slug: "family-nutrition-toolkit",
    storagePath: "family-nutrition-toolkit.pdf",
  },
];

export const BLOG_POSTS: BlogPost[] = [
  {
    id: "blog_1",
    title: "Why Your Morning Chai Could Be Sabotaging Your Weight Loss",
    excerpt:
      "That comforting cup of masala chai might be doing more harm than good. Here's how to enjoy it without derailing your health goals.",
    content:
      "Most weight gain around tea habits comes from sugar spikes and biscuit pairings, not chai itself. Start by reducing added sugar by one teaspoon every week, pair tea with protein-rich snacks, and avoid drinking it on an empty stomach. This keeps cravings stable and helps maintain energy through the day.",
    image: "/images/blog-chai.jpg",
    category: "Weight Loss",
    date: "2026-03-15",
    readTime: "5 min read",
    slug: "morning-chai-weight-loss",
    author: "Dt. Ruchika Chawla",
  },
  {
    id: "blog_2",
    title: "The Indian Superfood You're Probably Ignoring: Amaranth (Rajgira)",
    excerpt:
      "This ancient grain is a powerhouse of protein, iron, and calcium. Learn how to incorporate it into your daily diet beyond just fasting days.",
    content:
      "Amaranth supports satiety, gut health, and mineral intake while fitting naturally into Indian kitchens. You can use rajgira flour in rotis, add popped amaranth to curd bowls, or blend it into laddoos with nuts and seeds. It is a practical superfood when used consistently.",
    image: "/images/blog-amaranth.jpg",
    category: "Nutrition",
    date: "2026-03-08",
    readTime: "7 min read",
    slug: "amaranth-rajgira-superfood",
    author: "Dt. Ruchika Chawla",
  },
  {
    id: "blog_3",
    title: "PCOS and Dairy: Should You Really Give Up Paneer?",
    excerpt:
      "The dairy debate in PCOS nutrition is more nuanced than social media suggests. Here's what the science actually says.",
    content:
      "There is no universal rule to remove paneer in PCOS. The right approach is to assess digestion, acne triggers, and insulin markers. For many women, quality dairy in portion-controlled meals works well when paired with fiber, movement, and good sleep.",
    image: "/images/blog-pcos-dairy.jpg",
    category: "Lifestyle",
    date: "2026-02-28",
    readTime: "6 min read",
    slug: "pcos-dairy-paneer",
    author: "Dt. Ruchika Chawla",
  },
  {
    id: "blog_4",
    title: "5 Gut-Healing Foods You Already Have in Your Kitchen",
    excerpt:
      "Before you spend ₹3000 on fancy probiotics, check if you're using these traditional Indian ingredients that your dadi always knew about.",
    content:
      "Start with curd, kanji, homemade pickles, soaked methi, and cooked vegetables. Add one gut-friendly ingredient to every major meal for 21 days. This low-cost protocol improves digestion and reduces bloating better than random supplementation.",
    image: "/images/blog-gut-foods.jpg",
    category: "Nutrition",
    date: "2026-02-20",
    readTime: "4 min read",
    slug: "gut-healing-indian-foods",
    author: "Dt. Ruchika Chawla",
  },
  {
    id: "blog_5",
    title: "Meal Prep Sunday: A Working Professional's Guide to Eating Clean All Week",
    excerpt:
      "Spend 2 hours on Sunday to eat healthy meals all week. Complete Indian meal prep guide with storage tips and reheating instructions.",
    content:
      "Use a 2-2-2 strategy: two gravies, two protein bases, and two snack boxes for the week. Keep chapati dough and chopped salad components separate to preserve freshness. Meal prep is not about perfection, it is about reducing weekday decision fatigue.",
    image: "/images/blog-meal-prep.jpg",
    category: "Lifestyle",
    date: "2026-02-12",
    readTime: "8 min read",
    slug: "meal-prep-sunday-guide",
    author: "Dt. Ruchika Chawla",
  },
  {
    id: "blog_6",
    title: "Decoding Nutrition Labels: What Indian Brands Don't Want You to Know",
    excerpt:
      "That 'sugar-free' biscuit might have more calories than the regular one. Learn to read nutrition labels like a dietitian.",
    content:
      "Prioritize ingredient order, serving size, and hidden sugar names before checking the marketing claims. Aim for products with fewer ingredients and recognizable whole-food components. Label literacy prevents accidental overconsumption and improves long-term adherence.",
    image: "/images/blog-labels.jpg",
    category: "Weight Loss",
    date: "2026-02-05",
    readTime: "6 min read",
    slug: "decoding-nutrition-labels",
    author: "Dt. Ruchika Chawla",
  },
];

export const REVIEWS: Review[] = [
  {
    id: "rev_1",
    name: "Priya Sharma",
    avatar: "PS",
    rating: 5,
    text: "Ruchika di completely transformed my relationship with food. I lost 12 kgs in 4 months without giving up my rajma chawal! Her plans are so practical and Indian-food friendly. My whole family eats the same food now — no more separate 'diet food'.",
    program: "Weight Management Program",
    date: "2026-03-10",
  },
  {
    id: "rev_2",
    name: "Ananya Reddy",
    avatar: "AR",
    rating: 5,
    text: "After years of struggling with PCOS, irregular periods, and acne, Ruchika's approach was a game-changer. She didn't just give me a diet — she educated me about why my body was reacting the way it was. My cycles are regular now and my skin has never been clearer!",
    program: "PCOS Nutrition Program",
    date: "2026-02-25",
  },
  {
    id: "rev_3",
    name: "Kavita Mehta",
    avatar: "KM",
    rating: 5,
    text: "I was spending ₹5000/month on random supplements for my gut issues. Ruchika helped me identify my trigger foods and build a sustainable eating plan. My bloating is gone, and I've saved a fortune on unnecessary pills!",
    program: "Gut Health Program",
    date: "2026-02-18",
  },
  {
    id: "rev_4",
    name: "Rohit Bansal",
    avatar: "RB",
    rating: 5,
    text: "As a software developer who sits 12 hours a day, I thought there was no hope for my health. Ruchika designed a plan that works around my crazy schedule — even my late-night coding snacks are healthy now. Lost 8 kgs and my energy levels are through the roof.",
    program: "Weight Management Program",
    date: "2026-02-10",
  },
  {
    id: "rev_5",
    name: "Neha Kapoor",
    avatar: "NK",
    rating: 5,
    text: "The 28-Day Reset Meal Plan is worth every rupee. The recipes are simple, ingredients are easily available, and the results are incredible. I've been cooking from it for 3 months now and my family loves the food. Best investment in my health!",
    program: "28-Day Reset Meal Plan",
    date: "2026-01-30",
  },
  {
    id: "rev_6",
    name: "Deepika Jain",
    avatar: "DJ",
    rating: 5,
    text: "My 6-year-old was the pickiest eater ever. Thanks to the Family Nutrition Toolkit, I learned tricks to sneak nutrition into foods he actually enjoys. The tiffin ideas are a lifesaver — no more daily battles about what goes in his lunch box!",
    program: "Family Nutrition Toolkit",
    date: "2026-01-22",
  },
  {
    id: "rev_7",
    name: "Sanya Oberoi",
    avatar: "SO",
    rating: 5,
    text: "I followed so many Instagram nutritionists before Ruchika, but none of them understood Indian eating habits. She knows that we eat roti with our meals, that we have guests over for festivals, and that we can't just 'eat a salad'. Finally, a dietitian who gets us!",
    program: "Personalized Meal Plan",
    date: "2026-01-15",
  },
  {
    id: "rev_8",
    name: "Meera Iyer",
    avatar: "MI",
    rating: 5,
    text: "Post-pregnancy, I was desperate to lose weight but also breastfeeding. Ruchika was so careful and knowledgeable about what's safe for nursing mothers. I lost the baby weight in 5 months without compromising my milk supply. She's amazing!",
    program: "Post-Pregnancy Nutrition",
    date: "2026-01-08",
  },
];

export const STATS = [
  { value: "2000+", label: "Happy Clients" },
  { value: "8+", label: "Years Experience" },
  { value: "15+", label: "Diet Programs" },
  { value: "98%", label: "Client Satisfaction" },
];

export const SITE_CONFIG = {
  name: "Nourished with Ruchika Chawla",
  tagline: "Nourished. Balanced. Transformed.",
  description:
    "A refined approach to wellness with personalized nutrition designed for sustainable weight loss, effortless living, and lasting confidence.",
  email: "hello@nourishedwithruchika.com",
  phone: "+91 98765 43210",
  instagram: "https://instagram.com/nourishedwithruchika",
  youtube: "https://youtube.com/@nourishedwithruchika",
};
