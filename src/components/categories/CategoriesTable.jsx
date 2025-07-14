import React, { useState } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { removeCategory } from '../../store/actions/category';
import CheckCircleOutlineRoundedIcon from '@material-ui/icons/CheckCircleOutlineRounded';
import ErrorOutlineRoundedIcon from '@material-ui/icons/ErrorOutlineRounded';
import DeleteRoundedIcon from '@material-ui/icons/DeleteRounded';
import VisibilityRoundedIcon from '@material-ui/icons/VisibilityRounded';
import CheckRoundedIcon from '@material-ui/icons/CheckRounded';
import ClearRoundedIcon from '@material-ui/icons/ClearRounded';
import { ToastContainer, toast } from 'react-toastify';
import LooksOneIcon from '@material-ui/icons/LooksOne';
import IndeterminateCheckBoxRoundedIcon from '@material-ui/icons/IndeterminateCheckBoxRounded';
import EditRoundedIcon from '@material-ui/icons/EditRounded';
import CategoryDeleteDialog from './CategoryDeleteDialog';
import CategoryEditDialog from './CategoryEditDialog';
import Loading from '../partials/Loading';

const CategoriesTable = ({ categories, loading, removeCategory }) => {
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const [openEditDialog, setOpenEditDialog] = useState(false);

  const [id, setId] = useState(null);
  const [title, setTitle] = useState(null);
  const [order, setOrder] = useState(null);

  const handleClickOpenDeleteDialog = (categoryId) => {
    setId(categoryId);
    setOpenDeleteDialog(true);
  };

  const handleCloseDeleteDialog = () => {
    setOpenDeleteDialog(false);
  };
  const handleClickOpenEditDialog = (categoryId, title, order) => {
    setId(categoryId);
    setOrder(order);
    setTitle(title);
    setOpenEditDialog(true);
  };

  const handleCloseEditDialog = () => {
    setOpenEditDialog(false);
  };

  const removeCat = (id) => {
    removeCategory(id).then((_) => {
      handleCloseDeleteDialog();
      toast.success('دسته بندی با موفقیت حذف شد', {
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
            <th>نام دسته بندی</th>
            <th>اولویت</th>
            <th>دسته بندی مادر</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {loading ? (
            <tr>
              <td></td>
              <td>
                <Loading loading={loading} color="#1e1e2d" />
              </td>
              <td></td>
            </tr>
          ) : (
            categories.map((category, index) => {
              return (
                <tr key={index}>
                  <td className="text-right font-size-14 text-gray">
                    {category.title}
                  </td>
                  <td className="text-right font-size-14 text-gray">
                    {category.order === 1 ? (
                      <LooksOneIcon
                        style={{ color: '#3f51b5', fontSize: 18 }}
                      />
                    ) : (
                      category.order
                    )}
                  </td>
                  <td className="text-right font-size-14 text-gray">
                    {category.parent_category.length ? (
                      category.parent_category[0].title
                    ) : (
                      <IndeterminateCheckBoxRoundedIcon
                        style={{ color: '#3f51b5', fontSize: 18 }}
                      />
                    )}
                  </td>
                  <td className="text-right">
                    <div className="d-flex">
                      <button
                        onClick={(_) =>
                          handleClickOpenEditDialog(
                            category._id,
                            category.title,
                            category.order,
                          )
                        }
                        className="btn btn-icon btn-light ml-3"
                      >
                        <EditRoundedIcon
                          style={{ color: '#3f51b5', fontSize: 18 }}
                        />
                      </button>

                      <button
                        onClick={(_) =>
                          handleClickOpenDeleteDialog(category._id)
                        }
                        className="btn btn-icon btn-light"
                      >
                        <DeleteRoundedIcon
                          style={{ color: '#ff0015', fontSize: 18 }}
                        />
                      </button>
                    </div>
                  </td>
                </tr>
              );
            })
          )}
        </tbody>
      </table>
      <CategoryDeleteDialog
        handleClose={handleCloseDeleteDialog}
        open={openDeleteDialog}
        removeCategory={removeCat}
        id={id}
      />
      <CategoryEditDialog
        handleClose={handleCloseEditDialog}
        open={openEditDialog}
        id={id}
        order={order}
        title={title}
      />
      <ToastContainer rtl />
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    categories: state.category.categories,
    loading: state.category.loading,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    removeCategory: (id) => dispatch(removeCategory(id)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(CategoriesTable);
