import { loadS3IntoPinecone } from "@/lib/pinecone";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: Request, res: Response) {
  try {
    const body = await req.json();
    const { file_key, file_name } = body;
    console.log(file_key);
    console.log(file_name);
    await loadS3IntoPinecone(file_key);
    return NextResponse.json({ message: "Success" }, { status: 200 });
  } catch (error) {
    console.log(error);
    return NextResponse.json({ error: "Internal server error" });
  }
}
