// Source: https://material-ui.com/components/tooltips/

import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Tooltip from '@material-ui/core/Tooltip';

// For the object views.
import Views from '../views/objects/ObjectView'

const BcoTooltip = withStyles((theme) => ({
  tooltip: {
    backgroundColor: '#f5f5f9',
    color: 'rgba(0, 0, 0, 0.87)',
    maxWidth: 220,
    fontSize: theme.typography.pxToRem(12),
    border: '1px solid #dadde9',
  },
}))(Tooltip);

const Content = React.forwardRef((props, ref) => {
	console.log('props: ', props)
	console.log(props.bcoLink)
	console.log('ref: ', ref)
	
	return (
	  <div {...props} ref={React.useRef(props.bcoLink)}>
			<Views table={'bco_draft'} objectId={props.bcoLink} />
	  </div>
	);
});

export default function BcoPreviewPopup({ bcoLink }) {
  
	// Process the link to determine the table.
	console.log('-----', bcoLink)
	
	return (
    <div>
      <BcoTooltip
        interactive
				title='BCO Preview'
			>
				<Content bcoLink={bcoLink} />
      </BcoTooltip>
    </div>
  );
}