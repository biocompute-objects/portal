// src/layouts/shared/TopBar.js

import React, { useContext, useState } from 'react';
import { NavLink as RouterLink, useNavigate } from 'react-router-dom';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import {
  AppBar,
  Button,
  Container,
  Hidden,
  Toolbar,
  makeStyles,
  Dialog
} from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';
import Logo from 'src/components/Logo';
import {
  User as UserIcon,
  Users as UsersIcon
} from 'react-feather';
import { FetchContext } from '../../App';

import NavItem from './NavItem';

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

  const [anchorEl, setAnchorEl] = useState(null);

  const handleClose = () => {
    setAnchorEl(null);
  };
  
  var userName = (fc.isLoggedIn === true)
    ? (JSON.parse(localStorage.getItem('user'))['first_name'])
    : ('')

  console.log('test', userName)
  const handleClick = (event) => {
    console.log('click!!');
    setAnchorEl(event.currentTarget);
  };

  function Logout() {
    localStorage.clear();
    fc.setIsLoggedIn(false)
    navigate('/login', { replace: true });
  }

  const classes = useStyles();


  return (
    <AppBar
      className={clsx(classes.root, className)}
      elevation={2}
      {...rest}
    >
      <Container maxWidth="xl">
        <Toolbar disableGutters>
            <RouterLink to="/">
            <Logo />
          </RouterLink>
            <NavItem
              href={'/resources'}
              key={'resources'}
              title={'Resources'}
              icon={UsersIcon}
            />
            <NavItem
              href={'/builder'}
              key={'builder'}
              title={'Builder'}
              icon={UsersIcon}
            />
            <NavItem
              href={'/objects'}
              key={'objects'}
              title={'Objects'}
              icon={UsersIcon}
            />
            <NavItem
              href={'/prefix'}
              key={'prefix'}
              title={'Prefix Registry'}
              icon={UsersIcon}
            />
            {
                (fc.isLoggedIn === true)
                ? (
                  <NavItem
                    href={'/account'}
                    key={'account'}
                    title={'Account'}
                    icon={Logo}
                  />
                  )
                : (
                  <NavItem
                    href={'/login'}
                    key={'login'}
                    title={'Log In'}
                    icon={UsersIcon}
                  />
                )
            }
            {
                (fc.isLoggedIn !== true)
                ? (
                  <div></div>

                )
                : (
                  <Button
                    className={classes.button}
                    color="inherit"
                    onClick={Logout}
                  >
                    {`Log Out ${userName}`}
                  </Button>
                )
            }
        </Toolbar>
      </Container>
    </AppBar>
  );
}

TopBar.propTypes = {
  className: PropTypes.string,
  onMobileNavOpen: PropTypes.func
};

export default TopBar;
