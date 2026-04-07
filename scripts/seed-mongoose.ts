import mongoose, { Schema, model, models } from "mongoose";

import { BLOG_POSTS, PRODUCTS, REVIEWS } from "@/lib/data";

type ProductDoc = {
  id: string;
  title: string;
  description: string;
  longDescription: string;
  price: number;
  originalPrice?: number;
  image: string;
  category: string;
  features: string[];
  badge?: string;
  slug: string;
  storagePath: string;
};

type BlogDoc = {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  image: string;
  category: string;
  date: string;
  readTime: string;
  slug: string;
  author: string;
};

type ReviewDoc = {
  id: string;
  name: string;
  avatar: string;
  rating: number;
  text: string;
  program: string;
  date: string;
};

const productSchema = new Schema<ProductDoc>(
  {
    id: { type: String, required: true, unique: true },
    title: { type: String, required: true },
    description: { type: String, required: true },
    longDescription: { type: String, required: true },
    price: { type: Number, required: true },
    originalPrice: { type: Number },
    image: { type: String, required: true },
    category: { type: String, required: true },
    features: [{ type: String, required: true }],
    badge: { type: String },
    slug: { type: String, required: true, unique: true },
    storagePath: { type: String, required: true },
  },
  { timestamps: true }
);

const blogSchema = new Schema<BlogDoc>(
  {
    id: { type: String, required: true, unique: true },
    title: { type: String, required: true },
    excerpt: { type: String, required: true },
    content: { type: String, required: true },
    image: { type: String, required: true },
    category: { type: String, required: true },
    date: { type: String, required: true },
    readTime: { type: String, required: true },
    slug: { type: String, required: true, unique: true },
    author: { type: String, required: true },
  },
  { timestamps: true }
);

const reviewSchema = new Schema<ReviewDoc>(
  {
    id: { type: String, required: true, unique: true },
    name: { type: String, required: true },
    avatar: { type: String, required: true },
    rating: { type: Number, required: true },
    text: { type: String, required: true },
    program: { type: String, required: true },
    date: { type: String, required: true },
  },
  { timestamps: true }
);

const ProductModel = models.Product || model<ProductDoc>("Product", productSchema);
const BlogModel = models.Blog || model<BlogDoc>("Blog", blogSchema);
const ReviewModel = models.Review || model<ReviewDoc>("Review", reviewSchema);

async function seed() {
  const uri = process.env.MONGODB_URI || "mongodb://localhost:27017";
  const dbName = process.env.MONGODB_DB_NAME || "nourished_with_ruchika";

  await mongoose.connect(uri, { dbName });

  for (const product of PRODUCTS) {
    await ProductModel.updateOne({ id: product.id }, { $set: product }, { upsert: true });
  }

  for (const post of BLOG_POSTS) {
    await BlogModel.updateOne({ id: post.id }, { $set: post }, { upsert: true });
  }

  for (const review of REVIEWS) {
    const payload: ReviewDoc = {
      id: review.id,
      name: review.name,
      avatar: review.avatar,
      rating: review.rating,
      text: review.text,
      program: review.program,
      date: review.date,
    };

    await ReviewModel.updateOne({ id: review.id }, { $set: payload }, { upsert: true });
  }

  const [productCount, blogCount, reviewCount] = await Promise.all([
    ProductModel.countDocuments(),
    BlogModel.countDocuments(),
    ReviewModel.countDocuments(),
  ]);

  console.log(`Seed complete. products=${productCount}, blogs=${blogCount}, reviews=${reviewCount}`);

  await mongoose.disconnect();
}

seed().catch(async (error) => {
  console.error("Seed failed:", error instanceof Error ? error.message : error);
  await mongoose.disconnect();
  process.exit(1);
});
