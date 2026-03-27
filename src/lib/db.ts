import getMongoClientPromise from "@/lib/mongodb";

export async function getDatabase() {
  const client = await getMongoClientPromise();
  const dbName = process.env.MONGODB_DB_NAME ?? "nourished_with_ruchika";
  return client.db(dbName);
}
