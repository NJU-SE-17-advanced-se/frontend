export interface ResearcherBasic {
  id: string;
  name: string;
  affiliation: string[]; // 可能同时身在多个机构
  papers: string[]; // 五篇代表作
  domains: string[];
}

export interface Researcher {
  id: string;
  name: string;
  affiliation: string[]; // 可能同时身在多个机构
  papers: string[];
  domains: string[];
}
