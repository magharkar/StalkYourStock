/**
 * @author Kandarp Parikh
 */
import * as React from 'react';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';


export default function SelectAutoWidth({childToParent}) {
  const [complaintType, setComplaintType] = React.useState('');

   const onChange=(event) => {
    setComplaintType(event.target.value)
       childToParent(event.target.value)
    }

  return (
      <FormControl sx={{ m: 0, minWidth: 250 , paddingRight: 0}}>
        <InputLabel id="demo-simple-select-autowidth-label">Select Complaint Type</InputLabel>
        <Select
          labelId="demo-simple-select-autowidth-label"
          id="demo-simple-select-autowidth"
          value={complaintType}
          onChange={onChange}
          autoWidth
          label="Filter By Complaint Type"
        >
          <MenuItem value="">
            <em>None</em>
          </MenuItem>
          <MenuItem value={'Delivery'}>Delivery related</MenuItem>
          <MenuItem value={'Quantity'}>Quantity related</MenuItem>
          <MenuItem value={'Quality'}>Quality related</MenuItem>
        </Select>
      </FormControl>
  );
}
