import React, { useState } from 'react';
import { connect } from 'react-redux';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import { rejectAd } from '../../store/actions/advertise';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import { ToastContainer, toast } from 'react-toastify';
import Slide from '@material-ui/core/Slide';
import { useFormik } from 'formik';
import * as Yup from 'yup';

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="down" ref={ref} {...props} />;
});

const AdvertiseRejectDialog = ({ handleClose, open, id }) => {
  const [loading, setLoading] = useState(false);

  const initialValues = {
    cause: '',
  };

  const enableLoading = () => {
    setLoading(true);
  };

  const disableLoading = () => {
    setLoading(false);
  };

  const RejectSchema = Yup.object().shape({
    cause: Yup.string().required('علت رد کردن آگهی اجباری می باشد'),
  });
  const formik = useFormik({
    initialValues,
    validationSchema: RejectSchema,
    onSubmit: (values, { setStatus, setSubmitting }) => {
      enableLoading();
      rejectAd(values.cause)
        .then((resp) => {
          toast.success('آگهی با موفقیت رد شد', {
            position: 'bottom-center',
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          });
          if (resp.data.message.status === 1003) {
            toast.error(resp.data.message.text_fa, {
              position: 'bottom-center',
              autoClose: 5000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
            });
          }
          disableLoading();
          setSubmitting(false);
        })
        .catch(() => {
          disableLoading();
          toast.error('خطا', {
            position: 'bottom-center',
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          });
          setSubmitting(false);
        });
    },
  });
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
          رد کردن آگهی
        </span>
      </DialogTitle>
      <DialogContent>
        <DialogContentText>
          <form onSubmit={formik.handleSubmit} className="form">
            <textarea
              className="form-control font-size-14"
              name="cause"
              id="cause"
              style={{ fontFamily: 'IRANSans' }}
              placeholder="قیمت اشتباه، دسته بندی نامناسب، عکس های بدون تطابق به عنوان و ..."
              cols="30"
              rows="5"
              {...formik.getFieldProps('cause')}
            ></textarea>
            {formik.touched.cause && formik.errors.cause ? (
              <div
                className="text-danger text-right font-size-12 mt-2"
                style={{ fontFamily: 'IRANSans' }}
              >
                {formik.errors.cause}
              </div>
            ) : null}

            <div className="d-flex w-100 justify-content-start mt-4">
              <button className="btn btn-primry font-size-14">
                <span style={{ fontFamily: 'IRANSans' }}>رد کردن</span>
              </button>
            </div>
          </form>
        </DialogContentText>
      </DialogContent>
    </Dialog>
  );
};

export default AdvertiseRejectDialog;
