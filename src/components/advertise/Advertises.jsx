import React, { useEffect, useState, Fragment } from 'react';
import { connect } from 'react-redux';
import { fetchAds } from '../../store/actions/advertise';
import AdvertiseTable from './AdvertiseTable';
import Pagination from '@material-ui/lab/Pagination';

const Advertises = (props) => {
  const { fetchAds } = props;
  useEffect(() => {
    fetchAds(props.limit, props.page);
  }, [fetchAds, props.limit, props.page]);

  const [page, setPage] = useState(1);
  const handleChange = (event, value) => {
    setPage(value);
    fetchAds(props.limit, value);
  };

  return (
    <div className="card card-custom card-stretch gutter-b">
      <div className="card-body p-v-35">
        <div className="tab-content">
          <Fragment>
            <AdvertiseTable />
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
    loading: state.advertise.loading,
    limit: state.advertise.limit,
    page: state.advertise.page,
    count: state.advertise.count,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchAds: (limit, page) => dispatch(fetchAds(limit, page)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Advertises);
