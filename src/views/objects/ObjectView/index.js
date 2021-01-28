import React from 'react';

// Rendering URL parameters.
import { useParams } from "react-router-dom";

// Tools
import Tools from './Tools'

// Views
import Views from './Views'

// This is the parent for the object views.

// The state model is based on https://reactjs.org/docs/lifting-state-up.html

export default function ObjectView() {
  
  // Declare the view type.
  const [viewType, setViewType] = React.useState('color');
  
  const handleViewChange = (view) => {
    this.setViewType({view});
  }

  // Set the object requested.
  let { id } = useParams();
  
  return (
    <div>
      <Tools />
      <Views id={id}/>
    </div>
  );
}
