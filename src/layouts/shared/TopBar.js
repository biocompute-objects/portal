// src/layouts/shared/TopBar.js

import React, { useState, useContext } from 'react';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import {
  AppBar,
  Badge,
  Button,
  Box,
  Hidden,
  IconButton,
  Toolbar,
  makeStyles
} from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';
import InputIcon from '@material-ui/icons/Input';
import Logo from 'src/components/Logo';

import {
  BarChart as BarChartIcon,
  User as UserIcon,
  Users as UsersIcon
} from 'react-feather';
import NavItem from './NavItem';


// Navigation.
const items_auth = [
  {
    href: '/dashboard',
    icon: MenuIcon,
    title: 'Home'
  },
  {
    href: '/documentation',
    icon: UserIcon,
    title: 'Documentation'
  },
  {
    href: '/resources',
    icon: UserIcon,
    title: 'Resources'
  },
  {
    href: '/community',
    icon: UserIcon,
    title: 'Community'
  },
  {
    href: '/account',
    icon: UserIcon,
    title: 'Account'
  },
  {
    href: '/objects',
    icon: UsersIcon,
    title: 'BioCompute Objects'
  }
];

const items_no_auth = [
  {
    href: '/documentation',
    icon: UserIcon,
    title: 'Documentation'
  },
  {
    href: '/login',
    icon: UserIcon,
    title: 'Log In'
  },
  {
    href: '/register',
    icon: UsersIcon,
    title: 'Register'
  },
  {
    href: '/objects',
    icon: UsersIcon,
    title: 'BioCompute Objects'
  }
];

const useStyles = makeStyles(() => ({
  root: {}
}));

function TopBar(props, { className, onMobileNavOpen, ...rest }) {
  const navigate = useNavigate();

  function Logout() {
    localStorage.clear();
    navigate('/login', { replace: true });
};

  var isLoggedIn = false
  if(localStorage.getItem('token')) {
	isLoggedIn = true 
  };
  const classes = useStyles();
  const [notifications] = useState([]);

  const logged_out_bar = (
          <Toolbar>
          <RouterLink to="/dashboard">
            <Logo />
          </RouterLink>
          <Hidden smDown>
            {items_no_auth.map((item) => (
                <NavItem
                  href={item.href}
                  key={item.title}
                  title={item.title}
                  icon={item.icon}
                />
              ))}
            <IconButton color="inherit">
              <Badge
                badgeContent={notifications.length}
                color="primary"
                variant="dot"
              >
              <InputIcon />
              </Badge>
            </IconButton>
          </Hidden>
          <Hidden mdUp>
            <IconButton
              color="inherit"
              onClick={onMobileNavOpen}
            >
              <MenuIcon />
            </IconButton>
          </Hidden>
        </Toolbar>
  );

  const logged_in_bar = (

        <Toolbar>
          <RouterLink to="/">
            <Logo />
          </RouterLink>
          <Hidden smDown>
            {items_auth.map((item) => (
                <NavItem
                  href={item.href}
                  key={item.title}
                  title={item.title}
                  icon={item.icon}
                />
            ))}
            <IconButton 
              color="inherit" 
              onClick={Logout}>
                <span>Log Out</span>
            </IconButton>
          </Hidden>
          <Hidden mdUp>
            <IconButton
              color="inherit"
              onClick={onMobileNavOpen}
            >
              <MenuIcon />
            </IconButton>
          </Hidden>
        </Toolbar>
  );
  
  return <AppBar
        className={clsx(classes.root, className)}
        elevation={0}
        {...rest}>
		{isLoggedIn ? logged_in_bar : logged_out_bar}
		</AppBar>
}

TopBar.propTypes = {
  className: PropTypes.string,
  onMobileNavOpen: PropTypes.func
};

export default TopBar;
