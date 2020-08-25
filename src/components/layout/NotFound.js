/**
 * @fileoverview Defines a NotFound react component that renders a simple not-found page.
 */
import React from 'react';

/**
 * NotFound react component that renders a simple not-found page.
 */
const NotFound = () => {
  return (
    <section className="landing">
      <div className="landing-inner">
        <h1>The requested page was not found.</h1>
        <h3>Please try again.</h3>
      </div>
    </section>
  );
};

export default NotFound;
