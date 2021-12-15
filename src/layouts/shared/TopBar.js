// src/layouts/shared/TopBar.js

import React, { useContext } from 'react';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import {
  AppBar,
  Button,
  Hidden,
  IconButton,
  Toolbar,
  makeStyles
} from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';
import Logo from 'src/components/Logo';
import { FetchContext } from '../../App';

import {
  User as UserIcon,
  Users as UsersIcon
} from 'react-feather';
import NavItem from './NavItem';

// Navigation.
const itemsAuth = [
  {
    href: '/resources',
    icon: UserIcon,
    title: 'Resources'
  },
  // {
  //   href: '/community',
  //   icon: UserIcon,
  //   title: 'Community'
  // },
  {
    href: '/builder',
    icon: UserIcon,
    title: 'Builder'
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

const itemsNoAuth = [
  {
    href: '/resources',
    icon: UserIcon,
    title: 'Resources'
  },
  // {
  //   href: '/community',
  //   icon: UserIcon,
  //   title: 'Community'
  // },
  {
    href: '/builder',
    icon: UserIcon,
    title: 'Builder'
  },
  {
    href: '/objects',
    icon: UsersIcon,
    title: 'BioCompute Objects'
  },
  {
    href: '/login',
    icon: UserIcon,
    title: 'Log In/Register'
  }
];

const useStyles = makeStyles((theme) => ({
  item: {
    display: 'flex',
    paddingTop: 0,
    paddingBottom: 0
  },
  button: {
    color: '#ffffff',
    marginLeft: 'auto',
    marginRight: 'auto',
    fontSize: '20px',
    textTransform: 'none',
    width: '100%'
  },
  icon: {
    marginRight: theme.spacing(1)
  },
  active: {
    backgroundColor: '#1ca527',
    color: '#ffffff',
    '& $title': {
      fontWeight: theme.typography.fontWeightMedium
    },
    '& $icon': {
      color: '#ffffff'
    }
  }
}));

function TopBar(props, { className, onMobileNavOpen, ...rest }) {
  const navigate = useNavigate();
  const fc = useContext(FetchContext);
  function Logout() {
    localStorage.clear();
    navigate('/login', { replace: true });
  }

  const classes = useStyles();

  const loggedOutBar = (
    <Toolbar>
      <RouterLink to="/">
        <Logo />
      </RouterLink>
      <Hidden smDown>
        {itemsNoAuth.map((item) => (
          <NavItem
            href={item.href}
            key={item.title}
            title={item.title}
            icon={item.icon}
          />
        ))}
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

  const loggedInBar = (

    <Toolbar>
      <RouterLink to="/">
        <Logo />
      </RouterLink>
      <Hidden smDown>
        {itemsAuth.map((item) => (
          <NavItem
            href={item.href}
            key={item.title}
            title={item.title}
            icon={item.icon}
          />
        ))}
      </Hidden>
      <Button
        activeClassName={classes.active}
        className={classes.button}
        color="inherit"
        onClick={Logout}
      >
        Log Out
      </Button>
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
  return (
    <AppBar
      className={clsx(classes.root, className)}
      elevation={0}
      {...rest}
    >
      {(fc.isLoggedIn === true) ? loggedInBar : loggedOutBar}
    </AppBar>
  );
}

TopBar.propTypes = {
  className: PropTypes.string,
  onMobileNavOpen: PropTypes.func
};

export default TopBar;
