import {connect as connectToState} from 'react-redux';
import compose from 'lodash/flowRight';
import Button from './components/button';
import React, {Component, PropTypes} from 'react';
import map from 'lodash/map';
import SearchComponent from './searchComponent'
import OtherSearchComponent from './otherSearchComponent'
import SearchWithComponent from './searchWithComponent'
import ResultPanel from '../../components/results';

import FacetPanel from '../../components/facet';
import ToolBar from '../../components/toolbar';
import ActionQuery from '../../components/searchbar';


const Home = () =>  {
  return <div style={{color: 'orange'}}>
    {/*<SearchComponent/>*/}
    {/*<OtherSearchComponent/>*/}
    {/*<SearchWithComponent/>*/}

    <ActionQuery/>
    <ToolBar title="ToolBar de la mort"/>
    <ResultPanel>
      {name => <div>{JSON.stringify(name)}</div>}
    </ResultPanel>
    <FacetPanel title='My awesome facets'/>
  </div>;
}

const ConnectedComponentHome = compose(
  connectToState(s => ({reduxState: s}))
)(Home)
export default ConnectedComponentHome;
