import { PRODUCTS, SITE_CONFIG } from "@/lib/data";

export type ChatbotReply = {
  reply: string;
  suggestions: string[];
};

const defaultSuggestions = [
  "What plans do you offer?",
  "How do I get my download after purchase?",
  "How can I contact Ruchika?",
];

function normalize(text: string) {
  return text.toLowerCase().replace(/[^\w\s]/g, " ").replace(/\s+/g, " ").trim();
}

function includesAny(message: string, keywords: string[]) {
  return keywords.some((keyword) => message.includes(keyword));
}

function productPriceList() {
  return PRODUCTS.map((product) => `${product.title}: INR ${product.price}`).join("; ");
}

export function getChatbotReply(rawMessage: string): ChatbotReply {
  const message = normalize(rawMessage);

  if (!message) {
    return {
      reply:
        "Ask me about products, pricing, consultations, payments, downloads, or how to contact Ruchika.",
      suggestions: defaultSuggestions,
    };
  }

  if (includesAny(message, ["hi", "hello", "hey", "hii"])) {
    return {
      reply:
        "Hello! I can help with digital products, consultations, payments, downloads, and contact details for Nourished with Ruchika Chawla.",
      suggestions: defaultSuggestions,
    };
  }

  if (
    includesAny(message, [
      "price",
      "cost",
      "how much",
      "pricing",
      "fee",
    ])
  ) {
    return {
      reply: `Current digital product pricing is: ${productPriceList()}.`,
      suggestions: [
        "Which plan is best for PCOS?",
        "How do downloads work?",
        "How can I book a consultation?",
      ],
    };
  }

  if (includesAny(message, ["pcos", "hormone", "hormonal", "thyroid"])) {
    return {
      reply:
        "For PCOS and hormonal support, the PCOS Nutrition Guide is the most relevant digital product. It focuses on insulin management, cycle-friendly nutrition, and practical meal strategies.",
      suggestions: [
        "How much is the PCOS guide?",
        "Do you have meal plans too?",
        "How do I purchase it?",
      ],
    };
  }

  if (includesAny(message, ["gut", "bloating", "digestion", "ibs", "acidity"])) {
    return {
      reply:
        "For gut-related questions, the Gut Health Masterclass eBook is the best fit. It is built around digestion, gut healing, microbiome support, and symptom-friendly food choices.",
      suggestions: [
        "How much is the gut health ebook?",
        "What other products do you have?",
        "How do downloads work?",
      ],
    };
  }

  if (includesAny(message, ["family", "kids", "child", "children", "tiffin"])) {
    return {
      reply:
        "The Family Nutrition Toolkit is the strongest match for family meals, lunchbox ideas, picky eaters, and healthier food routines at home.",
      suggestions: [
        "How much is the family toolkit?",
        "What plans do you offer?",
        "Can I download it instantly?",
      ],
    };
  }

  if (
    includesAny(message, ["meal plan", "weight loss", "reset", "weight gain"])
  ) {
    return {
      reply:
        "The 28-Day Reset Meal Plan is the best option for structured meal planning, weight goals, and practical Indian food guidance with a clear plan to follow.",
      suggestions: [
        "What is included in the reset plan?",
        "How much does it cost?",
        "How do I buy it?",
      ],
    };
  }

  if (
    includesAny(message, ["products", "plans", "ebooks", "what do you offer"])
  ) {
    return {
      reply:
        "The website currently offers four digital products: The 28-Day Reset Meal Plan, PCOS Nutrition Guide, Gut Health Masterclass eBook, and Family Nutrition Toolkit.",
      suggestions: [
        "Show me pricing",
        "Which plan is best for gut health?",
        "Which plan is best for PCOS?",
      ],
    };
  }

  if (
    includesAny(message, ["download", "access", "unlock", "purchase", "bought"])
  ) {
    return {
      reply:
        "After payment, your purchased files can be accessed from the My Products area. Download links are protected and time-limited for security.",
      suggestions: [
        "How do I log in?",
        "What products do you offer?",
        "What payment methods are used?",
      ],
    };
  }

  if (
    includesAny(message, ["payment", "pay", "upi", "card", "razorpay", "checkout"])
  ) {
    return {
      reply:
        "Payments on the website are handled securely through Razorpay during checkout for digital products.",
      suggestions: [
        "How do downloads work?",
        "What products do you offer?",
        "How can I contact Ruchika?",
      ],
    };
  }

  if (includesAny(message, ["consult", "consultation", "call", "book"])) {
    return {
      reply:
        "You can use the Book Call or consultation action in the header to learn more about working directly with Ruchika.",
      suggestions: [
        "How can I contact Ruchika?",
        "What plans do you offer?",
        "Show me pricing",
      ],
    };
  }

  if (
    includesAny(message, ["contact", "whatsapp", "email", "instagram", "reach"])
  ) {
    return {
      reply: `You can reach the brand at ${SITE_CONFIG.email}, on WhatsApp at ${SITE_CONFIG.whatsapp}, or through Instagram at ${SITE_CONFIG.instagram}.`,
      suggestions: [
        "How can I book a consultation?",
        "What products do you offer?",
        "How do downloads work?",
      ],
    };
  }

  return {
    reply:
      "I can help with product recommendations, pricing, downloads, consultations, payments, and contact details. Try asking me something more specific.",
    suggestions: defaultSuggestions,
  };
}
