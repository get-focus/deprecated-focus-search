import {connect as connectToState} from 'react-redux';
import compose from 'lodash/flowRight';
import Button from './components/button';
import * as actionsSearch from '../../actions/action-search';
import React, {Component, PropTypes} from 'react';
import map from 'lodash/map';
import SearchComponent from './searchComponent'

const Home = () =>  {
  return <div style={{color: 'orange'}}>
    <SearchComponent/>
  </div>;
}

const ConnectedComponentHome = compose(
  connectToState(s => ({reduxState: s}))
)(Home)
export default ConnectedComponentHome;
