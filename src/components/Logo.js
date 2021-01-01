import React from 'react';

const Logo = (props) => {
  return (
    <img
      alt="Logo"
      src="/static/bco_logo.png"
      {...props}
    />
  );
};

export default Logo;