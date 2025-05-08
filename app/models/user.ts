import mongoose, { Schema, Document, Model } from "mongoose";

interface IImage {
  secure_url: string;
  public_id: string;
}

export interface IUser extends Document {
  name: string;
  email: string;
  password: string;
  avatar: IImage;
  wishlist: string[];
  topTenList: string[];
  gamesRating: mongoose.Types.ObjectId[];
  bio: string;
  createdAt: Date;
}

const imageSchema = new Schema<IImage>({
  secure_url: { type: String, required: true },
  public_id: { type: String, required: true },
});

const userSchema = new Schema<IUser>(
  {
    name: { type: String, required: true },
    email: { type: String, unique: true, required: true },
    password: { type: String, select: false, required: true },
    avatar: { type: imageSchema, required: false },
    wishlist: [{ type: String }],
    topTenList: [{ type: String }],
    gamesRating: [{ type: Schema.Types.ObjectId, ref: "GameReview" }],
    bio: { type: String, maxlength: 500, default: "No bio" },
    createdAt: { type: Date, default: Date.now },
  },
  { timestamps: true }
);

// لتفادي إعادة تعريف الموديل في حالة إعادة تشغيل الخادم
const User: Model<IUser> = mongoose.models.User || mongoose.model<IUser>("User", userSchema);

export default User;


















// import mongoose, { Schema } from "mongoose";

// const imageSchema = new Schema({
//   secure_url: { type: String, required: true },
//   public_id: { type: String, required: true },
// });

// const userSchema = new Schema({
//   name: { type: String, required: true },
//   email: { type: String, unique: true, required: true },
//   password: { type: String, select: false, required: true },
//   avatar: imageSchema,
//   wishlist: [{ type: String }],
//   topTenList: [{ type: String, max: 10 }],
//   gamesRating: [{ type: Schema.Types.ObjectId, ref: "GameReview" }],
//   bio: { type: String, max: 500, default: "No bio" },
//   createdAt: { type: Date, default: Date.now },
// });

// const User = mongoose.models.User || mongoose.model("User", userSchema);
// export default User;
// // scehma 