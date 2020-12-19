import axios from "@/config/axios";
import { Affiliation, AffiliationBasic } from "@/interfaces/affiliations";
import { ApiResponse } from "@/interfaces/common";
import { errorMsg } from "@/utils/message";
import { apiWrapper } from "@/utils/wrapper";

// handlers
const gatewayTimeoutHandler = (status: number) => {
  if (status === 504) {
    errorMsg("请求超时，请刷新重试");
  }
};

// 搜索机构
interface AffiliationSearchRes {
  count: number;
  ids: string[];
}

async function search(
  keyword: string,
  page = 1
): Promise<ApiResponse<AffiliationSearchRes>> {
  const { status, data } = await axios.get(`/entity-affiliation/affiliations`, {
    params: { keyword, page }
  });
  return { status, data };
}

// 根据 id 获取机构详细信息
async function getInfoById(id: string): Promise<ApiResponse<Affiliation>> {
  const { status, data } = await axios.get(
    `/entity-affiliation/affiliations/${id}`
  );
  return { status, data };
}

// 根据 id 获取机构基本信息
async function getBasicInfoById(
  id: string
): Promise<ApiResponse<AffiliationBasic>> {
  const { status, data } = await axios.get(
    `/entity-affiliation/affiliations/${id}/basic-info`
  );
  return { status, data };
}

// 获取某机构研究领域
async function getDomains(id: string): Promise<ApiResponse<string[]>> {
  const { status, data } = await axios.get(
    `/entity-affiliation/affiliations/${id}/domains`
  );
  return { status, data };
}

// 获取某机构论文
async function getPapers(id: string): Promise<ApiResponse<string[]>> {
  const { status, data } = await axios.get(
    `/entity-affiliation/affiliations/${id}/papers`
  );
  return { status, data };
}

// 获取某机构学者
async function getResearchers(id: string): Promise<ApiResponse<string[]>> {
  const { status, data } = await axios.get(
    `/entity-affiliation/affiliations/${id}/researchers`
  );
  return { status, data };
}

export default {
  search: apiWrapper(search, gatewayTimeoutHandler),
  getInfoById: apiWrapper(getInfoById, gatewayTimeoutHandler),
  getBasicInfoById: apiWrapper(getBasicInfoById, gatewayTimeoutHandler),
  getDomains: apiWrapper(getDomains, gatewayTimeoutHandler),
  getPapers: apiWrapper(getPapers, gatewayTimeoutHandler),
  getResearchers: apiWrapper(getResearchers, gatewayTimeoutHandler)
};
