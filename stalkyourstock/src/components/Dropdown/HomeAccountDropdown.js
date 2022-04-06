/**
 * @author Mugdha Agharkar
 */

import * as React from 'react';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import Divider from '@mui/material/Divider';
import Logout from '@mui/icons-material/Logout';
import CompareIcon from '@mui/icons-material/Compare';
import AnalyticsIcon from '@mui/icons-material/Analytics';
import AccountCircleRoundedIcon from "@mui/icons-material/AccountCircleRounded";
import ShowChartIcon from '@mui/icons-material/ShowChart';
import { useNavigate } from 'react-router-dom';

export default function AccountMenu() {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const navigate = useNavigate();
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleRouting = (event) => {
    const selectedOption = event.target.innerText;
    if(selectedOption === "Logout"){
      localStorage.clear();
      navigate("/");

    }
    if(selectedOption === "Comparison"){
      navigate("/comparison");
    }
    if(selectedOption === "Analysis"){
      navigate("/analysis");
    }
    if(selectedOption === "Tickers"){
      navigate("/tickers");
    }
  }
  const handleClose = () => {
    setAnchorEl(null);
  };
  const menuOptions = [
      {
        icon: <CompareIcon fontSize='small' />,
        text: "Comparison",
        divider: false,
      },
      {
        icon: <ShowChartIcon fontSize='small' />,
        text: "Tickers",
        divider: false,
      },
      {
        icon: <AnalyticsIcon fontSize='small' />,
        text: "Analysis",
        divider: true,
      },
      {
        icon: <Logout fontSize='small' />,
        text: "Logout",
        divider: false,
      }
  ];
  return (
    <React.Fragment>
      <button 
        className="buttons"
        onClick={handleClick}
        size="small"
        sx={{ ml: 2 }}
        aria-controls={open ? 'account-menu' : undefined}
        aria-haspopup="true"
        aria-expanded={open ? 'true' : undefined}
      >
          <AccountCircleRoundedIcon />
      </button>
      <Menu
        anchorEl={anchorEl}
        id="account-menu"
        open={open}
        onClose={handleClose}
        onClick={handleClose}
        PaperProps={{
          elevation: 0,
          sx: {
            overflow: 'visible',
            filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
            mt: 1.5,
            '& .MuiAvatar-root': {
              width: 32,
              height: 32,
              ml: -0.5,
              mr: 1,
            },
            '&:before': {
              content: '""',
              display: 'block',
              position: 'absolute',
              top: 0,
              right: 14,
              width: 10,
              height: 10,
              bgcolor: 'background.paper',
              transform: 'translateY(-50%) rotate(45deg)',
              zIndex: 0,
            },
          },
        }}
        transformOrigin={{ horizontal: 'right', vertical: 'top' }}
        anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
      >
      {
          menuOptions.map(option => {
            return (
              option.divider ? (
                <>
                <MenuItem value={option.text} onClick={(event) => handleRouting(event)}>
                    <ListItemIcon>
                        {option.icon}
                    </ListItemIcon>
                    {option.text}
                  </MenuItem>
                  <Divider />
                </>
                ) : (
                  <MenuItem value={option.text} onClick={(event) => handleRouting(event)}>
                  <ListItemIcon>
                      {option.icon}
                  </ListItemIcon>
                  {option.text}
                </MenuItem>
                )
          )})
      }
      </Menu>
    </React.Fragment>
  );
}
