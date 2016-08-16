import {connect as connectToState} from 'react-redux';
import compose from 'lodash/flowRight';
import Button from './components/button';
import {connect} from 'react-redux';

import React, {Component, PropTypes} from 'react';
import map from 'lodash/map';
import SearchComponent from './searchComponent'
import OtherSearchComponent from './otherSearchComponent'
import SearchWithComponent from './searchWithComponent'

import {unitSearchActions, searchAction as search} from '../actions/search-actions'

import {facetListWithselectedInformation, selectSearch} from '../../reducer'

import {connect as connectToSearch} from '../../behaviours/search'

import {AdvancedSearch} from '../../components/advanced-search'

const searchOptions={
  searchName : 'advancedSearch',
  unitSearch : unitSearchActions
}
const ConnectedComponentAdvancedSearch = compose (
  connectToSearch(searchOptions)
)(AdvancedSearch)

const Home = ({valuesForResults,unitSearchDispatch,  facetListWithselectedInformation, sort, group,data, query, facet, isGroup}) =>  {
  return <div style={{color: 'orange'}}>
    <ConnectedComponentAdvancedSearch/>
  </div>;
}


export default Home;
