import React, { useContext } from 'react';
import {
  Container,
  Grid,
  makeStyles
} from '@material-ui/core';
import Card from '@material-ui/core/Card';

// Rendering dynamic JSON.
import Meta from './Meta'
import DescriptionDomain from './DescriptionDomain'
import ErrorDomain from './ErrorDomain'
import ExecutionDomain from './ExecutionDomain'
import ExtensionDomain from './ExtensionDomain'
import IoDomain from './IoDomain'
import ParametricDomain from './ParametricDomain'
import ProvenanceDomain from './ProvenanceDomain'
import UsabilityDomain from './UsabilityDomain'

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
    color: 'white'
  },
  productCard: {
    height: '100%'
  },
  descriptionDomain: {
    background: '#09bc8a'
  },
  errorDomain: {
    background: '#3d5a80'
  },
  executionDomain: {
    background: '#3d5a80'
  },
  extensionDomain: {
    background: '#293241'
  },
  ioDomain: {
    background: '#98c1d9'
  },
  parametricDomain: {
    background: '#ee6c4d'
  },
  provenanceDomain: {
    background: '#172a3a'
  },
  usabilityDomain: {
    background: '#004346'
  }
}));

const ColorCoded = ({ contents }) => {
  
  // contents is the actual object information.
  // Set the right sub-key.
  console.log('CONTENTS:', contents)
  
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
    "object_id": contents.object_id, 
    "spec_version": contents.spec_version,
    "etag": contents.etag
  }
  // const renderList = [ meta, contents.provenance_domain, contents.usability_domain, contents.description_domain, contents.execution_domain, contents.io_domain, contents.parametric_domain, contents.error_domain ];
  // const compList = [ Meta, ProvenanceDomain, UsabilityDomain, DescriptionDomain, ExecutionDomain, IoDomain, ParametricDomain, ErrorDomain ];
  // const classNames = [ 'meta', 'provenanceDomain', 'usabilityDomain', 'descriptionDomain', 'executionDomain', 'ioDomain', 'parametricDomain', 'errorDomain' ];

  // Set fake data for missing (optional) domains.
  // ['provenance_domain', 'usability_domain', 'description_domain', 'execution_domain', 'io_domain', 'parametric_domain', 'error_domain', 'extension_domain'].map(item => {
  //     if(!(item in contents)) {
  //       contents[item] = '';
  //     }
  //   }
  // )
  // Couldn't get the map above to work?
  if(!('error_domain' in contents)) {
    contents['error_domain'] = '';
  }
  if(!('extension_domain' in contents)) {
    contents['extension_domain'] = '';
  }

  const renderList = [ meta, contents.provenance_domain, contents.usability_domain, contents.description_domain, contents.execution_domain, contents.io_domain, contents.parametric_domain, contents.error_domain, contents.extension_domain ];
  const compList = [ Meta, ProvenanceDomain, UsabilityDomain, DescriptionDomain, ExecutionDomain, IoDomain, ParametricDomain, ErrorDomain, ExtensionDomain ];
  const classNames = [ 'meta', 'provenanceDomain', 'usabilityDomain', 'descriptionDomain', 'executionDomain', 'ioDomain', 'parametricDomain', 'errorDomain', 'extensionDomain' ];
  
  return (
    <Container maxWidth={false}>
      <Grid
        className={classes.margined}
        container
        spacing={3}
      >
        {
          compList.map((Component, index) => {
              return(
                <Grid
                  className={state[classNames[index]] ? classes.showing : classes.hiding}
                  item
                  lg={12}
                  md={12}
                  xs={12}
                >
                  <Card className={classes[classNames[index]]}>
                    <Component items={renderList[index]}/>
                  </Card>
                </Grid>
              )
            }
          )
        }
      </Grid>
    </Container>
  );
};

export default ColorCoded;