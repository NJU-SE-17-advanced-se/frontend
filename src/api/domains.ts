import axios from "@/config/axios";
import { Domain, DomainBasic } from "@/interfaces/domains";

// 搜索领域
interface DomainSearchRes {
  count: number;
  ids: string[];
}

async function search(keyword: string, page = 1): Promise<DomainSearchRes> {
  const { data } = await axios.get(`/entity-domain/domains`, {
    params: { keyword, page }
  });
  return data;
}

// 根据 id 获取领域详细信息
async function getInfoById(id: string): Promise<Domain> {
  const { data } = await axios.get(`/entity-domain/domains/${id}`);
  return data;
}

// 根据 id 获取领域基本信息
async function getBasicInfoById(id: string): Promise<DomainBasic> {
  const { data } = await axios.get(`/entity-domain/domains/${id}/basic-info`);
  return data;
}

// 获取某领域某一时间段论文
async function getPapers(id: string): Promise<string[]> {
  const { data } = await axios.get(`/entity-domain/domains/${id}/papers`);
  return data;
}

// 获取某领域某一时间段学者
async function getResearchers(id: string): Promise<string[]> {
  const { data } = await axios.get(`/entity-domain/domains/${id}/researchers`);
  return data;
}

export default {
  search,
  getInfoById,
  getBasicInfoById,
  getPapers,
  getResearchers
};
