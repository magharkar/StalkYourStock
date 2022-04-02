/**
 * @author Mugdha Agharkar
 */

import * as React from 'react';
import Checkbox from '@mui/material/Checkbox';


export default function ColorCheckboxes(props) {
  const handleCheck = (event, isInputChecked) => {
    this.props.onChange(event, isInputChecked, props.category);
  };

  return (
      <Checkbox
      {...props}
      onClick={props.onClick}
        sx={{
          color: props.isMobileView ? "#355c43" : "#FFF",
          '&.Mui-checked': {
            color: props.isMobileView ? "#355c43" : "#FFF",
          },
        }}
        onCheck={handleCheck}
        label={props.category}
        value={props.category}
      />
  );
}