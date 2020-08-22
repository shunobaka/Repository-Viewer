import React from 'react';
import { Navbar, Form, FormControl, Button } from 'react-bootstrap';

const Navigation = () => {
  return (
    <Navbar bg="light" expand="lg">
      <Navbar.Brand href="#home">Home</Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Form inline className="ml-auto">
          <FormControl
            type="text"
            placeholder="Github User"
            className="mr-sm-2"
          />
          <Button variant="outline-success">View</Button>
        </Form>
      </Navbar.Collapse>
    </Navbar>
  );
};

export default Navigation;
