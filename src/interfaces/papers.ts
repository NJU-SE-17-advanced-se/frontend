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
