import React from 'react';
import DynamicFeedOutlinedIcon from '@material-ui/icons/DynamicFeedOutlined';
import Main from '../layouts/Main';
import Categories from '../components/categories/Categories';

const CategoriesPage = () => {
  return (
    <Main
      title="مدیریت دسته بندی ها"
      subtitle="دسته بندی ها"
      icon={<DynamicFeedOutlinedIcon style={{ fontSize: 16 }} />}
      children={<Categories />}
    />
  );
};

export default CategoriesPage;
