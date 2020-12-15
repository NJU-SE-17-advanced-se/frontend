export interface AffiliationBasic {
  id: string;
  name: string;
  description: string | null;
}

export interface Affiliation {
  id: string;
  name: string;
  description: string | null;
  researchers: string[];
  papers: string[];
  domains: string[];
}
