/**
 * @author Mugdha Agharkar
 */


import { Button } from "@mui/material";
import React from "react";

function AppButton(props) {
    return(
        <Button color={props.color} onClick={props.onClick} {...props}>
            {props.children}
        </Button>
    )
}

export default AppButton;