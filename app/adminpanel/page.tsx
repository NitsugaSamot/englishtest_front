'use client';

import { useState } from 'react';
import Header from '@/components/header/Header';
import AdminFirstSection from '@/components/adminpanel/questions/AdminFirstSection';
import AdminTwoSection from '@/components/adminpanel/questions/AdminTwoSection';
import { Menu } from 'antd';

const { Item } = Menu;

const AdminPanel = () => {
  const [activeSection, setActiveSection] = useState('1');

  const renderContent = () => {
    switch (activeSection) {
      case '1':
        return <AdminFirstSection />;
      case '2':
        return <AdminTwoSection />;
      default:
        return <AdminFirstSection />;
    }
  };

  return (
    <>
      <Header />
      <div style={{ display: 'flex' }}>
        <Menu
          mode="inline"
          selectedKeys={[activeSection]}
          style={{ width: 256 }}
          onClick={({ key }) => setActiveSection(key)}
        >
          <Item key="1">First Section</Item>
          <Item key="2">Second Section</Item>
        </Menu>
        <div style={{ flex: 1, padding: '16px' }}>
          {renderContent()}
        </div>
      </div>
    </>
  );
};

export default AdminPanel;
