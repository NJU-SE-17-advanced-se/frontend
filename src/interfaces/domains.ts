import { ResearcherBasic } from "@/interfaces/researchers";
import { PaperBasic } from "@/interfaces/papers";

export interface DomainBasic {
  id: string;
  name: string;
}

export interface Domain {
  id: string;
  name: string;
  researchers: string[];
  papers: string[];
}

export interface DomainDisplay {
  id: string;
  name: string;
  researchers: ResearcherBasic[];
  papers: PaperBasic[];
}
