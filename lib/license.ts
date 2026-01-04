import fs from "fs";
import path from "path";

export type EFHLicense = {
  licenseHolder: string;
  licenseId: string;
  licenseType: "master" | "single-org" | "white-label" | "acquisition";
  issuedAt: string;
  validDomains: string[];
  status: "active" | "suspended" | "expired";
  notes?: string;
};

let _license: EFHLicense | null = null;

/**
 * Get the current license information
 * This is called server-side only
 */
export function getLicense(): EFHLicense {
  if (_license) return _license;

  const filePath = path.join(process.cwd(), "config/license.json");

  try {
    const raw = fs.readFileSync(filePath, "utf8");
    _license = JSON.parse(raw) as EFHLicense;
    return _license!;
  } catch (err) {
    // Error logged
    // Return a default suspended license
    return {
      licenseHolder: "UNKNOWN",
      licenseId: "UNKNOWN",
      licenseType: "single-org",
      issuedAt: "1970-01-01",
      validDomains: ["localhost"],
      status: "suspended",
      notes: "License file not found"
    };
  }
}

/**
 * Check if the current domain is authorized
 */
export function isDomainAuthorized(hostname: string): boolean {
  const license = getLicense();

  // Always allow localhost
  if (hostname === "localhost" || hostname.startsWith("127.0.0.1")) {
    return true;
  }

  // Check exact matches
  if (license.validDomains.includes(hostname)) {
    return true;
  }

  // Check wildcard matches
  for (const domain of license.validDomains) {
    if (domain.startsWith("*.")) {
      const baseDomain = domain.slice(2);
      if (hostname.endsWith(baseDomain)) {
        return true;
      }
    }
  }

  return false;
}

/**
 * Log license warning (for EFH monitoring)
 */
export function logLicenseWarning(data: unknown) {
  const license = getLicense();

  // In production, you could send this to an external logging service
  // Example: sendToLoggingService({ licenseId: license.licenseId, message, data });
}
