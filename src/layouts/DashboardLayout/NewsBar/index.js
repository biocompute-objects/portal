import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import PropTypes from 'prop-types';
import {
  Drawer,
  Hidden,
  makeStyles
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
        >
        </Drawer>
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
              options={{height: 800}}
            />
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
