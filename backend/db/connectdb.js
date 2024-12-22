import mongoose from "mongoose";

export const connectDb = async function () {
  try {
    const conn = await mongoose.connect(process.env.MONGO_DB_CONNECTION);

    console.log(`connected to host : ${conn.connection.host}`);
  } catch (err) {
    console.log(err.message);
    process.exit(1);
  }
};
