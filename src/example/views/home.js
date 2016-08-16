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


const Home = ({valuesForResults,unitSearchDispatch,  facetListWithselectedInformation, sort, group,data, query, facet, isGroup}) =>  {
  return <div style={{color: 'orange'}}>
    {/*<SearchComponent/>*/}
    {/*<OtherSearchComponent/>*/}
    {/*<SearchWithComponent/>*/}
    {/*<ToolBar listGroup={metaDataProps.groupList} listSort={metaDataProps.sortList} sort={sort} group={group}/>*/}
    <ActionQuery group={unitSearchDispatch.group} query={unitSearchDispatch.query}/>
    {isGroup ?
      <ResultGroup isGroup={isGroup}
            data={valuesForResults}
            sort={unitSearchDispatch.sort}
            group={unitSearchDispatch.group}
            /> :
      <ResultList sort={unitSearchDispatch.sort}
            group={unitSearchDispatch.group}
            data={valuesForResults.values}
            sortList={valuesForResults.sortList}
            groupList={valuesForResults.groupList}
            LineComponent={valuesForResults.LineComponent}
            />
    }
    <FacetPanel data={facetListWithselectedInformation}
              facet={unitSearchDispatch.facet}
              title='My awesome facets'/>
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
