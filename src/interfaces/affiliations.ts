export interface AffiliationBasic {
  id: string;
  name: string;
  description: string;
}

export interface Affiliation {
  id: string;
  name: string;
  description: string;
  researchers: string[];
  papers: string[];
  domains: string[];
}
