/**
 * @author Mugdha Agharkar
 */

import react, {useState} from "react";
import { TextField} from "@mui/material";
import { styled } from '@mui/material/styles';
import InputAdornment from '@mui/material/InputAdornment';
import IconButton from '@mui/material/IconButton';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';

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

function PasswordTextBox(props) {
    const [isPasswordVisible,setIsPasswordVisible] = useState(false);
    
    const  handleClickShowPassword = () => {
        console.log("isPasswordVisible", isPasswordVisible);
        setIsPasswordVisible(!isPasswordVisible);
    }
    
    console.log(props);
    return(
        <CssTextField 
            type={isPasswordVisible ? "text" : "password"}
            id="filled-basic" 
            label={props.children} 
            variant="filled" 
            onChange={props.onChange}
            value={props.value}
            {...props}

            InputProps={{
                endAdornment: <InputAdornment position="end">
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={handleClickShowPassword}
                  onMouseDown={(event)=> event.preventDefault()}
                  edge="end"
                >
                  {isPasswordVisible ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>,
              }}
        />
    )
}

export default PasswordTextBox;