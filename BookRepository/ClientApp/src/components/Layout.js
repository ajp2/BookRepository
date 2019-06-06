import React from "react";
import { Container } from "reactstrap";
import NavMenu from "./NavMenu";
import "./layout.css";

function Layout({ children }) {
  return (
    <div>
      <NavMenu />
      <Container>{children}</Container>
    </div>
  );
}

export default Layout;
