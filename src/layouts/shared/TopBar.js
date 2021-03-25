import React, { useState, useContext } from 'react';
import { Link as RouterLink } from 'react-router-dom';
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
// Get the context from App.js
import { LoginContext } from '../../App';


// Navigation.
const items_auth = [
  {
    href: '/dashboard',
    icon: BarChartIcon,
    title: 'Home'
  },
  {
    href: '/account',
    icon: UserIcon,
    title: 'Account'
  },
  {
    href: '/builder',
    icon: UsersIcon,
    title: 'Builder'
  },
  {
    href: '/objects',
    icon: UsersIcon,
    title: 'BioCompute Objects'
  }
];

const items_no_auth = [
  {
    href: '/dashboard',
    icon: BarChartIcon,
    title: 'Home'
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
  root: {},
  avatar: {
    width: 60,
    height: 60
  }
}));



function TopBar(props, { className, onMobileNavOpen, ...rest }) {
  function Logout() {
    localStorage.clear();
    context.setIsLoggedIn(false);
	console.log(LoginContext)
	// RouterLink.push("/login");
  };
	
  const classes = useStyles();
  const [notifications] = useState([]);
  const context = useContext(LoginContext);

  const logged_out_bar = (

          <Toolbar>
          <RouterLink to="/">
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
            <Button 
              onClick={Logout}>
                <span>Log Out</span>
            </Button>
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
  
  return <AppBar
        className={clsx(classes.root, className)}
        elevation={0}
        {...rest}>
		{context.isLoggedIn ? logged_in_bar : logged_out_bar}
		</AppBar>
}

TopBar.propTypes = {
  className: PropTypes.string,
  onMobileNavOpen: PropTypes.func
};

export default TopBar;
