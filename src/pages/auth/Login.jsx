import { Link, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import React, { useState } from 'react';
import * as Yup from 'yup';
import logo from '../../assets/images/logo.png';
import { login } from '../../store/actions/auth';
import ClipLoader from 'react-spinners/ClipLoader';
import { ToastContainer, toast } from 'react-toastify';
import { useFormik } from 'formik';

const Login = ({ login, isAuthenticated }) => {
  const [loading, setLoading] = useState(false);
  let [color, setColor] = useState('#ffffff');

  const initialValues = {
    username: '',
    password: '',
  };

  const LoginSchema = Yup.object().shape({
    username: Yup.string()
      .min(3, 'نام کاربری باید حداقل ۳ کاراکتر باشد')
      .required('نام کاربری اجباری می باشد'),

    password: Yup.string()
      .min(3, 'نام کاربری باید حداقل ۳ کاراکتر باشد')
      .required('رمز عبور اجباری می باشد'),
  });

  const enableLoading = () => {
    setLoading(true);
  };

  const disableLoading = () => {
    setLoading(false);
  };

  const formik = useFormik({
    initialValues,
    validationSchema: LoginSchema,
    onSubmit: (values, { setStatus, setSubmitting }) => {
      enableLoading();
      login(values.username, values.password)
        .then((resp) => {
          console.log(resp);
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
          } else if (resp.data.message.status === 200) {
            toast.success('شما با موفقیت وارد شدید', {
              position: 'bottom-center',
              autoClose: 5000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
            });
          }
          setSubmitting(false);
          disableLoading();
        })
        .catch((e) => {
          console.log(e);
          disableLoading();
          setSubmitting(false);
        });
    },
  });

  if (isAuthenticated) {
    return <Redirect to="/" />;
  }

  return (
    <div className="login">
      <div className="d-flex flex-column flex-lg-row">
        <div className="login__aside d-flex">
          <div className="d-flex flex-row-fluid flex-column justify-content-between">
            <div className="d-flex justify-content-start">
              <img alt="logo" className="max-h-70px" src={logo} />
            </div>
            <div className="flex-column-fluid d-flex flex-column justify-content-center">
              <h3 className="text-white mb-5">
                به پنل ادمین فابریکا خوش آمدید
              </h3>
            </div>
          </div>
        </div>
        <div className="flex-row-fluid d-flex flex-column position-relative p-v-40 overflow-hidden bg-white">
          <div className="d-flex flex-column-fluid flex-center mt-5 mt-lg-0">
            <div className="login__form login__signin">
              <div className="text-center login__title">
                <h4>فرم ورود</h4>
                <div className="m-b-10">
                  <span className="text-muted font-size-14">
                    نام کاربری و رمز عبور خود را وارد کنید
                  </span>
                </div>
              </div>
              <form onSubmit={formik.handleSubmit} className="form">
                <div className="form-group">
                  <input
                    placeholder="نام کاربری"
                    type="text"
                    className={`form-control form-control-solid p-v-25 p-h-15 m-b-5`}
                    {...formik.getFieldProps('username')}
                  />
                  {formik.touched.username && formik.errors.username ? (
                    <div className="text-danger text-right font-size-12">
                      {formik.errors.username}
                    </div>
                  ) : null}
                </div>
                <div className="form-group">
                  <input
                    placeholder="رمز عبور"
                    type="password"
                    className={`form-control form-control-solid p-v-25 p-h-15 m-t-25`}
                    {...formik.getFieldProps('password')}
                  />
                  {formik.touched.password && formik.errors.password ? (
                    <div className="text-danger text-right font-size-12">
                      {formik.errors.password}
                    </div>
                  ) : null}
                </div>
                <div className="form-group">
                  <button
                    type="submit"
                    className="btn btn-primary p-v-10 p-h-35 m-t-25 d-flex justify-content-end align-items-center float-left"
                    sa
                    disabled={formik.isSubmitting}
                  >
                    <span className="m-l-5">ورود</span>
                    {loading && (
                      <ClipLoader color={color} loading={loading} size={20} />
                    )}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
        <ToastContainer rtl />
      </div>
    </div>
  );
};

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
});

Login.propTypes = {
  login: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool,
};

export default connect(mapStateToProps, { login })(Login);
