import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import PowerSettingsNewOutlinedIcon from '@material-ui/icons/PowerSettingsNewOutlined';
import { logout } from '../../store/actions/auth';

const Header = ({ title, subtitle, icon, logout }) => {
  return (
    <div className="header">
      <div className="w-100 d-flex justify-content-between align-items-center">
        <div className="d-flex">
          <div className="ml-5 text-dark">
            <span className="font-size-16 ml-2">{title}</span>
          </div>
          <div className="text-muted">
            {icon}
            <span className="font-size-14 mr-2">{subtitle}</span>
          </div>
        </div>
        <div onClick={logout} className="d-flex align-items-center">
          <div className="text-danger cursor-pointer">
            <span className="ml-1 font-size-14">خروج</span>
            <PowerSettingsNewOutlinedIcon style={{ fontSize: 18 }} />
          </div>
        </div>
      </div>
    </div>
  );
};

Header.propTypes = {
  logout: PropTypes.func.isRequired,
};

export default connect(null, { logout })(Header);
