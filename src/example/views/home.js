import compose from 'lodash/flowRight';
import React, {Component, PropTypes} from 'react';

import SearchBar from '../../components/searchbar';


const Home = () => (
    <div data-demo='home'>
        <SearchBar queryAction={lol=> console.log('fjkdljsf')} hasFocus term='trucDedans'/>
    </div>
);
Home.displayName = 'Home';
export default Home;
