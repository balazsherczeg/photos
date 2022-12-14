import React from 'react';
import { Router } from '@reach/router';
/* eslint-disable prettier/prettier */
import 'assets/styles/reset.css';
import 'assets/styles/fonts.css';
/* eslint-enable prettier/prettier */
import Page from 'components/Page';

const Index = () => (
  <Router basepath="/">
    <Page path="/*" />
  </Router>
);

export default Index;
