# Sitemap & Robots Automation

These scripts keep the static SEO artifacts in sync with the routes declared in `ssg.config.js`.

## Commands

- `pnpm run sitemap:gen` – generates `public/sitemap.xml`.
- `pnpm run robots:gen` – regenerates `public/robots.txt` with the latest `SITE_URL` value.
- `pnpm run autopilot:fix` – runs both generators as part of the broader polish task list.

## Configuration

1. Update `SITE_URL`, `BRAND_NAME`, and contact details in your `.env` or Netlify/Cloudflare project settings.
2. Keep `ssg.config.js` authoritative for pre-render routes and metadata. Every entry is automatically added to the sitemap.
3. Any new route should include a `title`, `description`, and optional `image` so the sitemap is rich for crawlers.

## Outputs

- `public/sitemap.xml`
- `public/robots.txt`

Both files are regenerated on demand during CI and deployments to ensure crawlers stay in sync with the latest content surface.
