/**
 * @author Mugdha Agharkar
 */

import React from "react";
import { Link } from "react-router-dom";

function Error() {
    let email = localStorage.getItem("emailId");
    console.log(email);
    return(
        <div>
            <h1>You seem lost</h1>
            <Link to="/">Find your way here!</Link>
        </div>
    )
}

export default Error;