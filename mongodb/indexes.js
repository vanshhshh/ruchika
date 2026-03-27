/*
  Run once after connecting your MongoDB Compass cluster:
  mongosh "<your-connection-string>/<db-name>" mongodb/indexes.js
*/

db.users.createIndex({ email: 1 }, { unique: true });
db.purchases.createIndex({ userEmail: 1, productId: 1 }, { unique: true });
db.purchases.createIndex({ userEmail: 1, paymentStatus: 1, createdAt: -1 });

db.blogs.createIndex({ slug: 1 }, { unique: true });
db.reviews.createIndex({ createdAt: -1 });
