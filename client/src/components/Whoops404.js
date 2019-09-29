import React from 'react';

export const Whoops404 = ({ location }) => {
  return (
    <>
      <div className="whoops404">
        <h1>Resource not found at <code>'{location.pathname}'</code></h1>
      </div>
    </>
  );
};