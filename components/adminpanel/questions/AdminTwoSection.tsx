'use client'
import React, { useEffect, useState } from 'react';
import { Table, Button, Modal, Form, Input, message, Space, Select } from 'antd';
import { ParagraphComparisonQuestionType } from '@/types';
import { PlusOutlined } from '@ant-design/icons';
import { 
  fetchQuestions, 
  createQuestion, 
  updateQuestion, 
  deleteQuestion 
} from '@/api/twoPharagraphsQuestionApi';

const AdminTwoSection = () => {
  const [questions, setQuestions] = useState<ParagraphComparisonQuestionType[]>([]);
  const [loading, setLoading] = useState(false);
  const [visible, setVisible] = useState(false);
  const [form] = Form.useForm();
  const [editingQuestion, setEditingQuestion] = useState<ParagraphComparisonQuestionType | null>(null);

  useEffect(() => {
    const loadData = async () => {
      try {
        setLoading(true);
        const questionsData = await fetchQuestions();
        setQuestions(questionsData);
      } catch (error) {
        console.error('Error loading data:', error);
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, []);

  const handleCreate = async (values: ParagraphComparisonQuestionType) => {
    try {
      await createQuestion(values);
      message.success('Question created successfully');
      const questionsData = await fetchQuestions();
      setQuestions(questionsData);
      setVisible(false);
      form.resetFields();
    } catch (error) {
      message.error('Failed to create question. Please try again.');
    }
  };

  const handleUpdate = async (id: string, values: ParagraphComparisonQuestionType) => {
    try {
      await updateQuestion(id, values);
      message.success('Question updated successfully');
      const questionsData = await fetchQuestions();
      setQuestions(questionsData);
      setVisible(false);
      form.resetFields();
    } catch (error) {
      message.error('Failed to update question. Please try again.');
    }
  };

  const handleDelete = async (id: string) => {
    try {
      await deleteQuestion(id);
      message.success('Question deleted successfully');
      const questionsData = await fetchQuestions();
      setQuestions(questionsData);
    } catch (error) {
      message.error('Failed to delete question. Please try again.');
    }
  };

  const columns = [
    { title: 'Paragraph A', dataIndex: 'paragraphA', key: 'paragraphA' },
    { title: 'Paragraph B', dataIndex: 'paragraphB', key: 'paragraphB' },
    {
      title: 'Questions',
      dataIndex: 'questions',
      key: 'questions',
      render: (questions: { questionText: string }[]) => questions.map(q => q.questionText).join(', ')
    },
    {
      title: 'Action',
      key: 'action',
      render: (text: any, record: ParagraphComparisonQuestionType) => (
        <span>
          <Button type="link" onClick={() => { setEditingQuestion(record); setVisible(true); form.setFieldsValue(record); }}>Edit</Button>
          <Button type="link" onClick={() => handleDelete(record._id)}>Delete</Button>
        </span>
      ),
    },
  ];

  const showModal = () => {
    setVisible(true);
    setEditingQuestion(null);
    form.resetFields();
  };

  const handleCancel = () => {
    setVisible(false);
  };

  const onFinish = (values: ParagraphComparisonQuestionType) => {
    if (editingQuestion) {
      handleUpdate(editingQuestion._id, values);
    } else {
      handleCreate(values);
    }
  };

  return (
    <>
      <Button type="primary" onClick={showModal}>Create Question</Button>
      <Table dataSource={questions} columns={columns} loading={loading} rowKey="_id" />
      <Modal
        title={editingQuestion ? 'Edit Question' : 'Create Question'}
        visible={visible}
        onCancel={handleCancel}
        footer={null}
        width={1000} 
      >
        <Form form={form} onFinish={onFinish} layout="vertical">
          <Form.Item name="paragraphA" label="Paragraph A" rules={[{ required: true, message: 'Please input paragraph A!' }]}>
            <Input.TextArea />
          </Form.Item>
          <Form.Item name="paragraphB" label="Paragraph B" rules={[{ required: true, message: 'Please input paragraph B!' }]}>
            <Input.TextArea />
          </Form.Item>
          <Form.List name="questions">
            {(fields, { add, remove }) => (
              <>
                {fields.map(({ key, name, fieldKey, ...restField }) => (
                  <Space key={key} style={{ display: 'flex', marginBottom: 8 }} align="baseline">
                    <Form.Item
                      {...restField}
                      name={[name, 'questionText']}
                      fieldKey={[fieldKey ?? name, 'questionText']}
                      rules={[{ required: true, message: 'Please input the question text!' }]}
                    >
                      <Input placeholder="Question Text" />
                    </Form.Item>
                    <Form.Item
                      {...restField}
                      name={[name, 'correctAnswer']}
                      fieldKey={[fieldKey ?? name, 'correctAnswer']}
                      rules={[{ required: true, message: 'Please select the correct answer!' }]}
                    >
                      <Select placeholder="Correct Answer">
                        <Select.Option value="A">A</Select.Option>
                        <Select.Option value="B">B</Select.Option>
                        <Select.Option value="Both">Both</Select.Option>
                      </Select>
                    </Form.Item>
                    <Button onClick={() => remove(name)}>Remove</Button>
                  </Space>
                ))}
                <Form.Item>
                  <Button type="dashed" onClick={() => add()} block icon={<PlusOutlined />}>
                    Add Question
                  </Button>
                </Form.Item>
              </>
            )}
          </Form.List>
          <Form.Item>
            <Button type="primary" htmlType="submit">
              {editingQuestion ? 'Update Question' : 'Create Question'}
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};

export default AdminTwoSection;
