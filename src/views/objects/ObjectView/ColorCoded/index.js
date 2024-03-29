// src/views/objects/ObjectView/ColorCoded/index.js

import React, { useContext } from 'react';
import {
  Container,
  Grid,
  makeStyles
} from '@material-ui/core';
import Card from '@material-ui/core/Card';

// Rendering dynamic JSON.
import Meta from './Meta';
import DescriptionDomain from './DescriptionDomain';
import ErrorDomain from './ErrorDomain';
import ExecutionDomain from './ExecutionDomain';
import ExtensionDomain from './ExtensionDomain';
import IoDomain from './IoDomain';
import ParametricDomain from './ParametricDomain';
import ProvenanceDomain from './ProvenanceDomain';
import UsabilityDomain from './UsabilityDomain';

// Context
// Source: https://www.digitalocean.com/community/tutorials/react-usecontext
import { DisplayContext } from '../../../../layouts/ObjectViewLayout/index';

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.dark,
    minHeight: '100%',
    paddingBottom: theme.spacing(3),
    paddingTop: theme.spacing(3)
  },
  hiding: {
    display: 'none'
  },
  margined: {
    marginBottom: '100px'
  },
  showing: {
    display: 'block'
  },
  meta: {
    background: '#74b3ce',
    color: 'white',
    overflow: 'auto'
  },
  productCard: {
    height: '100%'
  },
  descriptionDomain: {
    background: '#09bc8a',
    overflow: 'auto'
  },
  errorDomain: {
    background: '#3d5a80',
    overflow: 'auto'
  },
  executionDomain: {
    background: '#3d5a80',
    overflow: 'auto'
  },
  extensionDomain: {
    background: '#293241',
    overflow: 'auto'
  },
  ioDomain: {
    background: '#98c1d9',
    overflow: 'auto'
  },
  parametricDomain: {
    background: '#ee6c4d',
    overflow: 'auto'
  },
  provenanceDomain: {
    background: '#172a3a',
    overflow: 'auto'
  },
  usabilityDomain: {
    background: '#004346',
    overflow: 'auto'
  }
}));

const ColorCoded = ({ contents }) => {
  // contents is the actual object information.
  // Set the right sub-key.

  // Use the parent context.
  // Source: https://www.digitalocean.com/community/tutorials/react-usecontext

  // As of 1/29/21, there is a problem in React with this function call.
  // Source: https://stackoverflow.com/questions/62564671/using-usecontext-in-react-doesnt-give-me-the-expect-data

  const { state } = useContext(DisplayContext);

  const classes = useStyles();

  // Define the components to render.
  // Source: https://stackoverflow.com/questions/48131100/react-render-array-of-components
  // Source: https://stackoverflow.com/questions/43585840/react-render-dynamic-list-of-components

  // Note that the meta information is generated directly from the object,
  // but is not contained in the object itself.

  const meta = {
    object_id: contents.object_id,
    spec_version: contents.spec_version,
    etag: contents.etag
  };

  if (!contents.error_domain) {
    contents.error_domain = {};
  }

  if (!contents.parametric_domain) {
    contents.parametric_domain = [];
  }

  if (!contents.extension_domain) {
    contents.extension_domain = [];
  }

  const renderList = [
    meta,
    contents.provenance_domain,
    contents.usability_domain,
    contents.description_domain,
    contents.execution_domain,
    contents.io_domain,
    contents.parametric_domain,
    contents.error_domain,
    contents.extension_domain
];

  const compList = [Meta,
    ProvenanceDomain, UsabilityDomain, DescriptionDomain, ExecutionDomain,
    IoDomain, ParametricDomain, ErrorDomain, ExtensionDomain];

  const classNames = ['meta', 'provenanceDomain', 'usabilityDomain', 'descriptionDomain',
    'executionDomain', 'ioDomain', 'parametricDomain', 'errorDomain', 'extensionDomain'];

  return (
    <Container maxWidth={false}>
      <Grid className={classes.margined} container spacing={3}>
        {
          compList.map((Component, index) => {
            return (
              <Grid
                className={state[classNames[index]] ? classes.showing : classes.hiding}
                item
                lg={12}
                md={12}
                xs={12}
              >
                <Card className={classes[classNames[index]]}>
                  <Component items={renderList[index]} />
                </Card>
              </Grid>
            );
          })
        }
      </Grid>
    </Container>
  );
};

export default ColorCoded;
