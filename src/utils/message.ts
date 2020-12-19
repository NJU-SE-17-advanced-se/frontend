import { Message } from "element-ui";

export function successMsg(msg: string, duration = 1500) {
  Message.success({
    message: msg,
    duration
  });
}

export function errorMsg(msg: string, duration = 2000) {
  Message.error({
    message: msg,
    duration
  });
}

export function warningMsg(msg: string, duration = 2000) {
  Message.warning({
    message: msg,
    duration
  });
}
