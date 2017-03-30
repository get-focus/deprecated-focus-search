import React, {PureComponent, PropTypes} from 'react';
import compose from 'lodash/flowRight';
import {connect as connectToSearch} from '../../behaviours/search';
import {unitQuickSearchActions, unitAdvancedSearchActions} from '../actions/search-actions';
import {QuickSearch} from '../../components/quick-search';
import SearchBar from '../../components/searchbar';
import i18next from 'i18next';
import Button from 'focus-components/button';
import Modal from 'focus-components/Modal';
import paginate from '../../behaviours/paginate';
import {AdvancedSearch} from '../../components/advanced-search';

const searchBarOptions = {
    searchName : 'advancedSearch',
    unitSearch : unitAdvancedSearchActions
};

// search bar component
class SearchBarComponent extends PureComponent {
    render() {
        const {onChange, SearchBarProps: {scope, scopes, term, unitSearchDispatch: {queryAction, scopeAction}}} = this.props;
        console.log('on change', onChange);
        return (
            <SearchBar
            onChange={onChange}
            queryAction={queryAction}
            scopes={scopes}
            scope={scope}
            placeholder={i18next.t(`search.bar.placeholder.${scope}`)}
            scopeAction={scopeAction}
            term={term} />
        );
    };
};
SearchBarComponent.displayName = 'SearchBarComponent';
SearchBarComponent.propTypes = {
    onChange: PropTypes.func
};

const ConnectedSearchBar = compose (
    connectToSearch(searchBarOptions)
)(SearchBarComponent);


const advancedSearchOptions = {
    paginateConnector: paginate,
    searchName: 'advancedSearch',
    unitSearch: unitAdvancedSearchActions
};

const ConnectedAdvancedSearch = compose(
    connectToSearch(advancedSearchOptions)
)(AdvancedSearch);

export const AdvancedSearchView = () => (
    <div>
        <ConnectedSearchBar />
        <ConnectedAdvancedSearch />
    </div>
)
