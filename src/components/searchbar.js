import React, {Component, PropTypes} from 'react';
import {compose} from 'redux';
import {connect} from 'react-redux';
import InputText from 'focus-components/components/input/text';
import InputSelect from '../components/select';

import {selectSearch} from '../reducer';

export function SearchBarInput({query}) {
    return <InputText data-focus='search-bar-input' name='search-bar-input' onChange={(value) => query({term : value})} />
}
SearchBarInput.propTypes= {
    query: PropTypes.func
}
const SearchBarInputConnected =SearchBarInput;




export function SearchBarScopeSelection({group, query, scope, scopes}) {
    return <InputSelect data-focus='search-bar-scope-selection' hasUndefined={false} values={scopes} valueKey='value' value={scope || 'all'} name='search-scope' onChange= {(value)=> value==='all' ? group({name:value}, false, true) : query({scope: value}) } />
}
SearchBarScopeSelection.defaultProps = {
    scopes: []
}
SearchBarScopeSelection.propTypes = {
    scopes: PropTypes.array,
    query: PropTypes.func,
    group: PropTypes.func
}
const SearchBarScopeSelectionConnected = SearchBarScopeSelection



export function SearchBar({query, group, title,scopes, scope}) {
    return (
        <div data-focus='search-bar'>
            <SearchBarScopeSelectionConnected group={group} query={query} scopes={scopes} scope={scope}/>
            <SearchBarInputConnected query={query}/>
        </div>
    );
};
SearchBar.PropTypes ={
    query: PropTypes.func,
    group: PropTypes.func
}
export default SearchBar;
