import axios from "@/config/axios";
import { Publication, PublicationBasic } from "@/interfaces/publications";

// 搜索出版物
async function search(
  keyword: string,
  start?: string,
  end?: string,
  page = 1
): Promise<string[]> {
  const { data } = await axios.get(`/entity-publication/publications`, {
    params: { keyword, start, end, page }
  });
  return data;
}

// 根据 id 获取出版物详细信息
async function getInfoById(id: string): Promise<Publication> {
  const { data } = await axios.get(`/entity-publication/publications/${id}`);
  return data;
}

// 根据 id 获取出版物详细信息
async function getBasicInfoById(id: string): Promise<PublicationBasic> {
  const { data } = await axios.get(
    `/entity-publication/publications/${id}/basic-info`
  );
  return data;
}

// 获取某出版物某一时间段的论文
async function getPapers(
  id: string,
  start?: string,
  end?: string
): Promise<string[]> {
  const { data } = await axios.get(
    `/entity-publication/publications/${id}/papers`,
    {
      params: { start, end }
    }
  );
  return data;
}

export default {
  search,
  getInfoById,
  getBasicInfoById,
  getPapers
};
