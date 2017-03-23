import React, {Component, PropTypes} from 'react';
import compose from 'lodash/flowRight';
import {connect as connectToSearch} from '../../behaviours/search';
import {SearchBar} from '../../components/searchbar';
import {unitSearchActions, searchAction as search} from '../actions/search-actions';
import {connect as connectToState} from 'react-redux';
import {QuickSearch} from '../../components/quick-search';

const searchOptions= {
    searchName : 'quickSearch',
    unitSearch : unitSearchActions
};
const ConnectedComponentAdvancedSearch = compose (
    connectToSearch(searchOptions)
)(QuickSearch);

const Home = () =>  (
    <div data-demo='home'>
        <div data-demo='header' className='mdl-shadow--3dp'>

        </div>
        <div data-demo='content'>
            Yyoyooyoyo
            <ConnectedComponentAdvancedSearch/>;
        </div>
    </div>
);

Home.displayName = 'Home';
export default Home;
