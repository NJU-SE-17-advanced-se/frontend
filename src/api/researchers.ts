import axios from "@/config/axios";
import { Researcher, ResearcherBasic } from "@/interfaces/researchers";
import { ApiResponse } from "@/interfaces/common";
import { apiWrapper } from "@/utils/wrapper";
import ResearcherHandlers from "@/api/handlers/researchers";

// 搜索学者
interface ResearcherSearchRes {
  count: number;
  result: string[];
}

async function search(
  keyword: string,
  page = 1
): Promise<ApiResponse<ResearcherSearchRes>> {
  const { status, data } = await axios.get(`/entity-researcher/researchers`, {
    params: { keyword, page }
  });
  return { status, data };
}

// 根据 id 获取学者详细信息
async function getInfoById(id: string): Promise<ApiResponse<Researcher>> {
  const { status, data } = await axios.get(
    `/entity-researcher/researchers/${id}`
  );
  return { status, data };
}

// 获取某学者某一时间段所在机构
async function getAffiliationsByTimeRange(
  id: string,
  start?: string,
  end?: string
): Promise<ApiResponse<string[]>> {
  const { status, data } = await axios.get(
    `/entity-researcher/researchers/${id}/affiliations`,
    {
      params: { start, end }
    }
  );
  return { status, data };
}

// 根据 id 获取学者基本信息
async function getBasicInfoById(
  id: string
): Promise<ApiResponse<ResearcherBasic>> {
  const { status, data } = await axios.get(
    `/entity-researcher/researchers/${id}/basic-info`
  );
  return { status, data };
}

// 获取某学者某一时间段研究领域
async function getDomainsByTimeRange(
  id: string,
  start?: string,
  end?: string
): Promise<ApiResponse<string[]>> {
  const { status, data } = await axios.get(
    `/entity-researcher/researchers/${id}/domains`,
    {
      params: { start, end }
    }
  );
  return { status, data };
}

// 获取某学者某一时间段论文
async function getPapersByTimeRange(
  id: string,
  start?: string,
  end?: string
): Promise<ApiResponse<ApiResponse<string[]>>> {
  const { status, data } = await axios.get(
    `/entity-researcher/researchers/${id}/papers`,
    {
      params: { start, end }
    }
  );
  return { status, data };
}

// 获取某学者某一段时间的合作者
async function getPartnersByTimeRange(
  id: string,
  start?: string,
  end?: string
): Promise<ApiResponse<string[]>> {
  const { status, data } = await axios.get(
    `/task-partnership-analysis/researchers/${id}/partners-net`,
    {
      params: { start, end }
    }
  );
  return { status, data };
}

// 获取某学者未来的合作者
async function predictPartners(id: string): Promise<ApiResponse<string[]>> {
  const { status, data } = await axios.get(
    `/task-partnership-analysis/researchers/${id}/potential-partners`
  );
  return { status, data };
}

// 获取某学者未来的领域
async function predictDomains(id: string): Promise<ApiResponse<string[]>> {
  const { status, data } = await axios.get(
    `/task-domain-prediction/researchers/${id}/domains/future`
  );
  return { status, data };
}

// 获取某学者影响力
async function getImpact(id: string): Promise<ApiResponse<string[]>> {
  const { status, data } = await axios.get(
    `/task-impact-analysis/researchers/${id}/impact`
  );
  return { status, data };
}

// TODO: 引用关系

export default {
  search,
  getInfoById: apiWrapper(getInfoById, ResearcherHandlers.notFoundHandler),
  getAffiliationsByTimeRange,
  getBasicInfoById: apiWrapper(
    getBasicInfoById,
    ResearcherHandlers.notFoundHandler
  ),
  getDomainsByTimeRange,
  getPapersByTimeRange,
  getPartnersByTimeRange,
  predictPartners,
  predictDomains,
  getImpact
};
