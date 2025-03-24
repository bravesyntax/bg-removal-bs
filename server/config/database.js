import mongoose from "mongoose";

const dbConnect = async () => {
  mongoose.connection.on("connected", () => {
    console.log("Database connected..");
  });

  await mongoose.connect(`${process.env.DATABASE_URL}/bgRemovalUsers`);
};

export default dbConnect; // ✅ Use default export
