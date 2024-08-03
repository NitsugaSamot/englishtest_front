// src/components/Header.tsx
import React from 'react';
import { Layout, Menu, Typography } from 'antd';
import Image from 'next/image';
import Link from 'next/link';

const { Header: AntHeader } = Layout;
const { Title } = Typography;

const Header: React.FC = () => {
  return (
    <AntHeader style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0 20px' }}>
      <div style={{ display: 'flex', alignItems: 'center' }}>
        <Image src="/images/QVitaeLogo.png" alt="QVitae Logo" width={50} height={50} />
        <Title level={3} style={{ color: 'white', margin: '0 20px' }}>QVitae</Title>
      </div>
      <Menu theme="dark" mode="horizontal" defaultSelectedKeys={['test']}>
        <Menu.Item key="test">
          <Link href="/test">
            Test
          </Link>
        </Menu.Item>
        <Menu.Item key="adminpanel">
          <Link href="/adminpanel">
            Admin Panel
          </Link>
        </Menu.Item>
        <Menu.Item key="logout">
          Logout
        </Menu.Item>
      </Menu>
    </AntHeader>
  );
};

export default Header;
