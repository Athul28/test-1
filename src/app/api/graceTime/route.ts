import { prisma } from "@/lib/prisma";

export async function GET() {
  console.log("In server");
  const graceTime = await prisma.graceTime.findMany();
  return new Response(JSON.stringify(graceTime));
}

export async function POST(request: Request) {
  const data = await request.json();
  const newGraceTime = await prisma.graceTime.create({
    data: {
      time: data.time,
    },
  });
  return new Response(JSON.stringify(newGraceTime), { status: 201 });
}
