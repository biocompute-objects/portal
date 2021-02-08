import React from 'react';
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

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.dark,
    minHeight: '100%',
    paddingBottom: theme.spacing(3),
    paddingTop: theme.spacing(3)
  },
  margined: {
    marginBottom: '100px'
  },
  meta: {
    backgroundColor: 'green',
    color: 'white'
  },
  productCard: {
    height: '100%'
  },
  descriptionDomain: {
    background: 'green'
  },
  errorDomain: {
    background: 'green'
  },
  executionDomain: {
    background: 'red'
  },
  extensionDomain: {
    background: 'magenta'
  },
  ioDomain: {
    background: 'blue'
  },
  parametricDomain: {
    background: 'teal'
  },
  provenanceDomain: {
    background: 'purple'
  },
  usabilityDomain: {
    background: 'orange'
  }
}));

const ColorCoded = ({ contents }) => {
  
  // contents is the actual object information.
  // Set the right sub-key.
  
  const classes = useStyles();

  // Define the components to render.
  // Source: https://stackoverflow.com/questions/48131100/react-render-array-of-components
  // Source: https://stackoverflow.com/questions/43585840/react-render-dynamic-list-of-components

  // Note that the meta information is generated directly from the object,
  // but is not contained in the object itself.

  const meta = {}
  const renderList = [];
  //const compList = [ Meta, ProvenanceDomain, UsabilityDomain, DescriptionDomain, ExecutionDomain, IoDomain, ParametricDomain, ErrorDomain ];
  //const classNames = [ 'meta', 'provenanceDomain', 'usabilityDomain', 'descriptionDomain', 'executionDomain', 'ioDomain', 'parametricDomain', 'errorDomain' ];

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
                  item
                  lg={12}
                  md={12}
                  xs={12}
                >
                  <Card className={classes[classNames[index]]}>
                    <Component />
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