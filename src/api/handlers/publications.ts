import { errorMsg } from "@/utils/message";

const notFoundHandler = (status: number) => {
  if (status === 404) {
    errorMsg("出版物不存在 😭");
  }
};

export default { notFoundHandler };
