import { Layout } from 'antd';
import React from 'react';
const { Content } = Layout;

function HomePage(props) {

  const user = props;

  return (
    <Content>
      <div className="site-layout-content">
        <div className="home-content">
          <div className="home-text">
            <h1>
              Welcome {user.username}!
            </h1>
            <h3>Here's a dog!</h3>
          </div>
        </div>
      </div>
    </Content>
  );
}

export default HomePage;