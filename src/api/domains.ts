import axios from "@/config/axios";
import { Domain, DomainBasic } from "@/interfaces/domains";
import { ApiResponse } from "@/interfaces/common";
import { errorMsg } from "@/utils/message";
import { apiWrapper } from "@/utils/wrapper";

// handlers
const gatewayTimeoutHandler = (status: number) => {
  if (status === 504) {
    errorMsg("请求超时，请刷新重试");
  }
};

// 搜索领域
interface DomainSearchRes {
  count: number;
  ids: string[];
}

async function search(
  keyword: string,
  page = 1
): Promise<ApiResponse<DomainSearchRes>> {
  const { status, data } = await axios.get(`/entity-domain/domains`, {
    params: { keyword, page }
  });
  return { status, data };
}

// 根据 id 获取领域详细信息
async function getInfoById(id: string): Promise<ApiResponse<Domain>> {
  const { status, data } = await axios.get(`/entity-domain/domains/${id}`);
  return { status, data };
}

// 根据 id 获取领域基本信息
async function getBasicInfoById(id: string): Promise<ApiResponse<DomainBasic>> {
  const { status, data } = await axios.get(
    `/entity-domain/domains/${id}/basic-info`
  );
  return { status, data };
}

// 获取某领域某一时间段论文
async function getPapers(id: string): Promise<ApiResponse<string[]>> {
  const { status, data } = await axios.get(
    `/entity-domain/domains/${id}/papers`
  );
  return { status, data };
}

// 获取某领域某一时间段学者
async function getResearchers(id: string): Promise<ApiResponse<string[]>> {
  const { status, data } = await axios.get(
    `/entity-domain/domains/${id}/researchers`
  );
  return { status, data };
}

export default {
  search: apiWrapper(search, gatewayTimeoutHandler),
  getInfoById: apiWrapper(getInfoById, gatewayTimeoutHandler),
  getBasicInfoById: apiWrapper(getBasicInfoById, gatewayTimeoutHandler),
  getPapers: apiWrapper(getPapers, gatewayTimeoutHandler),
  getResearchers: apiWrapper(getResearchers, gatewayTimeoutHandler)
};
