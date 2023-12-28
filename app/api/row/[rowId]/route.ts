import { db } from "@/db";
import { Row } from "@prisma/client";
import { NextResponse } from "next/server";

export const POST = async (req: Request, res: Response) => {
  const url = req.url.split("/");
  const rowId = url[url.length - 1];

  const payload: Row = await req.json();

  try {
    const updatedRow = await db.row.update({
      data: {
        ...payload,
      },
      where: {
        id: rowId,
      },
    });

    return NextResponse.json({ updatedRow });
  } catch (err) {
    return new Response("Something went wrong.", { status: 500 });
  }
};

export const DELETE = async (req: Request, res: Response) => {
  const url = req.url.split("/");
  const rowId = url[url.length - 1];

  try {
    const deletedRow = await db.row.delete({
      where: {
        id: rowId,
      },
    });

    return NextResponse.json({ deletedRow });
  } catch (err) {
    return new Response("Something went wrong.", { status: 500 });
  }
};
