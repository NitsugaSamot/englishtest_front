'use client'
import React, { useState } from 'react';
import { Modal } from 'antd';
import Image from 'next/image';
import LoginForm from '@/components/login/Login';
import styles from './styles.module.css';

const Home = () => {
  const [modalVisible, setModalVisible] = useState(false);

  const handleLoginClick = () => {
    setModalVisible(true);
  };

  const handleCancel = () => {
    setModalVisible(false);
  };

  return (
    <div className={styles.container}>
      <div className={styles.logo}>
        <Image src="/images/QVItaeLogo.png" alt="Logo" width={100} height={100} />
      </div>
      <div className={styles.content}>
        <Image src="/images/filter.jpg" alt="Filter" className={styles.filterImage} width={300} height={300} />
        <Image src="/images/test.png" alt="Test" className={styles.testImage} width={300} height={300} />
      </div>
      <button className={styles.loginButton} onClick={handleLoginClick}>
        Iniciar Sesión
      </button>

      <Modal
        title="Iniciar Sesión"
        visible={modalVisible}
        onCancel={handleCancel}
        footer={null} 
      >
        <LoginForm />
      </Modal>
    </div>
  );
};

export default Home;
