import axios from "@/config/axios";
import { NewPaper, Paper, PaperBasic } from "@/interfaces/papers";
import { ApiResponse } from "@/interfaces/common";
import { apiWrapper } from "@/utils/wrapper";
import PaperHandlers from "@/api/handlers/papers";

// 搜索论文
interface PaperSearchRes {
  count: number;
  ids: string[];
}

async function search(
  keyword: string,
  page = 1,
  start?: string,
  end?: string
): Promise<ApiResponse<PaperSearchRes>> {
  const { status, data } = await axios.get(`/entity-paper/papers`, {
    params: { keyword, start, end, page }
  });
  return { status, data };
}

// 根据 id 获取论文详细信息
async function getInfoById(id: string): Promise<ApiResponse<Paper>> {
  const { status, data } = await axios.get(`/entity-paper/papers/${id}`);
  return { status, data };
}

// 根据 id 获取论文基本信息
async function getBasicInfoById(id: string): Promise<ApiResponse<PaperBasic>> {
  const { status, data } = await axios.get(
    `/entity-paper/papers/${id}/basic-info`
  );
  return { status, data };
}

// 获取某论文引用论文
async function getReferences(id: string): Promise<ApiResponse<string[]>> {
  const { status, data } = await axios.get(
    `/entity-paper/papers/${id}/citations`
  );
  return { status, data };
}

// 获取某论文所属领域
async function getDomains(id: string): Promise<ApiResponse<string[]>> {
  const { status, data } = await axios.get(
    `/entity-paper/papers/${id}/domains`
  );
  return { status, data };
}

// 推荐审稿人
async function getRecommendReviewers(
  paper: NewPaper
): Promise<ApiResponse<string[]>> {
  const { status, data } = await axios.post(
    "/task-reviewer-recommendation/papers/recommend",
    paper
  );
  return { status, data };
}

// 不推荐审稿人
async function getNotRecommendReviewers(
  paper: NewPaper
): Promise<ApiResponse<string[]>> {
  const { status, data } = await axios.post(
    "/task-reviewer-recommendation/papers/not-recommend",
    paper
  );
  return { status, data };
}

// 获取某论文影响力
async function getImpact(id: string): Promise<ApiResponse<string[]>> {
  const { status, data } = await axios.get(
    `/task-impact-analysis/papers/${id}/impact`
  );
  return { status, data };
}

// TODO: 引用关系

export default {
  search,
  getInfoById: apiWrapper(getInfoById, PaperHandlers.notFoundHandler),
  getBasicInfoById: apiWrapper(getBasicInfoById, PaperHandlers.notFoundHandler),
  getReferences,
  getDomains,
  getRecommendReviewers: apiWrapper(getRecommendReviewers),
  getNotRecommendReviewers: apiWrapper(getNotRecommendReviewers),
  getImpact
};
