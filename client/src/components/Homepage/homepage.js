import { Layout } from 'antd';
import React from 'react';
import CreatePost from '../Post/CreatePost';

const { Content } = Layout;

function HomePage(props) {
  const { userId } = props;
  return (
    <Content>
      <div className="site-layout-content">
        <div className="home-content">
          <div className="home-text">
            <h1>Welcome!</h1>
            <p>
              Welcome to
              {' '}
              <em>CIS 557 Deployment Demo</em>
              . To log in, click
              {' '}
            </p>
            <CreatePost userId={userId} />
          </div>
        </div>
      </div>
    </Content>
  );
}

export default HomePage;
