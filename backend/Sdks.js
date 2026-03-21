import React, { useState, useEffect } from 'react';
import { Table, Button, Modal, Form, Input, Select, message } from 'antd';
import axios from 'axios';

const API_URL = 'http://localhost:3001/api';

function Sdks() {
    const [sdks, setSdks] = useState([]);
    const [loading, setLoading] = useState(false);
    const [modalVisible, setModalVisible] = useState(false);
    const [form] = Form.useForm();

    // 获取SDK列表
    const fetchSdks = async () => {
        setLoading(true);
        try {
            const res = await axios.get(`${API_URL}/sdks`);
            setSdks(res.data);
        } catch (err) {
            message.error('获取数据失败');
        }
        setLoading(false);
    };

    useEffect(() => {
        fetchSdks();
    }, []);

    // 添加SDK
    const handleAdd = async (values) => {
        try {
            await axios.post(`${API_URL}/sdks`, values);
            message.success('添加成功');
            setModalVisible(false);
            form.resetFields();
            fetchSdks();
        } catch (err) {
            message.error('添加失败');
        }
    };

    // 删除SDK
    const handleDelete = async (id) => {
        try {
            await axios.delete(`${API_URL}/sdks/${id}`);
            message.success('删除成功');
            fetchSdks();
        } catch (err) {
            message.error('删除失败');
        }
    };

    const columns = [
        { title: '名称', dataIndex: 'name', key: 'name' },
        { title: '描述', dataIndex: 'description', key: 'description' },
        { title: '版本', dataIndex: 'version', key: 'version' },
        { title: 'npm包名', dataIndex: 'npmPackage', key: 'npmPackage' },
        {
            title: '支持平台',
            dataIndex: 'platforms',
            key: 'platforms',
            render: (platforms) => platforms ? platforms.join(', ') : '-'
        },
        {
            title: '操作',
            key: 'action',
            render: (_, record) => (
                <Button danger onClick={() => handleDelete(record._id)}>删除</Button>
            )
        }
    ];

    return (
        <div>
            <Button type="primary" onClick={() => setModalVisible(true)} style={{ marginBottom: 16 }}>
                添加SDK
            </Button>
            <Table columns={columns} dataSource={sdks} rowKey="_id" loading={loading} />

            <Modal
                title="添加SDK"
                open={modalVisible}
                onCancel={() => setModalVisible(false)}
                footer={null}
            >
                <Form form={form} onFinish={handleAdd} layout="vertical">
                    <Form.Item name="name" label="名称" rules={[{ required: true }]}>
                        <Input />
                    </Form.Item>
                    <Form.Item name="description" label="描述">
                        <Input.TextArea rows={2} />
                    </Form.Item>
                    <Form.Item name="version" label="版本" initialValue="1.0.0">
                        <Input />
                    </Form.Item>
                    <Form.Item name="npmPackage" label="npm包名">
                        <Input placeholder="例如：@company/sdk-name" />
                    </Form.Item>
                    <Form.Item name="platforms" label="支持平台">
                        <Select mode="multiple" placeholder="选择支持的平台">
                            <Select.Option value="iOS">iOS</Select.Option>
                            <Select.Option value="Android">Android</Select.Option>
                            <Select.Option value="小程序">小程序</Select.Option>
                            <Select.Option value="H5">H5</Select.Option>
                        </Select>
                    </Form.Item>
                    <Form.Item name="docUrl" label="文档地址">
                        <Input placeholder="https://..." />
                    </Form.Item>
                    <Form.Item>
                        <Button type="primary" htmlType="submit" block>提交</Button>
                    </Form.Item>
                </Form>
            </Modal>
        </div>
    );
}

export default Sdks;