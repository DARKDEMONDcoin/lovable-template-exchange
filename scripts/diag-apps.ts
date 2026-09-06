import { pipedreamConfig } from "@/lib/pipedream.server";
const WS="434b263e-2aa0-4fc6-9759-7cc2675d40e0";
const c=(await pipedreamConfig())!;
const t=(await (await fetch("https://api.pipedream.com/v1/oauth/token",{method:"POST",headers:{"content-type":"application/json"},body:JSON.stringify({grant_type:"client_credentials",client_id:c.clientId,client_secret:c.clientSecret})})).json()) as any;
const r=await fetch(`https://api.pipedream.com/v1/connect/${c.projectId}/accounts?external_user_id=ws_${WS}`,{headers:{Authorization:`Bearer ${t.access_token}`,"x-pd-environment":c.environment}});
const j=await r.json() as any;
console.log(j.data.map((a:any)=>({id:a.id,app:a.app?.name_slug,created:a.created_at,healthy:a.healthy})));
process.exit(0);
