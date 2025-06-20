import { NextResponse } from "next/server";
import GameReview from "@/app/models/review";
import connect from "@/lib/connect"; // تأكد أنك عامل ملف اتصال MongoDB

export async function POST(req: Request) {
  await connect();
  
  try {
    const { gameId, rating, comment, userId } = await req.json();

    if (!gameId || !rating || !comment) {
      return NextResponse.json({ error: "Missing fields" }, { status: 400 });
    }

    const review = await GameReview.create({
      gameId,
      rating,
      comment,
      userId,
    });

    return NextResponse.json(review, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: "Error creating review" }, { status: 500 });
  }
}
