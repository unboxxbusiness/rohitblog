export interface ManifestEntry {
  slug: string;
  persona: string;
  skill_level: string;
  content_category: string;
  meta_title: string;
  meta_description: string;
}

export interface RelatedPost {
  slug: string;
  title: string;
  category: string;
}

export interface Step {
  step_number: number;
  title: string;
  description: string;
  antigravity_prompt: string;
  claude_code_command: string;
}

export interface PostContent {
  seo_title: string;
  seo_description: string;
  answer_block: string;
  intro: string;
  steps: Step[];
  pro_tips: string[];
  resources: string[];
  next_steps: string;
  conversion_block: string;
}

export interface SchemaOrg {
  article: any;
  faq?: any;
  breadcrumb?: any;
  how_to?: any;
  video?: any;
}

export interface BlogPost {
  id: string;
  slug: string;
  status: string;
  persona: string;
  problem: string;
  solution_topic: string;
  skill_level: string;
  content_category: string;
  meta_title: string;
  meta_description: string;
  canonical_url: string;
  h2_structure: string[];
  content: PostContent;
  related_posts: RelatedPost[];
  schema_org: SchemaOrg;
}

export interface PaginatedResult<T> {
  data: T[];
  total: number;
  totalPages: number;
  currentPage: number;
}
