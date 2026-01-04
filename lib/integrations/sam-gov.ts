/**
 * SAM.gov API Integration
 * System for Award Management - Federal government contractor database
 */

interface SAMEntity {
  uei: string;
  legalBusinessName: string;
  dbaName?: string;
  physicalAddress?: any;
  entityStatus?: string;
  exclusionStatus?: string;
}

/**
 * Get entity by UEI (Unique Entity Identifier)
 */
export async function getEntityByUEI(uei: string): Promise<SAMEntity | null> {
  const apiKey = process.env.SAM_GOV_API_KEY;

  if (!apiKey) {
    return null;
  }

  try {
    const response = await fetch(
      `https://api.sam.gov/entity-information/v3/entities?ueiSAM=${uei}&api_key=${apiKey}`,
      {
        headers: {
          'Accept': 'application/json',
        },
      }
    );

    if (!response.ok) {
      return null;
    }

    const data = await response.json();
    return data.entityData?.[0] || null;
  } catch (error: unknown) {
    return null;
  }
}

/**
 * Check if entity is excluded from federal contracts
 */
export async function checkExclusions(uei: string): Promise<boolean> {
  const apiKey = process.env.SAM_GOV_API_KEY;

  if (!apiKey) {
    return false;
  }

  try {
    const response = await fetch(
      `https://api.sam.gov/entity-information/v3/exclusions?ueiSAM=${uei}&api_key=${apiKey}`,
      {
        headers: {
          'Accept': 'application/json',
        },
      }
    );

    if (!response.ok) {
      return false;
    }

    const data = await response.json();
    return data.exclusionDetails && data.exclusionDetails.length > 0;
  } catch (error: unknown) {
    return false;
  }
}

/**
 * Search entities by name
 */
export async function searchEntities(name: string): Promise<SAMEntity[]> {
  const apiKey = process.env.SAM_GOV_API_KEY;

  if (!apiKey) {
    return [];
  }

  try {
    const response = await fetch(
      `https://api.sam.gov/entity-information/v3/entities?legalBusinessName=${encodeURIComponent(name)}&api_key=${apiKey}`,
      {
        headers: {
          'Accept': 'application/json',
        },
      }
    );

    if (!response.ok) {
      return [];
    }

    const data = await response.json();
    return data.entityData || [];
  } catch (error: unknown) {
    return [];
  }
}

/**
 * Validate UEI format
 */
export function isValidUEI(uei: string): boolean {
  // UEI is 12 alphanumeric characters
  return /^[A-Z0-9]{12}$/.test(uei);
}
