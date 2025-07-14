import React from 'react';
import { NavLink } from 'react-router-dom';
import FeaturedPlayListOutlinedIcon from '@material-ui/icons/FeaturedPlayListOutlined';
import DynamicFeedOutlinedIcon from '@material-ui/icons/DynamicFeedOutlined';
import logo from '../../assets/images/logo.png';

const Aside = () => {
  return (
    <div className="aside d-flex flex-column flex-row-auto">
      <div className="aside__top">
        <span className="text-white font-size-22 font-weight-medium">
          <img className="max-h-55px" src={logo} alt="logo" />
        </span>
      </div>
      <div className="aside__menu">
        <nav className="aside__menu-nav">
          <NavLink
            exact
            className="aside__menu-item"
            activeClassName="aside__menu-item-active"
            to="/"
          >
            <span>
              <FeaturedPlayListOutlinedIcon style={{ color: '#a2a3b7' }} />
              آگهی ها
            </span>
          </NavLink>
          <NavLink
            activeClassName="aside__menu-item-active"
            to="/categories"
            className="aside__menu-item"
          >
            <DynamicFeedOutlinedIcon style={{ color: '#a2a3b7' }} />
            دسته بندی ها
          </NavLink>
        </nav>
      </div>
    </div>
  );
};

export default Aside;
