import { ResearcherBasic } from "@/interfaces/researchers";
import { DomainBasic } from "@/interfaces/domains";
import { PublicationBasic } from "@/interfaces/publications";

export interface PaperBasic {
  id: string;
  title: string;
  abs: string;
  publication: string; // 发表位置
  publicationDate: string; // 发表日期，形如'2020'（目前暂定为年）
  citations: number;
  researchers: string[];
}

export interface Paper {
  id: string;
  title: string;
  abs: string;
  publication: string; // 发表位置
  publicationDate: string; // 发表日期，形如'2020'（目前暂定为年）
  citations: number;
  link: string;
  researchers: string[];
  domains: string[];
  references: string[];
}

export interface PaperDisplay {
  id: string;
  title: string;
  abs: string;
  publication: PublicationBasic; // 发表位置
  publicationDate: string; // 发表日期，形如'2020'（目前暂定为年）
  citations: number;
  link: string;
  researchers: ResearcherBasic[];
  domains: DomainBasic[];
  references: string[]; // 首屏不需要加载，故只保留 id
}

// 用于审稿人推荐的新论文
export interface NewPaper {
  abs: string;
  date: number;
  domainIds: string[];
  publication: string;
  referenceIds: string[];
  researcherIds: string[];
  title: string;
}
