'use client'
import React, { useEffect, useState } from 'react';
import { Table, Button, Modal, Form, Input, message, Space, Select } from 'antd';
import { LongTextQuestionType } from '@/types';
import { PlusOutlined } from '@ant-design/icons';
import { 
  fetchLongTextQuestions, 
  createLongTextQuestion, 
  updateLongTextQuestion, 
  deleteLongTextQuestion 
} from '@/api/longTextQuestion';

const AdminThirdSection = () => {
  const [questions, setQuestions] = useState<LongTextQuestionType[]>([]);
  const [loading, setLoading] = useState(false);
  const [visible, setVisible] = useState(false);
  const [form] = Form.useForm();
  const [editingQuestion, setEditingQuestion] = useState<LongTextQuestionType | null>(null);

  useEffect(() => {
    const loadData = async () => {
      try {
        setLoading(true);
        const questionsData = await fetchLongTextQuestions();
        setQuestions(questionsData);
      } catch (error) {
        console.error('Error loading data:', error);
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, []);

  const handleCreate = async (values: LongTextQuestionType) => {
    try {
      await createLongTextQuestion(values);
      message.success('Question created successfully');
      const questionsData = await fetchLongTextQuestions();
      setQuestions(questionsData);
      setVisible(false);
      form.resetFields();
    } catch (error) {
      message.error('Failed to create question. Please try again.');
    }
  };

  const handleUpdate = async (id: string, values: LongTextQuestionType) => {
    try {
      await updateLongTextQuestion(id, values);
      message.success('Question updated successfully');
      const questionsData = await fetchLongTextQuestions();
      setQuestions(questionsData);
      setVisible(false);
      form.resetFields();
    } catch (error) {
      message.error('Failed to update question. Please try again.');
    }
  };

  const handleDelete = async (id: string) => {
    try {
      await deleteLongTextQuestion(id);
      message.success('Question deleted successfully');
      const questionsData = await fetchLongTextQuestions();
      setQuestions(questionsData);
    } catch (error) {
      message.error('Failed to delete question. Please try again.');
    }
  };

  const columns = [
    { title: 'Category', dataIndex: 'category', key: 'category' },
    {
      title: 'Paragraphs',
      dataIndex: 'paragraphs',
      key: 'paragraphs',
      render: (paragraphs: { text: string }[]) => paragraphs.map(p => p.text).join(', ')
    },
    {
      title: 'Related Questions',
      dataIndex: 'relatedQuestions',
      key: 'relatedQuestions',
      render: (relatedQuestions: { text: string }[]) => relatedQuestions.map(q => q.text).join(', ')
    },
    {
      title: 'Action',
      key: 'action',
      render: (text: any, record: LongTextQuestionType) => (
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

  const onFinish = (values: LongTextQuestionType) => {
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
      >
        <Form form={form} onFinish={onFinish} layout="vertical">
          <Form.Item name="category" label="Category" rules={[{ required: true, message: 'Please input the category!' }]}>
            <Input />
          </Form.Item>
          <Form.List name="paragraphs">
            {(fields, { add, remove }) => (
              <>
                {fields.map(({ key, name, fieldKey, ...restField }) => (
                  <Space key={key} style={{ display: 'flex', marginBottom: 8 }} align="baseline">
                    <Form.Item
                      {...restField}
                      name={[name, 'text']}
                      fieldKey={[fieldKey ?? name, 'text']}
                      rules={[{ required: true, message: 'Please input the paragraph text!' }]}
                    >
                      <Input.TextArea placeholder="Paragraph Text" />
                    </Form.Item>
                    <Button onClick={() => remove(name)}>Remove</Button>
                  </Space>
                ))}
                <Form.Item>
                  <Button type="dashed" onClick={() => add()} block icon={<PlusOutlined />}>
                    Add Paragraph
                  </Button>
                </Form.Item>
              </>
            )}
          </Form.List>
          <Form.List name="relatedQuestions">
            {(fields, { add, remove }) => (
              <>
                {fields.map(({ key, name, fieldKey, ...restField }) => (
                  <Space key={key} style={{ display: 'flex', marginBottom: 8 }} align="baseline">
                    <Form.Item
                      {...restField}
                      name={[name, 'text']}
                      fieldKey={[fieldKey ?? name, 'text']}
                      rules={[{ required: true, message: 'Please input the related question text!' }]}
                    >
                      <Input placeholder="Related Question Text" />
                    </Form.Item>
                    <Form.List name={[name, 'options']}>
                      {(optionFields, { add: addOption, remove: removeOption }) => (
                        <>
                          {optionFields.map(({ key: optionKey, name: optionName, fieldKey: optionFieldKey, ...restOptionField }) => (
                            <Space key={optionKey} style={{ display: 'flex', marginBottom: 8 }} align="baseline">
                              <Form.Item
                                {...restOptionField}
                                name={[optionName, 'text']}
                                fieldKey={[optionFieldKey ?? optionName, 'text']}
                                rules={[{ required: true, message: 'Please input the option text!' }]}
                              >
                                <Input placeholder="Option Text" />
                              </Form.Item>
                              <Form.Item
                                {...restOptionField}
                                name={[optionName, 'isCorrect']}
                                fieldKey={[optionFieldKey ?? optionName, 'isCorrect']}
                                valuePropName="checked"
                              >
                                <Select placeholder="Is Correct">
                                  <Select.Option value={true}>True</Select.Option>
                                  <Select.Option value={false}>False</Select.Option>
                                </Select>
                              </Form.Item>
                              <Button onClick={() => removeOption(optionName)}>Remove</Button>
                            </Space>
                          ))}
                          <Form.Item>
                            <Button type="dashed" onClick={() => addOption()} block icon={<PlusOutlined />}>
                              Add Option
                            </Button>
                          </Form.Item>
                        </>
                      )}
                    </Form.List>
                    <Button onClick={() => remove(name)}>Remove</Button>
                  </Space>
                ))}
                <Form.Item>
                  <Button type="dashed" onClick={() => add()} block icon={<PlusOutlined />}>
                    Add Related Question
                  </Button>
                </Form.Item>
              </>
            )}
          </Form.List>
          <Form.Item>
            <Button type="primary" htmlType="submit">
              {editingQuestion ? 'Update' : 'Create'}
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};

export default AdminThirdSection;
