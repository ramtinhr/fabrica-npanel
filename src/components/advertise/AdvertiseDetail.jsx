import React, { useState, useEffect, Fragment } from 'react';
import { useParams } from 'react-router-dom';
import { withRouter } from 'react-router';
import { fetchDetail } from '../../store/actions/advertise';
import { connect } from 'react-redux';
import Loading from '../partials/Loading';
import AwesomeSlider from 'react-awesome-slider';
import 'react-awesome-slider/dist/styles.css';
import placeholder from '../../assets/images/big_placeholder.png';

const AdvertiseDetail = ({ loading, fetchDetail, advertise }) => {
  let { id } = useParams();
  useEffect(() => {
    fetchDetail(id);
  }, [fetchDetail]);

  let advertiseEl = <Loading loading={loading} color="#1e1e2d" />;
  if (!loading && advertise) {
    advertiseEl = (
      <Fragment>
        <div className="advertise__detail">
          <div className="row">
            <div className="col-4">
              <div className="advertise__detail-content">
                <div className="d-flex justify-content-between align-items-center mb-4">
                  <span className="font-size-14">قیمت</span>
                  <span className="font-size-14 text-muted">
                    {advertise.price}
                  </span>
                </div>
                <div className="d-flex justify-content-between align-items-center my-4">
                  <span className="font-size-14">نوع آگهی</span>
                  <span className="font-size-14 text-muted">
                    {advertise.ad_type_fa}
                  </span>
                </div>
                <div className="d-flex justify-content-between align-items-center my-4">
                  <span className="font-size-14">نام آگهی دهنده</span>
                  <span className="font-size-14 text-muted">
                    {advertise.user.full_name || ''}
                  </span>
                </div>
                <div className="d-flex justify-content-between align-items-center mt-4">
                  <span className="font-size-14">شماره موبایل آگهی دهنده</span>
                  <span className="font-size-14 text-muted">
                    {advertise.user.mobile_number || ''}
                  </span>
                </div>
                <div className="d-flex justify-content-between align-items-center mt-4">
                  <span className="font-size-14">شهر آگهی دهنده</span>
                  <span className="font-size-14 text-muted">
                    {advertise.city.title} - {advertise.city.state}
                  </span>
                </div>
              </div>
              <div className="d-flex justify-content-between align-items-start flex-column mt-4">
                <span className="font-size-16 font-weight-bold mb-2 text-right">
                  توضیحات
                </span>
                <span className="font-size-14 text-muted text-right">
                  {advertise.description}
                </span>
              </div>
            </div>
            <div className="col-8">
              <div className="advertise__detail-content">
                <div className="d-flex justify-content-between align-items-center mb-3">
                  <span className="font-size-14">عنوان آگهی</span>
                  <span className="font-size-14 text-muted">
                    {advertise.title}
                  </span>
                </div>
                <div className="d-flex justify-content-between align-items-center mt-3">
                  <span className="font-size-14">دسته بندی </span>
                  <span className="font-size-14 text-muted">
                    {advertise.category_ids.map((category) => {
                      return category.title + ' ';
                    })}
                  </span>
                </div>
              </div>
              <div className="d-flex my-4">
                {advertise.image_urls ? (
                  <AwesomeSlider>
                    {advertise.image_urls.map((imgUrl) => {
                      return <div data-src={imgUrl} />;
                    })}
                  </AwesomeSlider>
                ) : (
                  <img
                    src={placeholder}
                    className="img-fluid"
                    alt="placeholder"
                  />
                )}
              </div>
            </div>
          </div>
        </div>
      </Fragment>
    );
  }

  return (
    <div className="card card-custom card-stretch gutter-b">
      <div className="card-body p-v-35">
        <div className="tab-content">{advertiseEl}</div>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    loading: state.advertise.loading,
    advertise: state.advertise.advertise,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchDetail: (id) => dispatch(fetchDetail(id)),
  };
};

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(AdvertiseDetail),
);
