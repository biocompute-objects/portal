// src/views/builder/BuilderView/ColorCoded/ExtensionDomain.js
import React, { useState } from 'react';
import { 
    Card,
    CardActionArea,
    CardContent,
    TextField,
    Typography,
} from '@material-ui/core';
import HelpIcon from '@material-ui/icons/Help';
import Button from '@material-ui/core/Button';
import PropTypes from 'prop-types';
import Extension from 'src/components/Extension'


// Pass an object and whether its keys are properties.
export default function ExtensionDomain({ items }) {

  const [newSchema, setNewSchema] = useState();

  const addRows = (newSchema) => {
    if (!items.exd) {
      const holder = [];
      holder.push({
        extension_schema: newSchema
      });
      items.setExd(holder);
    } else {
      const holder = items.exd;
      holder.push({
        extension_schema: newSchema
      })
      items.setExd(holder);
    }
    setNewSchema('')
  };
  
  const removeRows = (index) => {
    items.setExd(items.exd.filter(((o, i) => index !== i)))
  }

  const link = 'https://docs.biocomputeobject.org/extension-domain/'
  
  return (
    <Card>
      <CardActionArea onClick={() => window.open(link)}>
        <CardContent >
          <Typography variant="h1">
            Extension Domain &nbsp;
            <HelpIcon />
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardContent>
        <dev>
          <Typography>
            Top add an extension enter a valid URL for the extension schema below and hit the 'ADD EXTENSION' button. 
          </Typography>
          <TextField
            fullWidth
            onChange={(e) => setNewSchema(e.target.value)}
            value={newSchema}
          >
          </TextField>
          <Button
            variant="contained"
            disabled={!newSchema}
            onClick={() => addRows(newSchema)}
          >
                Add Extension
          </Button>
        </dev>
      </CardContent>
    {  (!items.exd)
        ? (
            <CardContent />
          )
        : ( items.exd.map((item, index) => {
            return (
                <CardContent key={index}>
                  <Extension
                    extension={item}
                    schemaUrl={item['extension_schema']}
                    index={index}
                    allExtensions={items}
                  />
                  <Button
                    variant="contained"
                    color="primary"
                    disableElevation
                    fullWidth
                    onClick={() => removeRows(index)}
                  >
                    Remove
                  </Button> 
                </CardContent>
              );
            }
          )
        )
    }
    </Card>
  );
}

ExtensionDomain.propTypes = {
    items: PropTypes.object.isRequired,
}