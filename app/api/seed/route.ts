import { db } from "@/db";
import { NextResponse } from "next/server";

export const GET = async (req: Request, res: Response) => {
  try {
    const arr = new Array(5).fill(5).map((_) =>
      db.row.create({
        data: {
          address: "temp",
          email: "shaanalam369@gmail.com",
          firstName: "Shaan",
          lastName: "Alam",
        },
      })
    );

    const rows = await Promise.all(arr);
    return NextResponse.json({ rows });
  } catch (err) {
    return new Response("Something went wrong", { status: 500 });
  }
};
