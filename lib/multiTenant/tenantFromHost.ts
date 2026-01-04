// lib/multiTenant/tenantFromHost.ts
import { createClient } from "@/lib/supabase/server";

export async function getTenantFromHost(host?: string) {
  if (!host) return null;

  const supabase = await createClient();
  const normalized = host.toLowerCase().split(":")[0];

  // Check for custom domain first
  if (
    !normalized.includes("elevateforhumanity.org") &&
    normalized !== "localhost"
  ) {
    const { data: tenantByDomain } = await supabase
      .from("tenants")
      .select("*")
      .eq("custom_domain", normalized)
      .single();

    if (tenantByDomain) return tenantByDomain;
  }

  // Fall back to subdomain matching
  const [sub] = normalized.split(".");
  const { data: tenantBySlug } = await supabase
    .from("tenants")
    .select("*")
    .eq("slug", sub)
    .single();

  return tenantBySlug;
}
