// src/views/builder/BuilderView/ColorCoded/ExtensionDomain.js
import React, { useEffect } from 'react';
import { withStyles, Typography, CardContent } from '@material-ui/core';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import HelpIcon from '@material-ui/icons/Help';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Card from '@material-ui/core/Card';
import Linker from './components/Linker';
import PropTypes from 'prop-types';
import Form from "@rjsf/material-ui";
import Extension from 'src/components/Extension'

// Cell styling
const StyledCell = withStyles({
  root: {
    color: 'black'
  },
  bordered: {
    border: '1px solid black'
  }
})(TableCell);

// Pass an object and whether its keys are properties.
export default function ExtensionDomain({ items }) {

  const setInput = (value, i) => {
    const holder = items.exd;
    holder[i] = JSON.parse(value);
    items.setExd(holder);
    console.log('working?', items.exd[i]);
  };

  const addRows = () => {
    console.log('add Rows', items);
    if (!items.exd) {
      const holder = [];
      holder.push({
        extension_schema: ''
      });
      items.setExd(holder);
    } else {
      const holder = items.exd;
      holder.push({
        extension_schema: ''
      })
      items.setExd(holder);
    }
    items.setRerender(items.rerender + 1);
  };
  
  const removeRows = (which) => {
    const holder = items.exd;
    holder.splice(which, 1);
    items.setExd(holder);
    items.setRerender(items.rerender + 1);
  };
  
  useEffect(()=>{
  },[])
  
  return (
    <div>
    {  (!items.exd)
        ? (
            <CardContent>
              <Button >Hello</Button>
            </CardContent>
          )
        : ( items.exd.map((item, index) => {
            console.log(item['extension_schema'])
            return (
                <Extension
                  key={index}
                  extension={item}
                  schemaUrl={item['extension_schema']}
                />
              );
            }
          )
        )
    }
    </div>
  );
}

ExtensionDomain.propTypes = {
    items: PropTypes.object.isRequired,
}