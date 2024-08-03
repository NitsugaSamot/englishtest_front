import React from 'react';
import { Form, Input, Button, message } from 'antd';
import axios from 'axios';
import config from '@/config/config';

const LoginForm = () => {
  const onFinish = async (values: any) => {
    console.log('Form values:', values); 

    try {
      const response = await axios.post(`${config.WEB_API_URL}/api/auth/login`, values);
      console.log('Login successful:', response.data);

      localStorage.setItem('token', response.data.token);

      window.location.href = '/test';
    } catch (error) {
      message.error('Login failed. Please check your email and password.');
    }
  };

  return (
    <div style={{ maxWidth: '400px', margin: '0 auto', padding: '50px' }}>
      <Form
        name="login"
        initialValues={{ remember: true }}
        onFinish={onFinish}
        layout="vertical"
      >
        <Form.Item
          label="Email"
          name="email"
          rules={[{ required: true, message: 'Please input your email!' }]}
        >
          <Input type="email" placeholder="Email" />
        </Form.Item>

        <Form.Item
          label="Password"
          name="password"
          rules={[{ required: true, message: 'Please input your password!' }]}
        >
          <Input.Password placeholder="Password" />
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit">
            Login
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default LoginForm;
