import React, {Component, PropTypes} from 'react';
import {compose} from 'redux';
import {connect} from 'react-redux';
import InputText from 'focus-components/components/input/text';
import InputSelect from './temporary/select';

import {selectSearch} from '../reducer';

export function SearchBarInput({query}) {
    return <InputText data-focus='search-bar-input' name='search-bar-input' onChange={(value) => query({term : value})} />
}
SearchBarInput.propTypes= {
    query: PropTypes.func
}
const SearchBarInputConnected =SearchBarInput;




export function SearchBarScopeSelection({group, query, scope, scopes, scopeFunction}) {
    return <InputSelect data-focus='search-bar-scope-selection' hasUndefined={false} values={scopes} valueKey='value' value={scope || 'all'} name='search-scope' onChange={(value) => value==='all' ? scopeFunction({group: {name:value}, query:{scope: null}}) : query({scope: value})} />
}
SearchBarScopeSelection.defaultProps = {
    scopes: []
}
const SearchBarScopeSelectionConnected = SearchBarScopeSelection



export function SearchBar({query, group, title,scopes, scope,scopeFunction}) {
    return (
        <div data-focus='search-bar'>
            <SearchBarScopeSelectionConnected group={group} query={query} scopeFunction={scopeFunction} scopes={scopes} scope={scope}/>
            <SearchBarInputConnected query={query}/>
        </div>
    );
};
SearchBar.PropTypes ={
    query: PropTypes.func,
    group: PropTypes.func
}
export default SearchBar;
