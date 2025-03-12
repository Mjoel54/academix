import { connect } from "mongoose";
import { MongoClient } from "mongodb";
// import { userInfo } from "os";
require("dotenv").config();

export const client = new MongoClient(process.env.MONGO_URI!);
export const db = client.db("academix-ts-api");

const connectToMongoDb = async (): Promise<object> => {
  try {
    await connect(process.env.MONGO_URI!);

    return { status: 200, msg: "OK - Connected" };
  } catch (err) {
    console.error(err);
    return { status: 400, msg: "Bad Request - Could Not Connect" };
  }
};

export default connectToMongoDb;
