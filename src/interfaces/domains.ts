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
