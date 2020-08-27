import React from 'react';
import { Menu } from 'antd';

function LeftMenu(props) {
  return (
    <Menu mode={props.mode}>
      <Menu.Item key="mail">
        <a href="/" style={{fontWeight: 'bold'}}>Home</a>
      </Menu.Item>
      <Menu.Item key="list">
        <a href="/shoplist" style={{fontWeight: 'bold'}}>List</a>
      </Menu.Item>
    </Menu>
  )
}

export default LeftMenu