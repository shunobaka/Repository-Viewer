import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Navbar, Form, FormControl, Button } from 'react-bootstrap';

const Navigation = (props) => {
  const [userInput, setUserInput] = useState('');

  const onChange = (e) => {
    setUserInput(e.target.value);
  };

  return (
    <Navbar bg="dark" expand="lg">
      <Navbar.Brand href="/" className="home-button">
        Home
      </Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Form inline className="ml-auto">
          <FormControl
            type="text"
            placeholder="Username"
            className="mr-sm-2"
            value={userInput}
            onChange={onChange}
          />
          <Link to={`/search/${userInput}`}>
            <Button variant="outline-success">Search</Button>
          </Link>
        </Form>
      </Navbar.Collapse>
    </Navbar>
  );
};

export default Navigation;
