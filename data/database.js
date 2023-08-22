import mongoose from "mongoose";

export const connectDB = () => {
  mongoose
    .connect(process.env.MONGO_URI, {
      dbName: "Api",
    })
    .then(() => console.log("DB is connected"))
    .catch((e) => console.log(e));
};
