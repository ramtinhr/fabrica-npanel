import React, { Fragment } from 'react';
import Aside from '../components/aside/Aside';
import Header from '../components/header/Header';

const Main = ({ children, title, subtitle, icon }) => {
  return (
    <div className="main">
      <Header title={title} icon={icon} subtitle={subtitle} />
      <Aside />
      <div className="d-flex flex-column-fluid">
        <div className="container">{children}</div>
      </div>
    </div>
  );
};

export default Main;
