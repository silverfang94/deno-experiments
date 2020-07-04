import { init, MongoClient } from "https://deno.land/x/mongo@v0.8.0/mod.ts";



export const connectToDB = async () => {
  
  const URI: string = "mongodb://localhost:27017/?readPreference=primary&appname=MongoDB%20Compass%20Community&ssl=false";
  const dbName: string = "usersDb";
  const client = await new MongoClient();
  await client.connectWithUri(URI);
  // console.log(client)
  const db = client.database(dbName);
  const collection = db.collection("users");
  return collection;

};

