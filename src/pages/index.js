import React from 'react';
import {Router} from "@reach/router"

import Page from '../components/Page';

import '../assets/styles/reset.css';
import '../assets/styles/variables.css';

const Index = () => (
  <Router>
    <Page default="/" />
  </Router>
);

export default Index;
