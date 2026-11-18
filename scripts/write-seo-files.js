// Runs after `npm run build` (npm's "postbuild" hook).
// Writes build/sitemap.xml and build/robots.txt for the live address, so the
// site URL is set in one place: REACT_APP_SITE_URL (.env.production, or the
// hosting provider's environment variables, which take priority).
const fs = require("fs");
const path = require("path");

const root = path.join(__dirname, "..");
const build = path.join(root, "build");

const fromEnvFile = () => {
  const file = path.join(root, ".env.production");
  if (!fs.existsSync(file)) return undefined;
  const line = fs
    .readFileSync(file, "utf8")
    .split(/\r?\n/)
    .find((l) => l.startsWith("REACT_APP_SITE_URL="));
  return line && line.slice("REACT_APP_SITE_URL=".length).trim();
};

const site = (process.env.REACT_APP_SITE_URL || fromEnvFile() || "").replace(/\/+$/, "");
if (!site) {
  console.warn("write-seo-files: REACT_APP_SITE_URL is not set; skipping sitemap/robots.");
  process.exit(0);
}

// GitHub Pages builds live under a sub-path; Vercel builds live at the root.
const base = (process.env.PUBLIC_URL || "").replace(/\/+$/, "");
const today = new Date().toISOString().slice(0, 10);
const pages = [
  { loc: `${site}/`, priority: "1.0" },
  { loc: `${site}/Documents/Chowdhury-Nafis-Faiyaz-Resume.pdf`, priority: "0.6" },
];

const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${pages
  .map((p) => `  <url>\n    <loc>${p.loc}</loc>\n    <lastmod>${today}</lastmod>\n    <priority>${p.priority}</priority>\n  </url>`)
  .join("\n")}
</urlset>
`;

const robots = `# https://www.robotstxt.org/robotstxt.html
User-agent: *
Disallow:

Sitemap: ${site}/sitemap.xml
`;

fs.writeFileSync(path.join(build, "sitemap.xml"), sitemap);
fs.writeFileSync(path.join(build, "robots.txt"), robots);
console.log(`write-seo-files: sitemap.xml and robots.txt written for ${site}${base ? ` (built for ${base})` : ""}`);
