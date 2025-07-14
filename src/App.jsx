import React, { Fragment, useEffect, Suspense } from 'react';
import { Route, Switch, withRouter, Redirect } from 'react-router-dom';
import { connect, Provider } from 'react-redux';
import { create } from 'jss';
import rtl from 'jss-rtl';
import { createMuiTheme } from '@material-ui/core/styles';
import { StylesProvider, ThemeProvider, jssPreset } from '@material-ui/styles';
import './App.scss';
import Login from './pages/auth/Login';
import AdvertisesPage from './pages/AdvertisesPage';
import AdvertiseDetailPage from './pages/AdvertiseDetailPage';
import CategoriesPage from './pages/CategoriesPage';
import PrivateRoute from './components/routing/PrivateRoute';
import store from './store';
import { checkAuthentication } from './store/actions/auth';
import { setAuthToken } from './helpers/axios';

const jss = create({ plugins: [...jssPreset().plugins, rtl()] });

const theme = createMuiTheme({ direction: 'rtl' });

setAuthToken(localStorage.token);

const App = () => {
  useEffect(() => {
    store.dispatch(checkAuthentication());
  }, []);

  const routes = (
    <Switch>
      <PrivateRoute exact path="/" component={AdvertisesPage} />
      <Route exact path="/login" component={Login} />
      <PrivateRoute exact path="/advertises" component={AdvertisesPage} />
      <PrivateRoute exact path="/categories" component={CategoriesPage} />
      <PrivateRoute
        exact
        path="/advertise/:id"
        component={AdvertiseDetailPage}
      />
    </Switch>
  );

  return (
    <StylesProvider jss={jss}>
      <ThemeProvider theme={theme}>
        <Fragment>{routes}</Fragment>
      </ThemeProvider>
    </StylesProvider>
  );
};

export default withRouter(App);
