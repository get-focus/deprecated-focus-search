import compose from 'lodash/flowRight';
import React, {Component, PropTypes} from 'react';
import {unitSearchActions, searchAction as search} from '../actions/search-actions';
import {connect as connectToSearch} from '../../behaviours/search';
import {connect as connectToState} from 'react-redux';
import {AdvancedSearch} from '../../components/advanced-search';
import {SearchBar} from '../../components/searchbar';
import ToolBar from '../../components/toolbar';

const searchOptions= {
    searchName : 'advancedSearch',
    unitSearch : unitSearchActions
};
const ConnectedComponentAdvancedSearch = compose (
    connectToSearch(searchOptions)
)(AdvancedSearch);
const SearchBarComponent = ({unitSearchDispatch: { group, query, scopeFunction},scope, scopes}) => (
    <SearchBar group={group} query={query} scopes={scopes} scope={scope} scopeFunction={scopeFunction}/>
);
const ConnectedSearchBarComponent = compose(
  connectToSearch(searchOptions)
)(SearchBarComponent);



const Home = () => (
    <div data-demo='home'>
        <div data-demo='header' className='mdl-shadow--3dp'>
            <h2>Que recherchez-vous ?</h2>
            <ConnectedSearchBarComponent />
        </div>
        <div data-demo='content'>
          Yyoyooyoyo
            <ConnectedComponentAdvancedSearch/>;
        </div>
    </div>
);
Home.displayName = 'Home';
export default Home;
