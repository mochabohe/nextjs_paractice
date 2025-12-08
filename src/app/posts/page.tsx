'use client'

import React, { useEffect, useState } from 'react'
import {
  Table,
  Button,
  Input,
  Space,
  Modal,
  Form,
  message,
  Card,
  Popconfirm,
} from 'antd'

interface Post {
  id: number
  title: string
  content: string
}

interface ApiResponse<T> {
  code: number
  message: string
  data: T
}

interface ListData {
  list: Post[]
  total: number
}

export default function PostsPage() {
  const [loading, setLoading] = useState(false)
  const [data, setData] = useState<Post[]>([])
  const [total, setTotal] = useState(0)
  const [query, setQuery] = useState('')
  const [pagination, setPagination] = useState({
    current: 1,
    pageSize: 10,
  })

  // Modal states
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [modalLoading, setModalLoading] = useState(false)
  const [currentId, setCurrentId] = useState<number | null>(null) // null for add, number for edit
  const [form] = Form.useForm()

  // Fetch data
  const fetchData = async (
    page = pagination.current,
    size = pagination.pageSize,
    search = query
  ) => {
    setLoading(true)
    try {
      const res = await fetch(
        `/api/articles?pagenum=${page}&pagesize=${size}&query=${search}`
      )
      const resData: ApiResponse<ListData> = await res.json()
      if (resData.code === 0) {
        setData(resData.data.list)
        setTotal(resData.data.total)
      } else {
        message.error(resData.message || '获取数据失败')
      }
    } catch (error) {
      console.error(error)
      message.error('网络请求错误')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchData()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  // Handlers
  const handleSearch = () => {
    setPagination({ ...pagination, current: 1 })
    fetchData(1, pagination.pageSize, query)
  }

  const handleReset = () => {
    setQuery('')
    setPagination({ ...pagination, current: 1 })
    fetchData(1, pagination.pageSize, '')
  }

  const handleTableChange = (page: any) => {
    setPagination({ current: page.current, pageSize: page.pageSize })
    fetchData(page.current, page.pageSize, query)
  }

  const showAddModal = () => {
    setCurrentId(null)
    form.resetFields()
    setIsModalOpen(true)
  }

  const showEditModal = (record: Post) => {
    setCurrentId(record.id)
    form.setFieldsValue(record)
    setIsModalOpen(true)
  }

  const handleDelete = async (id: number) => {
    try {
      const res = await fetch(`/api/articles/${id}`, {
        method: 'DELETE',
      })
      const resData = await res.json()
      if (resData.code === 0) {
        message.success('删除成功')
        // Refresh list
        fetchData()
      } else {
        message.error(resData.message || '删除失败')
      }
    } catch (error) {
      message.error('网络请求错误')
    }
  }

  const handleModalOk = async () => {
    try {
      const values = await form.validateFields()
      setModalLoading(true)

      const url = currentId ? `/api/articles/${currentId}` : '/api/articles'
      const method = currentId ? 'PATCH' : 'POST'

      const res = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(values),
      })
      const resData = await res.json()

      if (resData.code === 0) {
        message.success(currentId ? '修改成功' : '添加成功')
        setIsModalOpen(false)
        fetchData()
      } else {
        message.error(resData.message || '操作失败')
      }
    } catch (error) {
      console.error(error)
      message.error('操作失败或校验未通过')
    } finally {
      setModalLoading(false)
    }
  }

  const columns = [
    {
      title: '标题',
      dataIndex: 'title',
      key: 'title',
    },
    {
      title: '内容',
      dataIndex: 'content',
      key: 'content',
    },
    {
      title: '操作',
      key: 'action',
      render: (_: any, record: Post) => (
        <Space size='middle'>
          <Button
            type='link'
            onClick={() => showEditModal(record)}
            style={{ padding: 0 }}
          >
            编辑
          </Button>
          <Popconfirm
            title='确定要删除吗？'
            onConfirm={() => handleDelete(record.id)}
            okText='是'
            cancelText='否'
          >
            <Button type='link' danger style={{ padding: 0 }}>
              删除
            </Button>
          </Popconfirm>
        </Space>
      ),
    },
  ]

  return (
    <div style={{ padding: '24px' }}>
      <Card bordered={false}>
        {/* Search Area */}
        <div
          style={{
            marginBottom: 16,
            display: 'flex',
            justifyContent: 'space-between',
          }}
        >
          <Space>
            <Input
              placeholder='请输入关键词'
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              style={{ width: 200 }}
              onPressEnter={handleSearch}
            />
            <Button onClick={handleSearch}>搜索</Button>
            <Button onClick={handleReset}>重置</Button>
          </Space>
          <Button type='primary' onClick={showAddModal}>
            添加
          </Button>
        </div>

        {/* Table Area */}
        <Table
          columns={columns}
          dataSource={data}
          rowKey='id'
          loading={loading}
          pagination={{
            current: pagination.current,
            pageSize: pagination.pageSize,
            total: total,
            showSizeChanger: true,
          }}
          onChange={handleTableChange}
        />
      </Card>

      {/* Add/Edit Modal */}
      <Modal
        title={currentId ? '编辑文章' : '添加文章'}
        open={isModalOpen}
        onOk={handleModalOk}
        onCancel={() => setIsModalOpen(false)}
        confirmLoading={modalLoading}
        okText='确定'
        cancelText='取消'
      >
        <Form form={form} layout='vertical' name='articleForm'>
          <Form.Item
            name='title'
            label='标题'
            rules={[{ required: true, message: '请输入标题' }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name='content'
            label='内容'
            rules={[{ required: true, message: '请输入内容' }]}
          >
            <Input.TextArea rows={4} />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  )
}
