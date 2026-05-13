// 简单的内存存储，每次部署会重置，也可以用数据库替代
let dataList = [];

export default function handler(req, res) {
  // 处理POST请求：保存数据
  if (req.method === 'POST') {
    const data = req.body;
    dataList.push(data);
    return res.status(200).json({ message: '数据保存成功' });
  }

  // 处理GET请求：获取所有数据
  if (req.method === 'GET') {
    return res.status(200).json(dataList);
  }

  // 处理DELETE请求：清空数据
  if (req.method === 'DELETE') {
    dataList = [];
    return res.status(200).json({ message: '数据已清空' });
  }

  // 其他请求返回错误
  res.status(405).json({ message: '方法不允许' });
}