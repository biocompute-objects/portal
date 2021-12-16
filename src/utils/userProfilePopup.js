// Source: https://material-ui.com/components/tooltips/

import React from 'react';
import { withStyles, makeStyles } from '@material-ui/core/styles';
import Tooltip from '@material-ui/core/Tooltip';
import Typography from '@material-ui/core/Typography';

// Context
// Source: https://stackoverflow.com/questions/41030361/how-to-update-react-context-from-inside-a-child-component

// Create the context?
export const UserProfilePopupContext = React.createContext();

const HtmlTooltip = withStyles((theme) => ({
  tooltip: {
    backgroundColor: '#f5f5f9',
    color: 'rgba(0, 0, 0, 0.87)',
    maxWidth: 220,
    fontSize: theme.typography.pxToRem(12),
    border: '1px solid #dadde9',
  },
}))(Tooltip);

export default function UserProfilePopup(userInfo) {
  return (
    <div>
      <HtmlTooltip
        interactive
				title={
					<React.Fragment>
						<Typography align='center'>Profile</Typography>
						{
							['image', 'name', 'title', 'organization', 'email'].map(item => (
									item == 'image'
										?
											<Typography align='center'>
												{userInfo[item]}
											</Typography>
										:
											<Typography>
												{userInfo[item]}
											</Typography>
								)
							)
						}
					</React.Fragment>
				}
			>
      </HtmlTooltip>
    </div>
  );
}