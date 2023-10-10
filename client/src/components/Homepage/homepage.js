import { Layout } from 'antd';
import React from 'react';
import CreatePost from './createpost';
const { Content } = Layout;

function HomePage(props) {

  return (
    <Content>
      <div className="site-layout-content">
        <div className="home-content">
          <div className="home-text">
            <h1>Welcome!</h1>
            <p>
              Welcome to <em>CIS 557 Deployment Demo</em>. To log in, click{' '}
            </p>
            <CreatePost />
          </div>
        </div>
      </div>
    </Content>
  );
}

export default HomePage;
