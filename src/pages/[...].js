import React from 'react';
import { Router } from '@reach/router';
import 'assets/styles/fonts.css';
import 'assets/styles/reset.css';
import Page from 'components/Page';

const Index = () => (
  <Router basepath="/">
    <Page path="/*" />
  </Router>
);

export default Index;
