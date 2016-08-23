import compose from 'lodash/flowRight';
import React, {Component, PropTypes} from 'react';
import {unitSearchActions, searchAction as search} from '../actions/search-actions';
import {connect as connectToSearch} from '../../behaviours/search';
import {connect as connectToState} from 'react-redux';
import AdvancedSearch from '../../components/advanced-search';
import SearchBar from '../../components/searchbar';


console.log(unitSearchActions)
const searchOptions= {
    searchName : 'advancedSearch',
    unitSearch : unitSearchActions
};
const ConnectedComponentAdvancedSearch = compose (
    connectToSearch(searchOptions)
)(AdvancedSearch);
const SearchBarComponent = ({group, query}) => (
    <SearchBar group={group} query={query}/>
);
const ConnectedSearchBarComponent = compose(
    connectToState(s=>s, d => ({
      group: element => d(unitSearchActions.updateGroup(element)),
      query: element => d(unitSearchActions.updateQuery(element))
    }))
)(SearchBarComponent);



const Home = () => (
    <div data-demo='home'>
        <div data-demo='header' className='mdl-shadow--3dp'>
            <ConnectedSearchBarComponent />
        </div>
        <div data-demo='content'>
            <ConnectedComponentAdvancedSearch/>;
        </div>
    </div>
);
Home.displayName = 'Home';
export default Home;
