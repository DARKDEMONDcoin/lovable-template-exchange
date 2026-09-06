import { pipedreamConfig } from "@/lib/pipedream.server";
const c = (await pipedreamConfig())!;
const tokRes = await fetch("https://api.pipedream.com/v1/oauth/token",{method:"POST",headers:{"content-type":"application/json"},body:JSON.stringify({grant_type:"client_credentials",client_id:c.clientId,client_secret:c.clientSecret})});
const { access_token } = await tokRes.json() as any;
for (const slug of ["facebook_pages","instagram_business"]) {
  const r = await fetch(`https://api.pipedream.com/v1/apps/${slug}`,{headers:{Authorization:`Bearer ${access_token}`}});
  const j = await r.json() as any;
  console.log(slug, r.status, JSON.stringify(j?.data?.scope_profiles ?? j, null, 1).slice(0,2000));
}
process.exit(0);
