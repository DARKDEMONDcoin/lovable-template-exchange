import { pipedreamConfig, createConnectToken } from "@/lib/pipedream.server";
const WS = "434b263e-2aa0-4fc6-9759-7cc2675d40e0";
const config = (await pipedreamConfig())!;
const t = await createConnectToken(config, WS, ["http://localhost:8080"], {
  success: "http://localhost:8080/app/integrations?pd=connected",
  error: "http://localhost:8080/app/integrations?pd=failed",
});
const u = new URL(t.connect_link_url!);
u.searchParams.set("app", "facebook_pages");
u.searchParams.set("oauthScopeProfile", "admin");
console.log(u.toString());
process.exit(0);
