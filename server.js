const express = require('express');
const cors = require('cors');
const fs = require('fs');
const path = require('path');

const app = express();
const port = process.env.PORT || 3000;
const dataPath = path.join(__dirname, 'data.json');

// 初始化数据文件
if (!fs.existsSync(dataPath)) {
  fs.writeFileSync(dataPath, JSON.stringify([]));
}

app.use(cors());
app.use(express.json());
app.use(express.static(__dirname));

// 接收前端上传的信息
app.post('/upload', (req, res) => {
  const data = JSON.parse(fs.readFileSync(dataPath, 'utf-8'));
  data.push(req.body);
  fs.writeFileSync(dataPath, JSON.stringify(data, null, 2));
  res.json({ code: 200, msg: '上传成功' });
});

// 获取所有数据接口（给后台页面用）
app.get('/getdata', (req, res) => {
  const data = JSON.parse(fs.readFileSync(dataPath, 'utf-8'));
  res.json(data);
});

// 清空数据接口
app.delete('/cleardata', (req, res) => {
  fs.writeFileSync(dataPath, JSON.stringify([]));
  res.json({ code: 200, msg: '数据已清空' });
});

app.listen(port, () => {
  console.log(`服务已启动，端口：${port}`);
});
