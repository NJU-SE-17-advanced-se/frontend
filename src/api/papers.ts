import axios from "@/config/axios";
import { NewPaper, Paper, PaperBasic } from "@/interfaces/papers";

// 搜索论文
interface PaperSearchRes {
  count: number;
  ids: string[];
}

async function search(
  keyword: string,
  start?: string,
  end?: string,
  page = 1
): Promise<PaperSearchRes> {
  const { data } = await axios.get(`/entity-paper/papers`, {
    params: { keyword, start, end, page }
  });
  return data;
}

// 根据 id 获取论文详细信息
async function getInfoById(id: string): Promise<Paper> {
  const { data } = await axios.get(`/entity-paper/papers/${id}`);
  return data;
}

// 根据 id 获取论文基本信息
async function getBasicInfoById(id: string): Promise<PaperBasic> {
  const { data } = await axios.get(`/entity-paper/papers/${id}/basic-info`);
  return data;
}

// 获取某论文引用论文
async function getReferences(id: string): Promise<string[]> {
  const { data } = await axios.get(`/entity-paper/papers/${id}/citations`);
  return data;
}

// 获取某论文所属领域
async function getDomains(id: string): Promise<string[]> {
  const { data } = await axios.get(`/entity-paper/papers/${id}/domains`);
  return data;
}

// 推荐审稿人
async function getRecommendReviewers(paper: NewPaper): Promise<string[]> {
  const { data } = await axios.post(
    "/task-reviewer-recommendation/papers/recommend",
    paper
  );
  return data;
}

// 不推荐审稿人
async function getNotRecommendReviewers(paper: NewPaper): Promise<string[]> {
  const { data } = await axios.post(
    "/task-reviewer-recommendation/papers/not-recommend",
    paper
  );
  return data;
}

// 获取某论文影响力
async function getImpact(id: string): Promise<string[]> {
  const { data } = await axios.get(`/task-impact-analysis/papers/${id}/impact`);
  return data;
}

// TODO: 引用关系

export default {
  search,
  getInfoById,
  getBasicInfoById,
  getReferences,
  getDomains,
  getRecommendReviewers,
  getNotRecommendReviewers,
  getImpact
};
