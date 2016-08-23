import {connect as connectToState} from 'react-redux';
import compose from 'lodash/flowRight';
import Button from './components/button';
import React, {Component, PropTypes} from 'react';
import map from 'lodash/map';
import SearchComponent from './searchComponent'
import OtherSearchComponent from './otherSearchComponent';
import AdvancedSearch from '../../components/advanced-search';
import {unitSearchActions, searchAction} from '../actions/search-actions'


class SearchWithComponent extends Component {
    render () {
        return
            <AdvancedSearch action={searchAction.action}
                            deleteSelectedFacets={unitSearchActions.deleteSelectedFacets}
                            updateSelectedFacets={unitSearchActions.updateSelectedFacets}
            />;
    }
}

SearchWithComponent.displayName = 'SearchWithComponent';
export default SearchWithComponent;
