import axios from "@/config/axios";
import { Publication, PublicationBasic } from "@/interfaces/publications";
import { ApiResponse } from "@/interfaces/common";
import { apiWrapper } from "@/utils/wrapper";
import PublicationHandlers from "@/api/handlers/publications";

// 搜索出版物
interface PublicationSearchRes {
  count: number;
  result: string[];
}

async function search(
  keyword: string,
  page = 1,
  start?: string,
  end?: string
): Promise<ApiResponse<PublicationSearchRes>> {
  const { status, data } = await axios.get(`/entity-publication/publications`, {
    params: { keyword, start, end, page }
  });
  return { status, data };
}

// 根据 id 获取出版物详细信息
async function getInfoById(id: string): Promise<ApiResponse<Publication>> {
  const { status, data } = await axios.get(
    `/entity-publication/publications/${id}`
  );
  return { status, data };
}

// 根据 id 获取出版物详细信息
async function getBasicInfoById(
  id: string
): Promise<ApiResponse<PublicationBasic>> {
  const { status, data } = await axios.get(
    `/entity-publication/publications/${id}/basic-info`
  );
  return { status, data };
}

// 获取某出版物某一时间段的论文
async function getPapers(
  id: string,
  start?: string,
  end?: string
): Promise<ApiResponse<string[]>> {
  const { status, data } = await axios.get(
    `/entity-publication/publications/${id}/papers`,
    {
      params: { start, end }
    }
  );
  return { status, data };
}

export default {
  search,
  getInfoById: apiWrapper(getInfoById, PublicationHandlers.notFoundHandler),
  getBasicInfoById: apiWrapper(
    getBasicInfoById,
    PublicationHandlers.notFoundHandler
  ),
  getPapers
};
