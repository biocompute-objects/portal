import React, { useState } from 'react';
import { Navigate } from 'react-router-dom';
import AccountView from 'src/views/account/AccountView';
import BuilderView from 'src/views/builder/BuilderView';
import DashboardLayout from 'src/layouts/DashboardLayout';
import HomeView from 'src/views/home/HomeView';
import LoginView from 'src/views/auth/LoginView';
import MainLayout from 'src/layouts/MainLayout';
import ObjectsListView from 'src/views/objects/ObjectsListView';
import ObjectView from 'src/views/objects/ObjectView';
import ObjectViewLayout from 'src/layouts/ObjectViewLayout';
import RegisterView from 'src/views/auth/RegisterView';
import ValidatorView from 'src/views/validator/ValidatorView';

// Routing rules are given at https://github.com/snd/url-pattern

const routes = (isLoggedIn) => [
  {
    path: '/',
    element: isLoggedIn ? <MainLayout /> : <Navigate to="/login" />,
    children: [
      { path: 'account', element: <AccountView /> },
      { path: 'objects', element: <ObjectsListView /> },
      { path: 'builder', element: <BuilderView />, children: [
          { path: ':prefix_:state_:uuid', element: <BuilderView /> }
        ]
      },
      { path: 'validator', element: <ValidatorView /> }
    ]
  },
  {
    path: '/',
    element: isLoggedIn ? <DashboardLayout /> : <Navigate to="/login" />,
    children: [
      { path: 'dashboard', element: <HomeView /> },
      { path: '', element: <Navigate to="/dashboard" /> }
    ]
  },
  {
    path: '/',
    element: isLoggedIn ? <ObjectViewLayout /> : <Navigate to="/login" />,
    children: [
      { path: ':prefix_:id/:id2.:id3', element: <ObjectView /> }
    ]
  },
  {
    path: '/',
    element: !isLoggedIn ? <MainLayout /> : <Navigate to="/dashboard" />,
    children: [
      { path: 'login', element: <LoginView /> },
      { path: 'register', element: <RegisterView /> }
    ]
  },
  {
    path: '/',
    element: <MainLayout />,
    children: [
      { path: '404', element: <Navigate to="/login" />},
      { path: '*', element: <Navigate to="/login" /> }
    ]
  }
];


// No login.
// const routes = (isLoggedIn) => [
//   {
//     path: '/',
//     element: <Navigate to="/dashboard" />
//   },
//   {
//     path: '/',
//     element: <MainLayout />,
//     children: [
//       { path: 'account', element: <AccountView /> },
//       { path: 'objects', element: <ObjectsListView /> },
//       { path: 'builder', element: <BuilderView />, children: [
//           { path: ':prefix_:state_:uuid', element: <BuilderView /> }
//         ]
//       },
//       { path: 'validator', element: <ValidatorView /> }
//     ]
//   },
//   {
//     path: '/',
//     element: <DashboardLayout />,
//     children: [
//       { path: 'dashboard', element: <HomeView /> },
//       { path: '', element: <Navigate to="/dashboard" /> }
//     ]
//   },
//   {
//     path: '/',
//     element: <ObjectViewLayout />,
//     children: [
//       { path: ':prefix_:id/:id2.:id3', element: <ObjectView /> }
//     ]
//   },
//   {
//     path: '/',
//     element: <MainLayout />,
//     children: [
//       { path: 'login', element: <LoginView /> },
//       { path: 'register', element: <RegisterView /> }
//     ]
//   },
//   {
//     path: '/',
//     element: <MainLayout />,
//     children: [
//       { path: '404', element: <Navigate to="/login" />},
//       { path: '*', element: <Navigate to="/login" /> }
//     ]
//   }
// ];

export default routes;