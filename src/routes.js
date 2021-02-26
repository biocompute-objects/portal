import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
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
import ValidatorView from 'src/views/validator/ValidatorView'


const routes = (fakeAuth) => [
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
    element: <DashboardLayout />,
    children: [
      { path: 'dashboard', element: <HomeView /> },
      { path: '', element: <Navigate to="/dashboard" /> }
    ]
  },
  {
    path: '/',
    element:  <MainLayout />,
    children: [
      { path: 'account', element:
	  					fakeAuth.isAuthenticated === true 
									? <AccountView /> 
									:  <Navigate to="/login" />},
      { path: 'objects', element:
									 fakeAuth.isAuthenticated === true 
		  							? <ObjectsListView /> 
	  								:  <Navigate to="/login" />},
      { path: 'builder', element: <BuilderView /> },
      { path: 'validator', element: <ValidatorView /> }
    ]
  },
  {
    path: '/builder',
    element: fakeAuth.isAuthenticated === true 
	  ? <MainLayout /> 
	  :  <Navigate to="/login" />,
    children: [
      { path: ':prefix_:state_:uuid', element: <BuilderView /> }
    ]
  },
  {
    path: '/',
    element: <ObjectViewLayout />,
    children: [
      { path: ':prefix_:state_:uuid', element: <ObjectView /> }
    ]
  },
  {
    path: '/',
    element: <ObjectViewLayout />,
    children: [
      { path: ':prefix_:id/:id2.:id3', element: <ObjectView /> }
    ]
  },
  {
    path: '/',
    element: <MainLayout />,
    children: [
      { path: '404', element: <Navigate to="/dashboard" />},
      { path: '*', element: <Navigate to="/dashboard" /> }
    ]
  }
];

export default routes;
