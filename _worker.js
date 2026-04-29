const SB = "https://xyxjcbxmedkonyxafurf.supabase.co";
const KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inh5eGpjYnhtZWRrb255eGFmdXJmIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzU4MTc0NzksImV4cCI6MjA5MTM5MzQ3OX0.7EDny-taTst3q4_iJP7frMyacmlpuZmqwoBrE0gRsRM";

const CORS = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
  "Access-Control-Allow-Headers": "*",
  "Content-Type": "application/json",
};

export default {
  async fetch(request, env) {
    const url = new URL(request.url);

    // Handle CORS preflight
    if (request.method === "OPTIONS") {
      return new Response(null, { headers: CORS });
    }

    // Proxy /db endpoint — receives {action, table, filters?, data?, conflict?}
    if (url.pathname === "/db") {
      try {
        const { action, table, filters, data, conflict } = await request.json();
        let sbUrl = `${SB}/rest/v1/${table}`;
        const headers = {
          "apikey": KEY,
          "Authorization": `Bearer ${KEY}`,
          "Content-Type": "application/json",
        };
        let method = "GET";
        let body;

        if (action === "select") {
          const params = new URLSearchParams({ select: "*" });
          if (filters) {
            for (const [k, v] of Object.entries(filters)) {
              params.set(k, `eq.${v}`);
            }
          }
          sbUrl += "?" + params.toString();
        } else if (action === "upsert") {
          sbUrl += `?on_conflict=${conflict || "task_id"}`;
          method = "POST";
          headers["Prefer"] = "resolution=merge-duplicates,return=representation";
          body = JSON.stringify(data);
        }

        const res = await fetch(sbUrl, { method, headers, body });
        const json = await res.text();

        return new Response(
          JSON.stringify({ data: JSON.parse(json) }),
          { headers: { ...CORS } }
        );
      } catch (e) {
        return new Response(
          JSON.stringify({ error: String(e) }),
          { status: 500, headers: { ...CORS } }
        );
      }
    }

    // Serve static assets
    return env.ASSETS.fetch(request);
  },
};
