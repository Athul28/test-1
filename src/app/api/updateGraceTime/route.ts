import { prisma } from "@/lib/prisma";

export async function POST(request:Request){
    const data = await request.json();
    const updateTime=await prisma.graceTime.update({
        where:{
            id:data.id
        },
        data:{
            time:data.time
        }
    })
    return new Response(JSON.stringify(updateTime),{status:200})
}