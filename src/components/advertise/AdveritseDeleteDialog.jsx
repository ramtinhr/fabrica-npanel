import React from 'react';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import { connect } from 'react-redux';
import DialogTitle from '@material-ui/core/DialogTitle';
import Slide from '@material-ui/core/Slide';
import ClipLoader from 'react-spinners/ClipLoader';

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="down" ref={ref} {...props} />;
});

const AdvertiseDeleteDialog = ({
  handleClose,
  open,
  removeAd,
  id,
  removing,
}) => {
  return (
    <Dialog
      open={open}
      TransitionComponent={Transition}
      keepMounted
      onClose={handleClose}
      aria-labelledby="alert-dialog-slide-title"
      aria-describedby="alert-dialog-slide-description"
    >
      <DialogTitle id="alert-dialog-slide-title">
        <span
          className="float-right font-size-16"
          style={{ fontFamily: 'IRANSans' }}
        >
          آیا از حذف این آگهی اطمینان دارید؟
        </span>
      </DialogTitle>
      <DialogContent>
        <DialogActions id="alert-dialog-slide-description">
          <div className="d-flex w-100 justify-content-center">
            <button onClick={handleClose} className="btn ml-4 btn-primary">
              خیر
            </button>
            <button
              onClick={(_) => removeAd(id)}
              className="btn btn-danger  align-middle d-flex justify-content-center align-items-center"
            >
              <span className={`${removing ? 'ml-2' : ''}`}>بله</span>
              {removing && (
                <ClipLoader color="#fff" loading={removing} size={20} />
              )}
            </button>
          </div>
        </DialogActions>
      </DialogContent>
    </Dialog>
  );
};

const mapStateToProps = (state) => {
  return {
    advertises: state.advertise.advertises,
    removing: state.advertise.removing,
  };
};

export default connect(mapStateToProps)(AdvertiseDeleteDialog);
