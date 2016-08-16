import compose from 'lodash/flowRight';
import React, {Component, PropTypes} from 'react';
import {unitSearchActions, searchAction as search} from '../actions/search-actions';
import {connect as connectToSearch} from '../../behaviours/search';
import {AdvancedSearch} from '../../components/advanced-search';

const searchOptions={
  searchName : 'advancedSearch',
  unitSearch : unitSearchActions
}
const ConnectedComponentAdvancedSearch = compose (
  connectToSearch(searchOptions)
)(AdvancedSearch)

const Home = () =>  {
  return <div style={{color: 'orange'}}>
    <ConnectedComponentAdvancedSearch/>
  </div>;
}


export default Home;
