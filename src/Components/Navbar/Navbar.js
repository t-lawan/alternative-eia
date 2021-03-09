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
    mix-blend-mode: multiply;


`;

const StyledNavLink = styled(NavLink)`
    padding: 1rem;
    text-decoration: none;
`




const Navbar = () => {



    return (
        <NavbarWrapper>
            <StyledNavLink activeStyle={{textDecoration: 'underline'}} to={PageUrls.HOME}> Home</StyledNavLink> 
            <StyledNavLink to={PageUrls.EIA}> EIA</StyledNavLink> 
            <StyledNavLink to={PageUrls.STORIES}> Stories</StyledNavLink> 
        </NavbarWrapper>
    );
  };
  
  export default Navbar;
  