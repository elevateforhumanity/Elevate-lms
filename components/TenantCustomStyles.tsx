// components/TenantCustomStyles.tsx
import { sanitizeHtml } from '@/lib/sanitize';
import { getTenantFromHost } from "@/lib/multiTenant/tenantFromHost";
import { headers } from "next/headers";

export async function TenantCustomStyles() {
  const headersList = await headers();
  const host = headersList.get("host") ?? undefined;
  const tenant = await getTenantFromHost(host);

  if (!tenant) return null;

  return (
    <>
      {tenant.custom_css && (
        <style dangerouslySetInnerHTML={{ __html: sanitizeHtml(tenant.custom_css) }} />
      )}
      {tenant.primary_color && (
        <style
          dangerouslySetInnerHTML={{
            __html: `
              :root {
                --tenant-primary: ${tenant.primary_color};
                --tenant-secondary: ${tenant.secondary_color || "#0f172a"};
              }
            `,
          }}
        />
      )}
      {tenant.custom_favicon_url && (
        <link rel="icon" href={tenant.custom_favicon_url} />
      )}
    </>
  );
}
