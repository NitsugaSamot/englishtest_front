'use client';
import React, { useEffect, useState } from 'react';
import { Table, Button, Modal, Form, Input, message, Space, Checkbox } from 'antd';
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
    { title: 'Text', dataIndex: 'text', key: 'text' },
    {
      title: 'Actions',
      key: 'actions',
      render: (text: string, record: LongTextQuestionType) => (
        <Space size="middle">
          <Button onClick={() => {
            setEditingQuestion(record);
            setVisible(true);
            form.setFieldsValue(record);
          }}>Edit</Button>
          <Button danger onClick={() => handleDelete(record._id)}>Delete</Button>
        </Space>
      ),
    },
  ];

  const handleFinish = (values: LongTextQuestionType) => {
    if (editingQuestion) {
      handleUpdate(editingQuestion._id, values);
    } else {
      handleCreate(values);
    }
  };

  return (
    <>
      <Button 
        type="primary" 
        icon={<PlusOutlined />} 
        onClick={() => {
          setEditingQuestion(null);
          setVisible(true);
        }}
        style={{ marginBottom: '20px' }}
      >
        Add Question
      </Button>
      <Table columns={columns} dataSource={questions} loading={loading} rowKey="_id" />
      <Modal
        title={editingQuestion ? "Edit Question" : "Add Question"}
        visible={visible}
        onCancel={() => setVisible(false)}
        onOk={() => form.submit()}
      >
        <Form form={form} onFinish={handleFinish} layout="vertical">
          <Form.Item name="category" label="Category" rules={[{ required: true, message: 'Please input the category!' }]}>
            <Input />
          </Form.Item>
          <Form.Item name="text" label="Text" rules={[{ required: true, message: 'Please input the text!' }]}>
            <Input.TextArea />
          </Form.Item>
          <Form.List name="relatedQuestions">
            {(fields, { add, remove }) => (
              <>
                {fields.map((field, index) => (
                  <div key={field.key} style={{ marginBottom: 8 }}>
                    <Form.Item
                      {...field}
                      name={[field.name, 'text']}
                      fieldKey={[field.key, 'text']} 
                      label={`Related Question ${index + 1}`}
                      rules={[{ required: true, message: 'Please input the question!' }]}
                    >
                      <Input />
                    </Form.Item>
                    <Form.List name={[field.name, 'options']}>
                      {(optionFields, { add: addOption, remove: removeOption }) => (
                        <>
                          {optionFields.map((optionField, optionIndex) => (
                            <div key={optionField.key} style={{ display: 'flex', marginBottom: 8 }}>
                              <Form.Item
                                {...optionField}
                                name={[optionField.name, 'text']}
                                fieldKey={[optionField.key, 'text']} 
                                label={`Option ${optionIndex + 1}`}
                                rules={[{ required: true, message: 'Please input the option!' }]}
                                style={{ flex: 1 }}
                              >
                                <Input />
                              </Form.Item>
                              <Form.Item
                                {...optionField}
                                name={[optionField.name, 'isCorrect']}
                                fieldKey={[optionField.key, 'isCorrect']} 
                                valuePropName="checked"
                                initialValue={false}  
                                style={{ marginLeft: 8 }}
                              >
                                <Checkbox>Correct</Checkbox>
                              </Form.Item>
                              <Button
                                danger
                                onClick={() => removeOption(optionField.name)}
                                style={{ marginLeft: 8 }}
                              >
                                Remove
                              </Button>
                            </div>
                          ))}
                          <Form.Item>
                            <Button type="dashed" onClick={() => addOption({ text: '', isCorrect: false })}>
                              Add Option
                            </Button>
                          </Form.Item>
                        </>
                      )}
                    </Form.List>
                    <Button
                      danger
                      onClick={() => remove(field.name)}
                      style={{ marginBottom: 8 }}
                    >
                      Remove Related Question
                    </Button>
                  </div>
                ))}
                <Form.Item>
                  <Button type="dashed" onClick={() => add()}>
                    Add Related Question
                  </Button>
                </Form.Item>
              </>
            )}
          </Form.List>
        </Form>
      </Modal>
    </>
  );
};

export default AdminThirdSection;
