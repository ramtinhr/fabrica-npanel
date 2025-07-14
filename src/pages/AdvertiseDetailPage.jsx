import React from 'react';
import { connect } from 'react-redux';
import FeaturedPlayListOutlinedIcon from '@material-ui/icons/FeaturedPlayListOutlined';
import AdvertiseDetail from '../components/advertise/AdvertiseDetail';
import Main from '../layouts/Main';

const AdvertiseDetailPage = ({ advertise }) => {
  return (
    <Main
      title={advertise && advertise.title ? advertise.title : ''}
      subtitle="آگهی"
      icon={<FeaturedPlayListOutlinedIcon style={{ fontSize: 16 }} />}
      children={<AdvertiseDetail />}
    />
  );
};

const mapStateToProps = (state) => {
  return {
    advertise: state.advertise.adveritse,
  };
};

export default connect(mapStateToProps)(AdvertiseDetailPage);
