import {connect as connectToState} from 'react-redux';
import compose from 'lodash/flowRight';
import Button from './components/button';
import {connect} from 'react-redux';

import React, {Component, PropTypes} from 'react';
import map from 'lodash/map';
import SearchComponent from './searchComponent'
import OtherSearchComponent from './otherSearchComponent'
import SearchWithComponent from './searchWithComponent'
import {ResultList, ResultGroup} from '../../components/results';
import {unitSearchActions, searchAction as search} from '../actions/search-actions'

import {facetListWithselectedInformation, selectSearch} from '../../reducer'

import {connect as connectToSearch} from '../../behaviours/search'
import FacetPanel from '../../components/facet';
import ToolBar from '../../components/toolbar';
import ActionQuery from '../../components/searchbar';


const Home = ({sortList,groupList , metaDataProps, sort, group, query, facet, LineComponent, data, values, isGroup}) =>  {

  return <div style={{color: 'orange'}}>
    {/*<SearchComponent/>*/}
    {/*<OtherSearchComponent/>*/}
    {/*<SearchWithComponent/>*/}
    <ActionQuery group={group} query={query}/>
    {/*<ToolBar listGroup={metaDataProps.groupList} listSort={metaDataProps.sortList} sort={sort} group={group}/>*/}

    {isGroup ?
      <ResultGroup isGroup={isGroup} data={values} sort={sort} group={group}/> :
      <ResultList sort={sort} group={group} data={values} sortList={sortList} groupList={groupList} LineComponent={LineComponent}/>
    }
    <FacetPanel data={data} facet={facet} title='My awesome facets'/>
  </div>;
}

const searchOptions={
    searchName : 'advancedSearch',
    unitSearch : unitSearchActions
}

const ConnectedComponentHome = compose (
  connectToSearch(searchOptions)
)(Home)
export default ConnectedComponentHome;
