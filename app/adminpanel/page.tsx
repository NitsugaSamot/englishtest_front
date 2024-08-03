'use client';
import React, { useEffect, useState } from 'react';
import { Table, Button, Modal, Form, Input, message, Space, Select } from 'antd';
import Header from '@/components/header/Header';
import { QuestionType } from '@/types'; 
import { PlusOutlined } from '@ant-design/icons';
import { 
  fetchQuestions, 
  createQuestion, 
  updateQuestion, 
  deleteQuestion 
} from '@/api/questionApi'; 
import { TransformedQuestionType, Option } from '@/types';

const AdminPanel = () => {
  const [questions, setQuestions] = useState<QuestionType[]>([]);
  const [loading, setLoading] = useState(false);
  const [visible, setVisible] = useState(false);
  const [form] = Form.useForm();
  const [editingQuestion, setEditingQuestion] = useState<QuestionType | null>(null);

  const languages = ["English", "Spanish"];

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

  const handleCreate = async (values: QuestionType) => {
    try {

      const transformedData: TransformedQuestionType = {
        ...values,
        options: values.options?.map((option) => option.option) || [],
      };
  
      await createQuestion(transformedData);
      message.success('Question created successfully');
      const questionsData = await fetchQuestions();
      setQuestions(questionsData);
      setVisible(false);
      form.resetFields();
    } catch (error) {
      message.error('Failed to create question. Please try again.');
    }
  };
  
  const handleUpdate = async (id: string, values: QuestionType) => {
    try {

      const transformedData: TransformedQuestionType = {
        ...values,
        options: values.options?.map((option) => option.option) || [],
      };
  
      await updateQuestion(id, transformedData);
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
    { title: 'Question Text', dataIndex: 'questionText', key: 'questionText' },
    { title: 'Language', dataIndex: 'language', key: 'language' },
    {
      title: 'Options',
      dataIndex: 'options',
      key: 'options',
      render: (options: Option[]) => options.map(opt => opt.option).join(', ')
    },
    {
      title: 'Action',
      key: 'action',
      render: (text: any, record: QuestionType) => (
        <span>
          <Button type="link" onClick={() => { setEditingQuestion(record); setVisible(true); form.setFieldsValue({ ...record, options: record.options?.map(option => ({ option })) }); }}>Edit</Button>
          <Button type="link" onClick={() => handleDelete(record._id!)}>Delete</Button>
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

  const onFinish = (values: QuestionType) => {
    if (editingQuestion) {
      handleUpdate(editingQuestion._id!, values);
    } else {
      handleCreate(values);
    }
  };

  return (
    <>
      <Header />
      <Button type="primary" onClick={showModal}>Create Question</Button>
      <Table dataSource={questions} columns={columns} loading={loading} rowKey="_id" />
      <Modal
        title={editingQuestion ? 'Edit Question' : 'Create Question'}
        visible={visible}
        onCancel={handleCancel}
        footer={null}
      >
        <Form form={form} onFinish={onFinish} layout="vertical">
          <Form.Item name="questionText" label="Question Text" rules={[{ required: true, message: 'Please input the question text!' }]}>
            <Input />
          </Form.Item>
          <Form.Item name="language" label="Language" rules={[{ required: true, message: 'Please select a language!' }]}>
            <Select>
              {languages.map(language => (
                <Select.Option key={language} value={language}>{language}</Select.Option>
              ))}
            </Select>
          </Form.Item>
          <Form.List name="options">
            {(fields, { add, remove }) => (
              <>
                {fields.map(({ key, name, fieldKey, ...restField }) => (
                  <Space key={key} style={{ display: 'flex', marginBottom: 8 }} align="baseline">
                    <Form.Item
                      {...restField}
                      name={[name, 'option']}
                      fieldKey={[fieldKey ?? name]}
                      rules={[{ required: true, message: 'Missing option' }]}
                    >
                      <Input placeholder="Option" />
                    </Form.Item>
                    <Button onClick={() => remove(name)}>
                      Remove
                    </Button>
                  </Space>
                ))}
                <Form.Item>
                  <Button type="dashed" onClick={() => add()} block icon={<PlusOutlined />}>
                    Add Option
                  </Button>
                </Form.Item>
              </>
            )}
          </Form.List>
          <Form.Item name="correctOption" label="Correct Option" rules={[{ required: true, message: 'Please select the correct option!' }]}>
            <Input placeholder="Correct Option" />
          </Form.Item>
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

export default AdminPanel;
