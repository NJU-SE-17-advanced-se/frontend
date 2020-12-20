import { ResearcherBasic } from "@/interfaces/researchers";
import { PaperBasic } from "@/interfaces/papers";
import { DomainBasic } from "@/interfaces/domains";

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

export interface AffiliationDisplay {
  id: string;
  name: string;
  description: string | null;
  researchers: ResearcherBasic[];
  papers: PaperBasic[];
  domains: DomainBasic[];
}
