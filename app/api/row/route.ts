import { db } from "@/db";
import { Row } from "@prisma/client";
import { NextResponse } from "next/server";

export const GET = async (req: Request, res: Response) => {
  try {
    const rows = await db.row.findMany({
      orderBy: {
        createdAt: "asc",
      },
    });
    return NextResponse.json({ rows });
  } catch (err) {
    return new Response("Something went wrong", { status: 500 });
  }
};

export const POST = async (req: Request, res: Response) => {
  const payload: Row = await req.json();

  try {
    const newRow = await db.row.create({
      data: {
        ...payload
      }
    })  

    return NextResponse.json({ newRow })
  } catch (err) {
    return new Response("Something went wrong", { status: 500 });
  }
};
