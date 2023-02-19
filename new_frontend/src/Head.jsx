import React from 'react';
import { Helmet } from 'react-helmet';

const Head = ({ title }) => {
  return (
    <Helmet>
      <title>{title} - IntelliQ</title>
    </Helmet>
  );
};

export default Head;