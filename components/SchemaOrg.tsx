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
  
  return (
    <>
      {cleanedArticle && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(cleanedArticle) }}
        />
      )}
      {cleanedFaq && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(cleanedFaq) }}
        />
      )}
    </>
  );
}

