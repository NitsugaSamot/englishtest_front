'use client';
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Input, Button, Typography, Space, Layout } from 'antd';
import Header from '../header/Header';
import styles from './styles.module.css'; 

const { Title, Text } = Typography;
const { Content } = Layout;

const TestIntro = () => {
  const [name, setName] = useState('');
  const router = useRouter();

  const handleStartTest = () => {
    if (name.trim()) {
      router.push('/test');
    } else {
      alert('Por favor, ingresa tu nombre.');
    }
  };

  return (
    <Layout>
        <Header/>
      <Content className={styles.content}>
        <Space direction="vertical" size="large" align="center">
          <Title level={1}>Bienvenido al Test de Inglés</Title>
          <Text>El test consistirá en tres secciones de 5 minutos cada una. Tienes un total de 15 minutos.</Text>
          <Text>Por favor, ingresa tu nombre para comenzar:</Text>
          <Input 
            type="text" 
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Tu nombre"
            className={styles.input}
          />
          <Button 
            type="primary" 
            onClick={handleStartTest}
            className={styles.button}
          >
            Comenzar Test
          </Button>
        </Space>
      </Content>
    </Layout>
  );
};

export default TestIntro;
