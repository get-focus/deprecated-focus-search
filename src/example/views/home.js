import compose from 'lodash/flowRight';
import React, {Component, PropTypes} from 'react';
import {unitSearchActions, searchAction as search} from '../actions/search-actions';
import {connect as connectToSearch} from '../../behaviours/search';
import AdvancedSearch from '../../components/advanced-search';
import SearchBar from '../../components/search-bar';

const searchOptions= {
    searchName : 'advancedSearch',
    unitSearch : unitSearchActions
};
const ConnectedComponentAdvancedSearch = compose (
    connectToSearch(searchOptions)
)(AdvancedSearch);
const SearchBarComponent = ({unitSearchDispatch}) => (
    <SearchBar group={unitSearchDispatch.group} query={unitSearchDispatch.query}/>
);
const ConnectedSearchBarComponent = compose(
    connectToSearch(searchOptions)
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
