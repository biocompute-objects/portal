import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Accordion from '@material-ui/core/Accordion';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import { Grid } from '@material-ui/core';
import Typography from '@material-ui/core/Typography';

// Search field
import SearchField from './Tools/SearchField'

// Logic field
import LogicField from './Tools/LogicField'

// Regex box
import RegexBox from './Tools/RegexBox'

// Add condition
import AddCondition from './Tools/AddCondition'


const useStyles = makeStyles((theme) => ({
  centered: {
    textAlign: 'center'
  },
  root: {
    width: '100%',
  },
  heading: {
    fontSize: theme.typography.pxToRem(15),
    fontWeight: theme.typography.fontWeightRegular,
    marginLeft: 'auto',
    marginRight: 'auto'
  },
}));

export default function Tools() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
          <Typography className={classes.heading}>Object Tools</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Grid
          container
          spacing={3}
          >
          <Grid
            item
            lg={7}
            md={12}
            xs={12}
          >
          <Card>
            <CardContent>
              <Typography variant="h3">
                Search object fields
              </Typography>
              <Grid
                alignItems="center"
                container
                direction="row"
                justify="flex-start"
                spacing={3}
              >
                <Grid
                  item
                  lg={4}
                  md={12}
                  xs={12}
                >
                  <SearchField />
                </Grid>
                <Grid
                  item
                  lg={2}
                  md={12}
                  xs={12}
                >
                  <LogicField />
                </Grid>
                <Grid
                  item
                  lg={4}
                  md={12}
                  xs={12}
                >
                  <SearchField />
                </Grid>
                <Grid
                  item
                  lg={1}
                  md={12}
                  xs={12}
                >
                  <RegexBox />
                </Grid>
              </Grid>
            </CardContent>
          </Card>
          <Card>
            <CardContent className={classes.centered}>
              <AddCondition />
            </CardContent>
          </Card>
          </Grid>
        </Grid>
        <Typography>Add object to collection, search across objects, etc...</Typography>
        </AccordionDetails>
      </Accordion>
    </div>
  );
}
