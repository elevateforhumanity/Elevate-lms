import fs from "fs";
import https from "https";

const domain = "https://elevateforhumanity.org";

const routes = JSON.parse(fs.readFileSync("routes.json", "utf8"));

function fetchStatus(url) {
  return new Promise((resolve) => {
    https
      .get(url, { headers: { 'User-Agent': 'Mozilla/5.0' } }, (res) => {
        const status = res.statusCode || 0;
        resolve({ url, status });
      })
      .on("error", () => resolve({ url, status: 0 }));
  });
}

(async () => {
  const results = [];

  for (const route of routes) {
    // Skip admin, internal, and auth-required routes
    if (route.startsWith("/admin")) continue;
    if (route.startsWith("/instructor")) continue;
    if (route.startsWith("/student")) continue;
    if (route.startsWith("/program-holder")) continue;
    if (route.includes("[") || route.includes("]")) continue;

    const url = domain + (route === "/" ? "" : route);
    const res = await fetchStatus(url);
    results.push(res);
    
    const emoji = res.status === 200 ? "✅" : res.status === 404 ? "❌" : "⚠️";
    console.log(`${emoji} ${res.status} ${url}`);
    
    // Rate limit
    await new Promise(r => setTimeout(r, 100));
  }

  const missing = results.filter((r) => r.status === 404 || r.status === 0);
  const working = results.filter((r) => r.status === 200);
  
  fs.writeFileSync("routes-check.json", JSON.stringify(results, null, 2));
  fs.writeFileSync("routes-missing.json", JSON.stringify(missing, null, 2));
  fs.writeFileSync("routes-working.json", JSON.stringify(working, null, 2));

  console.log("\n=== SUMMARY ===");
  console.log(`Total routes checked: ${results.length}`);
  console.log(`✅ Working (200): ${working.length}`);
  console.log(`❌ Missing (404): ${missing.length}`);
  console.log(`⚠️  Other errors: ${results.filter(r => r.status !== 200 && r.status !== 404).length}`);
  
  if (missing.length > 0) {
    console.log("\n=== MISSING ROUTES ===");
    missing.forEach(r => console.log(`  ${r.url}`));
  }
})();
