import React, { useState } from "react";
import styled from "styled-components";
import { NavLink } from 'react-router-dom'
import { PageUrls } from "../../Utility/helper";

const NavbarWrapper = styled.div`
    top:0;
    right:0;
    /* background:red; */
    /* color: black; */
    position: absolute;
    padding: 2rem;
    z-index: 2000;
    /* mix-blend-mode: multiply; */


`;

const StyledNavLink = styled(NavLink)`
    padding: 1rem;
    text-decoration: none;
    color: ${props => props.invert ? 'white' : 'inherit'};
`




const Navbar = (props) => {



    return (
        <NavbarWrapper>
            <StyledNavLink invert={props.invert} activeStyle={{textDecoration: 'underline'}} to={PageUrls.HOME}> Home</StyledNavLink> 
            <StyledNavLink invert={props.invert} activeStyle={{textDecoration: 'underline'}} to={PageUrls.EIA}> EIA</StyledNavLink> 
            <StyledNavLink invert={props.invert} activeStyle={{textDecoration: 'underline'}} to={PageUrls.STORIES}> Stories</StyledNavLink> 
        </NavbarWrapper>
    );
  };
  
  export default Navbar;
  