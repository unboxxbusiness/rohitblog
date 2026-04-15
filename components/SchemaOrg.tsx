import type { SchemaOrg as SchemaOrgType } from '@/lib/types';

export default function SchemaOrg({ schema_org }: { schema_org: SchemaOrgType }) {
  if (!schema_org) return null;
  
  return (
    <>
      {schema_org.article && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schema_org.article) }}
        />
      )}
      {schema_org.faq && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schema_org.faq) }}
        />
      )}
    </>
  );
}
