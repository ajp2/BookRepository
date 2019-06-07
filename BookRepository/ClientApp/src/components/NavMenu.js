import React, { Component, useState, useContext } from "react";
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

function NavMenu() {
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
                <NavItem onClick={handleLogout}>
                  <button>Logout</button>
                </NavItem>
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

// class NavMenu extends Component {
//   static contextType = UserContext;

//   state = {
//     collapsed: true
//   };

//   toggleNavbar = () => {
//     this.setState({ collapsed: !this.state.collapsed });
//   };

//   handleLogout = () => {
//     logout();
//     this.context.logoutSession();
//   };

//   render() {
//     const loggedIn = this.context.session.isAuthenticated;

//     return (
//       <header>
//         <Navbar
//           className="navbar-expand-sm navbar-toggleable-sm ng-white border-bottom box-shadow mb-3"
//           light
//         >
//           <Container>
//             <NavbarBrand tag={Link} to="/">
//               BookRepository
//             </NavbarBrand>
//             <NavbarToggler onClick={this.toggleNavbar} className="mr-2" />
//             <Collapse
//               className="d-sm-inline-flex flex-sm-row-reverse"
//               isOpen={!this.state.collapsed}
//               navbar
//             >
//               <ul className="navbar-nav flex-grow">
//                 {loggedIn ? (
//                   <NavItem onClick={this.handleLogout}>
//                     <button>Logout</button>
//                   </NavItem>
//                 ) : (
//                   <React.Fragment>
//                     <NavItem>
//                       <NavLink tag={Link} className="text-dark" to="/login">
//                         Login
//                       </NavLink>
//                     </NavItem>
//                     <NavItem>
//                       <NavLink tag={Link} className="text-dark" to="/signup">
//                         Signup
//                       </NavLink>
//                     </NavItem>
//                   </React.Fragment>
//                 )}
//               </ul>
//             </Collapse>
//           </Container>
//         </Navbar>
//       </header>
//     );
//   }
// }

export default NavMenu;
