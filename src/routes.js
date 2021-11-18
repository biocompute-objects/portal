// src/routes.js

import React from 'react';
import { Navigate } from 'react-router-dom';
import AccountView from 'src/views/account/AccountView';
import BuilderView from 'src/views/builder/BuilderView';
import HomeView from 'src/views/home/HomeView';
import LoginView from 'src/views/auth/LoginView';
import MainLayout from 'src/layouts/MainLayout';
import ObjectsListView from 'src/views/objects/ObjectsListView';
import ObjectView from 'src/views/objects/ObjectView';
import ObjectViewLayout from 'src/layouts/ObjectViewLayout';
import RegisterView from 'src/views/auth/RegisterView';
import ValidatorView from 'src/views/validator/ValidatorView';
import Community from 'src/views/community/Community';
import Resources from 'src/views/resources/Resources';
import Permissions from 'src/views/permissions/PermissionView';

// Routing rules are given at https://github.com/snd/url-pattern

const routes = () => {
  let isLoggedIn = false;

  if (localStorage.getItem('token')) {
    isLoggedIn = true;
  }

  return [
    {
      path: '/',
      element: <MainLayout />,
      children: [
        { path: '', element: <HomeView /> },
        { path: 'account', element: isLoggedIn ? <AccountView /> : <Navigate to="/login" /> },
        { path: 'objects', element: <ObjectsListView /> },
        {
          path: 'documentation',
          element: <Navigate to="https://docs.biocomputeobject.org/" />
        },
        { path: 'resources', element: <Resources /> },
        {/* path: 'community', element: <Community /> */},
        { path: 'validator', element: <ValidatorView /> },
        { path: 'permissions', element: <Permissions />}
      ]
    },
    {
      path: 'objects/view',
      element: <ObjectViewLayout />,
      children: [
        { path: '*', element: <ObjectView /> }
      ]
    },
    {
      path: '/',
      element: <MainLayout />,
      children: [
        { path: '', element: <MainLayout /> }
      ]
    },
    {
      path: '/builder',
      element: <MainLayout />,
      children: [
        { path: '', element: <BuilderView /> },
        { path: '*', element: <BuilderView /> }
      ]
    },
    {
      path: '/',
      element: <MainLayout />,
      children: [
        { path: 'login', element: <LoginView /> },
        { path: 'register', element: <RegisterView /> }
      ]
    },
    {
      path: '/',
      element: <MainLayout />,
      children: [
        { path: '404', element: isLoggedIn ? <Navigate to="/" /> : <Navigate to="/login" /> },
        { path: '*', element: isLoggedIn ? <Navigate to="/" /> : <Navigate to="/login" /> }
      ]
    }
  ];
};

export default routes;
