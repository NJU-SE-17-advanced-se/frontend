import axios from "@/config/axios";
import { Affiliation, AffiliationBasic } from "@/interfaces/affiliations";

// 搜索机构
interface AffiliationSearchRes {
  count: number;
  result: string[];
}

async function search(
  keyword: string,
  page = 1
): Promise<AffiliationSearchRes> {
  const { data } = await axios.get(`/entity-affiliation/affiliations`, {
    params: { keyword, page }
  });
  return data;
}

// 根据 id 获取机构详细信息
async function getInfoById(id: string): Promise<Affiliation> {
  const { data } = await axios.get(`/entity-affiliation/affiliations/${id}`);
  return data;
}

// 根据 id 获取机构基本信息
async function getBasicInfoById(id: string): Promise<AffiliationBasic> {
  const { data } = await axios.get(
    `/entity-affiliation/affiliations/${id}/basic-info`
  );
  return data;
}

// 获取某机构研究领域
async function getDomains(id: string): Promise<string[]> {
  const { data } = await axios.get(
    `/entity-affiliation/affiliations/${id}/domains`
  );
  return data;
}

// 获取某机构论文
async function getPapers(id: string): Promise<string[]> {
  const { data } = await axios.get(
    `/entity-affiliation/affiliations/${id}/papers`
  );
  return data;
}

// 获取某机构学者
async function getResearchers(id: string): Promise<string[]> {
  const { data } = await axios.get(
    `/entity-affiliation/affiliations/${id}/researchers`
  );
  return data;
}

export default {
  search,
  getInfoById,
  getBasicInfoById,
  getDomains,
  getPapers,
  getResearchers
};
