import React, { useState } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { acceptAd, removeAd } from '../../store/actions/advertise';
import CheckCircleOutlineRoundedIcon from '@material-ui/icons/CheckCircleOutlineRounded';
import ErrorOutlineRoundedIcon from '@material-ui/icons/ErrorOutlineRounded';
import DeleteRoundedIcon from '@material-ui/icons/DeleteRounded';
import VisibilityRoundedIcon from '@material-ui/icons/VisibilityRounded';
import CheckRoundedIcon from '@material-ui/icons/CheckRounded';
import ClearRoundedIcon from '@material-ui/icons/ClearRounded';
import { ToastContainer, toast } from 'react-toastify';
import AdvertiseDeleteDialog from './AdveritseDeleteDialog';
import AdvertiseRejectDialog from './AdvertiseRejectDialog';
import Loading from '../partials/Loading';

const AdvertiseTable = ({ advertises, acceptAd, removeAd, loading }) => {
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const [openRejectDialog, setOpenRejectDialog] = useState(false);

  const [id, setId] = useState(null);

  const handleClickOpenDeleteDialog = (advertiseId) => {
    setId(advertiseId);
    setOpenDeleteDialog(true);
  };

  const handleCloseDeleteDialog = () => {
    setOpenDeleteDialog(false);
  };
  const handleClickOpenRejectDialog = (advertiseId) => {
    setId(advertiseId);
    setOpenRejectDialog(true);
  };

  const handleCloseRejectDialog = () => {
    setOpenRejectDialog(false);
  };

  const removeAdvertise = (id) => {
    removeAd(id).then((_) => {
      handleCloseDeleteDialog();
      toast.success('آگهی با موفقیت حذف شد', {
        position: 'bottom-center',
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    });
  };

  const acceptAdvertise = (id) => {
    acceptAd(id).then((_) => {
      toast.success('آگهی با موفقیت تایید شد', {
        position: 'bottom-center',
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    });
  };
  return (
    <div className="table-responsive">
      <table className="table table-head-custom table-head-bg table-borderless table-vertical-center">
        <thead>
          <tr className="text-right">
            <th>نام آگهی</th>
            <th>وضعیت</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {loading ? (
            <tr>
              <td className="w-100">
                <Loading loading={loading} color="#1e1e2d" />
              </td>
            </tr>
          ) : (
            advertises.map((advertise, index) => {
              return (
                <tr key={index}>
                  <td className="text-right font-size-14 text-gray">
                    {advertise.title}
                  </td>
                  <td className="text-right font-size-14">
                    {advertise.is_accepted ? (
                      <CheckCircleOutlineRoundedIcon
                        style={{ color: '#00ff11' }}
                      />
                    ) : (
                      <ErrorOutlineRoundedIcon style={{ color: '#fc9f00' }} />
                    )}
                  </td>
                  <td className="text-right">
                    <div className="d-flex">
                      <Link exact to={`/advertise/${advertise._id}`}>
                        <button className="btn btn-icon btn-light ml-3">
                          <VisibilityRoundedIcon
                            style={{ color: '#3f51b5', fontSize: 18 }}
                          />
                        </button>
                      </Link>
                      <button
                        onClick={(_) =>
                          handleClickOpenDeleteDialog(advertise._id)
                        }
                        className={`btn btn-icon btn-light ${
                          !advertise.is_accepted ? 'ml-3' : ''
                        }`}
                      >
                        <DeleteRoundedIcon
                          style={{ color: '#ff0015', fontSize: 18 }}
                        />
                      </button>
                      {!advertise.is_accepted ? (
                        <button
                          onClick={(_) => acceptAdvertise(advertise._id)}
                          className="btn btn-icon btn-light ml-3"
                        >
                          <CheckRoundedIcon
                            style={{ color: '#3f51b5', fontSize: 18 }}
                          />
                        </button>
                      ) : null}
                      {!advertise.is_accepted ? (
                        <button
                          onClick={(_) => handleClickOpenRejectDialog()}
                          className="btn btn-icon btn-light"
                        >
                          <ClearRoundedIcon
                            style={{ color: '#3f51b5', fontSize: 18 }}
                          />
                        </button>
                      ) : null}
                    </div>
                  </td>
                </tr>
              );
            })
          )}
        </tbody>
      </table>
      <AdvertiseDeleteDialog
        handleClose={handleCloseDeleteDialog}
        open={openDeleteDialog}
        removeAd={removeAdvertise}
        id={id}
      />
      <AdvertiseRejectDialog
        handleClose={handleCloseRejectDialog}
        open={openRejectDialog}
        id={id}
      />
      <ToastContainer rtl />
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    advertises: state.advertise.advertises,
    loading: state.advertise.loading,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    acceptAd: (id) => dispatch(acceptAd(id)),
    removeAd: (id) => dispatch(removeAd(id)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(AdvertiseTable);
