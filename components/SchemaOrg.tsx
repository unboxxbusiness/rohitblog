import type { SchemaOrg as SchemaOrgType } from '@/lib/types';
import { BASE_URL } from '@/lib/constants';

export default function SchemaOrg({ schema_org }: { schema_org: SchemaOrgType }) {
  if (!schema_org) return null;

  // Function to recursively find and replace yourdomain.com with the dynamic BASE_URL
  const cleanSchema = (obj: any): any => {
    if (typeof obj === 'string') {
      return obj.replace(/https:\/\/yourdomain\.com/g, BASE_URL);
    }
    if (Array.isArray(obj)) {
      return obj.map(cleanSchema);
    }
    if (obj !== null && typeof obj === 'object') {
      const newObj: any = {};
      for (const key in obj) {
        newObj[key] = cleanSchema(obj[key]);
      }
      return newObj;
    }
    return obj;
  };

  const cleanedArticle = schema_org.article ? cleanSchema(schema_org.article) : null;
  const cleanedFaq = schema_org.faq ? cleanSchema(schema_org.faq) : null;
  const cleanedBreadcrumb = schema_org.breadcrumb ? cleanSchema(schema_org.breadcrumb) : null;
  const cleanedHowTo = schema_org.how_to ? cleanSchema(schema_org.how_to) : null;
  const cleanedVideo = schema_org.video ? cleanSchema(schema_org.video) : null;
  
  const allSchemas = [
    cleanedArticle,
    cleanedFaq,
    cleanedBreadcrumb,
    cleanedHowTo,
    cleanedVideo
  ].filter(Boolean);

  return (
    <>
      {allSchemas.map((schema, index) => (
        <script
          key={index}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
      ))}
    </>
  );
}

