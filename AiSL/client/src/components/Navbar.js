import React, { Component } from "react";
import "./Navbar.css"
import logo from "../res/logo.png"
class Navbar extends Component{

    render(){
        return(
            <div id={"navbar"}>
                <div id={"logoDiv"}>

                    <img height={"150"} width={"150"} src={logo} alt={"logo"}/>
                </div>

            </div>
        )
    }
}
export default Navbar;