import mongoose, { Schema, Document, models } from "mongoose";

const gameReviewSchema = new Schema({
  gameId: { type: String, required: true },
  userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
  reviewText: { type: String, required: true },
  rating: { type: Number, required: true, min: 0, max: 10 },
  createdAt: { type: Date, default: Date.now },
  likes: [{ type: Schema.Types.ObjectId, ref: "User", unique: true }],
});


export interface IReview extends Document {
  gameId: string;        // ID اللعبة
  userId?: string;       // اختيارية لو فيه تسجيل دخول
  rating: number;        // التقييم (من 1 إلى 5)
  comment: string;       // نص المراجعة
  createdAt: Date;       // تاريخ الإضافة
}
const ReviewSchema: Schema = new Schema<IReview>({
  gameId: { type: String, required: true },
  userId: { type: String },
  rating: { type: Number, required: true, min: 1, max: 5 },
  comment: { type: String, required: true },
  createdAt: { type: Date, default: Date.now }
});

const Review = models.Review || mongoose.model<IReview>("Review", ReviewSchema);

const GameReview = mongoose.models.GameReview || mongoose.model("GameReview", gameReviewSchema);
export default GameReview;
// game review user
