import React, { useEffect, useState, Fragment } from 'react';
import { connect } from 'react-redux';
import { fetchCategories } from '../../store/actions/category';
import CategoriesTable from './CategoriesTable';
import Pagination from '@material-ui/lab/Pagination';

const Categories = (props) => {
  const { fetchCategories } = props;
  useEffect(() => {
    fetchCategories(props.limit, props.page);
  }, [fetchCategories, props.limit, props.page]);

  const [page, setPage] = useState(1);
  const handleChange = (event, value) => {
    setPage(value);
    fetchCategories(props.limit, value);
  };

  return (
    <div className="card card-custom card-stretch gutter-b">
      <div className="card-body p-v-35">
        <div className="tab-content">
          <Fragment>
            <CategoriesTable />
            <div className="d-flex justify-content-center mt-4">
              <Pagination
                color="primary"
                count={props.count}
                page={page}
                onChange={handleChange}
              />
            </div>
          </Fragment>
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    limit: state.category.limit,
    page: state.category.page,
    count: state.category.count,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchCategories: (limit, page) => dispatch(fetchCategories(limit, page)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Categories);
