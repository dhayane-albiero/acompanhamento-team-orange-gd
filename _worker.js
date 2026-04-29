const SB_URL = "https://xyxjcbxmedkonyxafurf.supabase.co";
const SB_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inh5eGpjYnhtZWRrb255eGFmdXJmIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzU4MTc0NzksImV4cCI6MjA5MTM5MzQ3OX0.7EDny-taTst3q4_iJP7frMyacmlpuZmqwoBrE0gRsRM";

export default {
  async fetch(request, env) {
    const url = new URL(request.url);

    // Proxy /api/* → Supabase
    if (url.pathname.startsWith("/api/")) {
      const sbPath = url.pathname.replace("/api", "") + url.search;
      const sbReq = new Request(SB_URL + sbPath, {
        method: request.method,
        headers: {
          "apikey": SB_KEY,
          "Authorization": "Bearer " + SB_KEY,
          "Content-Type": "application/json",
          "Prefer": request.headers.get("Prefer") || "",
        },
        body: request.method !== "GET" ? request.body : undefined,
      });
      const sbRes = await fetch(sbReq);
      const body = await sbRes.text();
      return new Response(body, {
        status: sbRes.status,
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
        },
      });
    }

    // OPTIONS preflight
    if (request.method === "OPTIONS") {
      return new Response(null, {
        headers: {
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Methods": "GET, POST, PATCH, DELETE, OPTIONS",
          "Access-Control-Allow-Headers": "Content-Type, Prefer, apikey, Authorization",
        },
      });
    }

    // Serve static files
    return env.ASSETS.fetch(request);
  },
};
