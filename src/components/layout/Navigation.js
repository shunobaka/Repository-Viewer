/**
 * @fileoverview Defines a Navigation react component that renders a navbar.
 */
import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { Navbar, Form, FormControl, Button } from 'react-bootstrap';

/**
 * Navigation react component that renders a navbar.
 */
const Navigation = () => {
  const [userInput, setUserInput] = useState('');
  const history = useHistory();

  const onChange = (e) => {
    setUserInput(e.target.value);
  };

  const onSubmit = (e) => {
    e.preventDefault();
    history.push(`/search/${userInput}`);
  };

  return (
    <Navbar bg="dark" expand="lg">
      <Navbar.Brand>
        <Link to="/" className="home-button">
          Home
        </Link>
      </Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Form inline className="ml-auto" onSubmit={onSubmit}>
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
