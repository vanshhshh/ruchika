import clientPromise from "@/lib/mongodb";

export async function getDatabase() {
  const client = await clientPromise;
  const dbName = process.env.MONGODB_DB_NAME ?? "nourished_with_ruchika";
  return client.db(dbName);
}
