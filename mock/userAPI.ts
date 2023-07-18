const users = [
  { id: 0, name: 'Umi', nickName: 'U', gender: 'MALE' },
  { id: 1, name: 'Fish', nickName: 'B', gender: 'FEMALE' },
];

const videos = [
  { id: 0, name: 'Umi', nickName: 'U', gender: 'MALE' },
  { id: 1, name: 'Fish', nickName: 'B', gender: 'FEMALE' },
  { id: 2, name: 'Umi', nickName: 'U', gender: 'MALE' },
  { id: 3, name: 'Fish', nickName: 'B', gender: 'FEMALE' },
  { id: 4, name: 'Umi', nickName: 'U', gender: 'MALE' },
  { id: 5, name: 'Fish', nickName: 'B', gender: 'FEMALE' },
  { id: 6, name: 'Umi', nickName: 'U', gender: 'MALE' },
  { id: 7, name: 'Fish', nickName: 'B', gender: 'FEMALE' },
  { id: 8, name: 'Umi', nickName: 'U', gender: 'MALE' },
  { id: 9, name: 'Fish', nickName: 'B', gender: 'FEMALE' },
  { id: 10, name: 'Umi', nickName: 'U', gender: 'MALE' },
];
export default {
  'GET /api/v1/queryUserList': (req: any, res: any) => {
    res.json({
      success: true,
      data: { list: users },
      errorCode: 0,
    });
  },

  'GET /api/v1/queryVides': (req: any, res: any) => {
    res.json({
      success: true,
      data: videos,
      errorCode: 0,
    });
  },
  'PUT /api/v1/user/': (req: any, res: any) => {
    res.json({
      success: true,
      errorCode: 0,
    });
  },
};
