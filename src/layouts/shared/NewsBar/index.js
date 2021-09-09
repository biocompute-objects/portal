import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import PropTypes from 'prop-types';
import {
  Drawer,
  Hidden,
  makeStyles,
  Typography
} from '@material-ui/core';

// Twitter feed
// Source: https://www.npmjs.com/package/react-twitter-embed
// Source (next line): https://stackoverflow.com/questions/41292559/could-not-find-a-declaration-file-for-module-module-name-path-to-module-nam
// @ts-ignore
import { TwitterTimelineEmbed } from 'react-twitter-embed';

const useStyles = makeStyles(() => ({
  mobileDrawer: {
    width: 256
  },
  desktopDrawer: {
    width: 256,
    top: 64,
    height: 'calc(100% - 64px)'
  },
  avatar: {
    cursor: 'pointer',
    width: 64,
    height: 64
  },
  mainHighlight: {
    marginTop: '20px'
  },
  subHighlight: {
    marginTop: '20px',
    paddingLeft: '10px'
  }
}));

const NewsBar = ({ onMobileClose, openMobile }) => {
  const classes = useStyles();
  const location = useLocation();

  useEffect(() => {
    if (openMobile && onMobileClose) {
      onMobileClose();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location.pathname]);

  return (
    <>
      <Hidden lgUp>
        <Drawer
          anchor="right"
          classes={{ paper: classes.mobileDrawer }}
          onClose={onMobileClose}
          open={openMobile}
          variant="temporary"
        />
      </Hidden>
      <Hidden mdDown>
        <Drawer
          anchor="right"
          classes={{ paper: classes.desktopDrawer }}
          open
          variant="persistent"
        >
          <TwitterTimelineEmbed
            noFooter
            sourceType="profile"
            screenName="BioComputeObj"
            options={{ height: 400 }}
          />
          <Typography align="center" className={classes.mainHighlight} variant="h2">
            Workshops
          </Typography>
          <Typography className={classes.subHighlight} variant="h4">
            FDA Days
          </Typography>
          <Typography className={classes.subHighlight} variant="h4">
            GWU BCO
          </Typography>
          <Typography className={classes.subHighlight} variant="h4">
            Etc...
          </Typography>
          <Typography align="center" className={classes.mainHighlight} variant="h2">
            Release Notes
          </Typography>
          <Typography className={classes.subHighlight} variant="h4">
            BCO API v. 1.02.3
          </Typography>
          <Typography className={classes.subHighlight} variant="h4">
            Portal v. 4.2
          </Typography>
          <Typography className={classes.subHighlight} variant="h4">
            Etc...
          </Typography>
        </Drawer>
      </Hidden>
    </>
  );
};

NewsBar.propTypes = {
  onMobileClose: PropTypes.func,
  openMobile: PropTypes.bool
};

NewsBar.defaultProps = {
  onMobileClose: () => {},
  openMobile: false
};

export default NewsBar;
