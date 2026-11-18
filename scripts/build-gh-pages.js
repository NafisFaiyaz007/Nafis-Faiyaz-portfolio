// Build for the old GitHub Pages address, which serves the site from a
// sub-path (/Nafis-Faiyaz-portfolio/) instead of the domain root that Vercel uses.
// Used only by `npm run deploy`; Vercel runs the normal `npm run build`.
const { execSync } = require("child_process");

execSync("npm run build", {
  stdio: "inherit",
  env: { ...process.env, PUBLIC_URL: "/Nafis-Faiyaz-portfolio" },
});
