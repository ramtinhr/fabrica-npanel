import React from 'react';
import FeaturedPlayListOutlinedIcon from '@material-ui/icons/FeaturedPlayListOutlined';
import Advertises from '../components/advertise/Advertises';
import Main from '../layouts/Main';

const AdvertisesPage = () => {
  return (
    <Main
      title="مدیریت آگهی ها"
      subtitle="آگهی ها"
      icon={<FeaturedPlayListOutlinedIcon style={{ fontSize: 16 }} />}
      children={<Advertises />}
    />
  );
};

export default AdvertisesPage;
