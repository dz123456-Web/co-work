const express = require('express');
const cors = require('cors');

const app = express();

app.use(cors());
app.use(express.json());

// 模拟数据
let apis = [];
let sdks = [];
let components = [];

// ========== API路由 ==========
app.get('/api/apis', (req, res) => { res.json(apis); });
app.post('/api/apis', (req, res) => {
    const newApi = { _id: Date.now().toString(), ...req.body, createdAt: new Date() };
    apis.push(newApi);
    res.status(201).json(newApi);
});
app.delete('/api/apis/:id', (req, res) => {
    apis = apis.filter(api => api._id !== req.params.id);
    res.json({ message: '删除成功' });
});

// ========== SDK路由 ==========
app.get('/api/sdks', (req, res) => { res.json(sdks); });
app.post('/api/sdks', (req, res) => {
    const newSdk = { _id: Date.now().toString(), ...req.body, createdAt: new Date() };
    sdks.push(newSdk);
    res.status(201).json(newSdk);
});
app.delete('/api/sdks/:id', (req, res) => {
    sdks = sdks.filter(sdk => sdk._id !== req.params.id);
    res.json({ message: '删除成功' });
});

// ========== 组件路由 ==========
app.get('/api/components', (req, res) => { res.json(components); });
app.post('/api/components', (req, res) => {
    const newComponent = { _id: Date.now().toString(), ...req.body, createdAt: new Date() };
    components.push(newComponent);
    res.status(201).json(newComponent);
});
app.delete('/api/components/:id', (req, res) => {
    components = components.filter(c => c._id !== req.params.id);
    res.json({ message: '删除成功' });
});

app.get('/', (req, res) => { res.json({ message: '服务器跑起来了！' }); });

const PORT = 3001;
app.listen(PORT, () => {
    console.log(`服务器运行在 http://localhost:${PORT}`);
    console.log('模拟数据模式，数据存在内存中');
});