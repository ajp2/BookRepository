import React, { useState, useContext } from "react";
import {
  Collapse,
  Container,
  Navbar,
  NavbarBrand,
  NavbarToggler,
  NavItem,
  NavLink
} from "reactstrap";
import { Link } from "react-router-dom";
import "./NavMenu.css";
import { logout } from "../util/auth_util";
import { UserContext } from "./UserContext";

import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles(theme => ({
  button: {
    color: "#343a40",
    background: "#fff",
    border: "none",
    padding: "8px",
    "&:active": {
      outline: "none"
    },
    [theme.breakpoints.down("sm")]: {
      padding: "7px 0"
    }
  },
  brandImg: {
    width: "45px",
    height: "45px",
    marginRight: "0.5rem",
    [theme.breakpoints.down("sm")]: {
      width: "35px",
      height: "35px"
    }
  }
}));

function NavMenu() {
  const classes = useStyles();
  const contextValue = useContext(UserContext);
  const [collapsed, setCollapsed] = useState(true);

  const toggleNavbar = () => {
    setCollapsed(!collapsed);
  };

  const handleLogout = () => {
    logout();
    contextValue.logoutSession();
  };

  const loggedIn = contextValue.session.isAuthenticated;

  return (
    <header>
      <Navbar
        className="navbar-expand-sm navbar-toggleable-sm ng-white border-bottom box-shadow mb-3"
        light
      >
        <Container>
          <NavbarBrand tag={Link} to="/">
            <img
              src={require("../logo.png")}
              alt="Book Icon"
              className={classes.brandImg}
            />
            BookRepository
          </NavbarBrand>
          <NavbarToggler onClick={toggleNavbar} className="mr-2" />
          <Collapse
            className="d-sm-inline-flex flex-sm-row-reverse"
            isOpen={!collapsed}
            navbar
          >
            <ul className="navbar-nav flex-grow">
              {loggedIn ? (
                <React.Fragment>
                  <NavItem>
                    <NavLink tag={Link} className="text-dark" to="/books">
                      My Books
                    </NavLink>
                  </NavItem>
                  <NavItem onClick={handleLogout}>
                    <button className={classes.button}>Logout</button>
                  </NavItem>
                </React.Fragment>
              ) : (
                <React.Fragment>
                  <NavItem>
                    <NavLink tag={Link} className="text-dark" to="/login">
                      Login
                    </NavLink>
                  </NavItem>
                  <NavItem>
                    <NavLink tag={Link} className="text-dark" to="/signup">
                      Signup
                    </NavLink>
                  </NavItem>
                </React.Fragment>
              )}
            </ul>
          </Collapse>
        </Container>
      </Navbar>
    </header>
  );
}

export default NavMenu;
