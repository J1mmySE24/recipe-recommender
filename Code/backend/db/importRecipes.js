// An init setup to add recipes to the database (from the csv file). Change count to modify the number of entires in the db
import fs from 'fs';
import csv from 'csv-parser';
import mongodb from "mongodb";
import path from 'path';
import { fileURLToPath } from 'url';
import dotenv from "dotenv";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
dotenv.config({ path: path.join(__dirname, '../.env') });

const MongoClient = mongodb.MongoClient;
const results = [];
let count = 0;

// Check if connection string exists
if (!process.env.RECIPES_DB_URI) {
    console.error("MongoDB connection string is not defined in .env file");
    process.exit(1);
}

// MongoDB connection URL and database/collection names
const url = process.env.RECIPES_DB_URI;
const client = new MongoClient(url);
const dbName = 'recipe_recommender';
const collectionName = 'recipe';

fs.createReadStream('./final_recipe_recommender.csv')
  .pipe(csv())
  .on('data', (data) => {
    if (count < 15) {
      results.push(data);
      count++;
    }
  })
  .on('end', async () => {
    try {
      await client.connect();
      const db = client.db(dbName);
      const collection = db.collection(collectionName);
      
      const result = await collection.insertMany(results);
      console.log(`${result.insertedCount} documents inserted`);
    } catch (err) {
      console.error('Error:', err);
    } finally {
      await client.close();
    }
  });