import { PaperBasic } from "@/interfaces/papers";

export interface PublicationBasic {
  id: string;
  name: string;
  publicationDate: string; // 出版日期
}

export interface Publication {
  id: string;
  name: string;
  publicationDate: string; // 出版日期
  impact: number; // 出版时的影响因子
  papers: string[];
}

export interface PublicationDisplay {
  id: string;
  name: string;
  publicationDate: string; // 出版日期
  impact: number; // 出版时的影响因子
  papers: PaperBasic[];
}
