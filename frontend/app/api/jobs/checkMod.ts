import checkCache from "@/database";

export default async function check(req:Request, res:Response) {
    await checkCache();
    return new Response(
        JSON.stringify({ok:true}),
        {status:200, headers:{"Content-Type":"application/json"}}
    );
};