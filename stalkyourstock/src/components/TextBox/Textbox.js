/**
 * @author Mugdha Agharkar
 */

import { TextField} from "@mui/material";
import { styled } from '@mui/material/styles';

const CssTextField = styled(TextField)({
    '& label.Mui-focused': {
      color: '#1d3124',
    },
    '& .MuiInput-underline:after': {
      borderBottomColor: '#1d3124',
    },
    '& .MuiFilledInput-root': {
      '& fieldset': {
        borderColor: '#1d3124',
      },
      ':after': {
          borderColor: "#1d3124",
      },
      '&:hover fieldset': {
        borderColor: '#1d3124',
      },
      '&.Mui-focused fieldset': {
        borderColor: '#1d3124',
      },
    },
  });

function TextBox(props) {
    return(
        <CssTextField 
            id="filled-basic" 
            label={props.children} 
            variant="filled" 
            onChange={props.onChange}
            {...props}
        />
    )
}

export default TextBox;