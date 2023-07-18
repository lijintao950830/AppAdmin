import cloudbase from '@cloudbase/js-sdk';
import { message } from 'antd';
type KV<T> = {
  [key: string]: T;
};
const app = cloudbase.init({
  env: 'cloud1-5grmes7r14f01703',
});
const db = app.database();
export const getBooksList = async () => {
  const res = await db.collection('books').get();
  console.log(res);

  return res;
};
export const addBook = async (name: string) => {
  const res = await db.collection('books').add({ name });
  return res;
};

export const login = async ({
  username,
  password,
}: {
  username: string;
  password: string;
}) => {
  return await app.callFunction({
    // 云函数名称
    name: 'login',
    // 传给云函数的参数
    data: {
      username,
      password,
    },
  });
};

export const test = async ({
  username,
  password,
}: {
  username: string;
  password: string;
}) => {
  return await app.callFunction({
    // 云函数名称
    name: 'test',
    // 传给云函数的参数
    data: {
      username,
      password,
    },
  });
};
// 云函数调用
export class Cloudbase {
  getDbCollection() {
    return db.collection;
  }
  async getCallFunction(name: string, data?: KV<any>) {
    const res = await app.callFunction({
      // 云函数名称
      name,
      // 传给云函数的参数
      data,
    });
    console.log(res);
    if (res.result.message) {
      message.error(res.result.message);
    }
    return res;
  }
}
