// lib/scorm/parser.ts
import { parseStringPromise } from 'xml2js';

export interface ScormManifest {
  identifier: string;
  version: '1.2' | '2004';
  title: string;
  organizations: ScormOrganization[];
  resources: ScormResource[];
}

export interface ScormOrganization {
  identifier: string;
  title: string;
  items: ScormItem[];
}

export interface ScormItem {
  identifier: string;
  title: string;
  identifierref?: string;
  children?: ScormItem[];
}

export interface ScormResource {
  identifier: string;
  type: string;
  href: string;
  files: string[];
}

export async function parseScormManifest(manifestXml: string): Promise<ScormManifest> {
  const parsed = await parseStringPromise(manifestXml);
  
  const manifest = parsed.manifest;
  const metadata = manifest.metadata?.[0];
  const schemaversion = metadata?.schemaversion?.[0] || '1.2';
  
  const version = schemaversion.includes('2004') ? '2004' : '1.2';
  
  const identifier = manifest.$.identifier;
  const title = manifest.metadata?.[0]?.['lom:lom']?.[0]?.['lom:general']?.[0]?.['lom:title']?.[0]?.['lom:string']?.[0] || 'SCORM Package';
  
  // Parse organizations
  const organizations: ScormOrganization[] = [];
  const orgsElement = manifest.organizations?.[0];
  
  if (orgsElement?.organization) {
    for (const org of orgsElement.organization) {
      const orgId = org.$.identifier;
      const orgTitle = org.title?.[0] || 'Organization';
      const items = parseItems(org.item || []);
      
      organizations.push({
        identifier: orgId,
        title: orgTitle,
        items,
      });
    }
  }
  
  // Parse resources
  const resources: ScormResource[] = [];
  const resourcesElement = manifest.resources?.[0];
  
  if (resourcesElement?.resource) {
    for (const res of resourcesElement.resource) {
      const resId = res.$.identifier;
      const resType = res.$.type || 'webcontent';
      const resHref = res.$.href || '';
      
      const files: string[] = [];
      if (res.file) {
        for (const file of res.file) {
          files.push(file.$.href);
        }
      }
      
      resources.push({
        identifier: resId,
        type: resType,
        href: resHref,
        files,
      });
    }
  }
  
  return {
    identifier,
    version,
    title,
    organizations,
    resources,
  };
}

function parseItems(items: any[]): ScormItem[] {
  const result: ScormItem[] = [];
  
  for (const item of items) {
    const itemId = item.$.identifier;
    const itemTitle = item.title?.[0] || 'Item';
    const identifierref = item.$.identifierref;
    
    const children = item.item ? parseItems(item.item) : undefined;
    
    result.push({
      identifier: itemId,
      title: itemTitle,
      identifierref,
      children,
    });
  }
  
  return result;
}

export function findLaunchUrl(manifest: ScormManifest): string {
  // Find the first launchable resource
  const firstOrg = manifest.organizations[0];
  if (!firstOrg) return '';
  
  const firstItem = firstOrg.items[0];
  if (!firstItem?.identifierref) return '';
  
  const resource = manifest.resources.find(r => r.identifier === firstItem.identifierref);
  if (!resource) return '';
  
  return resource.href;
}
