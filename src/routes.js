// src/routes.js

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
import Documentation from 'src/views/documentation/Documentation';
import Community from 'src/views/community/Community';
import Resources from 'src/views/resources/Resources';

// Routing rules are given at https://github.com/snd/url-pattern

const routes = () => {
	var isLoggedIn = false
	if(localStorage.getItem('token')) {
		isLoggedIn = true 
	}
	console.log('message',isLoggedIn);	
  return [
	  {
      path: '/',
      element: <MainLayout /> ,
      children: [
        { path: '', element: <Navigate to="/dashboard" /> },
        { path: 'account', element: isLoggedIn ? <AccountView /> : <Navigate to="/login" /> },
        { path: 'objects', element: <ObjectsListView /> },
        { path: 'documentation', element: <Documentation />, children:[
            { path: '', element: ''}
          ]
        },
        { path: 'resources', element: <Resources />, children:[
            { path: '', element: ''}
          ]
        },
        { path: 'documentation', element: <Documentation />, children:[
            { path: '', element: ''}
          ]
        },
        { path: 'community', element: <Community /> },
        { path: 'validator', element: <ValidatorView /> }
      ]
    },
    {
      path: '/',
      element: <DashboardLayout />,
      children: [
        { path: 'dashboard', element: <HomeView /> },
        { path: '', element: <Navigate to="/dashboard" /> }
      ]
    },
    {
      path: '/builder',
      element: <MainLayout />,
      children: [
        { path: '*', element: <BuilderView /> }
      ]
    },
    {
      path: '/',
      element: <ObjectViewLayout /> ,
      children: [
        { path: ':prefix_:id/:id2.:id3', element: <ObjectView /> }
      ]
    },
    {
      path: '/',
      element: <MainLayout />,
      children: [
        { path: 'documentation', element: <Documentation />, children:[
            { path: '', element: ''}
          ]
        },
        { path: 'login', element: <LoginView /> },
        { path: 'register', element: <RegisterView /> }
      ]
    },
    {
      path: '/',
      element: <MainLayout />,
      children: [
        { path: 'documentation', element: <Documentation />, children:[
            { path: '', element: ''}
          ]
        },
        { path: '404', element: isLoggedIn ? <Navigate to="/dashboard" /> : <Navigate to="/login" /> },
        { path: '*', element: isLoggedIn ? <Navigate to="/dashboard" /> : <Navigate to="/login" /> }
      ]
    }
  ]
};


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