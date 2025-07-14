import React from 'react';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import { editCategory } from '../../store/actions/category';
import { connect } from 'react-redux';
import DialogTitle from '@material-ui/core/DialogTitle';
import Slide from '@material-ui/core/Slide';
import ClipLoader from 'react-spinners/ClipLoader';
import { useFormik } from 'formik';
import * as Yup from 'yup';

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="down" ref={ref} {...props} />;
});

const CategoryEditDialog = ({
  handleClose,
  open,
  order,
  title,
  id,
  editCategory,
  editing,
}) => {
  const initialValues = {
    title: title ? title.toString() : '',
    order: order ? order.toString() : '',
  };

  const EditSchema = Yup.object().shape({
    title: Yup.string().required('عنوان اجباری می باشد'),
    order: Yup.string().required('اولویت اجباری می باشد'),
  });
  const formik = useFormik({
    enableReinitialize: true,
    initialValues,
    validationSchema: EditSchema,
    onSubmit: (values, { setStatus, setSubmitting }) => {
      editCategory(id, values.title, values.order)
        .then((resp) => {
          setSubmitting(false);
          handleClose();
        })
        .catch(() => {
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
          ویرایش دسته بندی
        </span>
      </DialogTitle>
      <DialogContent>
        <DialogContentText>
          <form onSubmit={formik.handleSubmit} className="form">
            <div className="form-group">
              <input
                className="form-control font-size-14"
                name="title"
                id="title"
                type="text"
                style={{ fontFamily: 'IRANSans' }}
                placeholder="عنوان"
                {...formik.getFieldProps('title')}
              ></input>
              {formik.touched.title && formik.errors.title ? (
                <div
                  className="text-danger text-right font-size-12 mt-2"
                  style={{ fontFamily: 'IRANSans' }}
                >
                  {formik.errors.title}
                </div>
              ) : null}
            </div>
            <div className="form-group">
              <input
                className="form-control font-size-14"
                name="order"
                id="order"
                value={title}
                type="number"
                style={{ fontFamily: 'IRANSans' }}
                placeholder="اولویت"
                {...formik.getFieldProps('order')}
              ></input>
              {formik.touched.order && formik.errors.order ? (
                <div
                  className="text-danger text-right font-size-12 mt-2"
                  style={{ fontFamily: 'IRANSans' }}
                >
                  {formik.errors.order}
                </div>
              ) : null}
            </div>
            <div className="d-flex w-100 justify-content-start mt-4">
              <button className="btn btn-primary font-size-14">
                <span
                  className={`${editing ? 'ml-2' : ''}`}
                  style={{ fontFamily: 'IRANSans' }}
                >
                  ویرایش
                </span>
                {editing && (
                  <ClipLoader color="#fff" loading={editing} size={20} />
                )}
              </button>
            </div>
          </form>
        </DialogContentText>
      </DialogContent>
    </Dialog>
  );
};

const mapStateToProps = (state) => {
  return {
    editing: state.advertise.editing,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    editCategory: (id, title, order) =>
      dispatch(editCategory(id, title, order)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(CategoryEditDialog);
