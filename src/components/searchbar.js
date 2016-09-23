import React, {Component, PropTypes} from 'react';
import {compose} from 'redux';
import {connect} from 'react-redux';
import InputText from 'focus-components/input-text';
import InputSelect from './temporary/select';

import {selectSearch} from '../reducer';

export function SearchBarInput({query}) {
    return <InputText data-focus='search-bar-input' name='search-bar-input' onChange={(value) => query({term : value})} />
};
SearchBarInput.propTypes= {
    query: PropTypes.func
};
const SearchBarInputConnected =SearchBarInput;




export function SearchBarScopeSelection({scope, scopes, scopeFunction}) {
    return (
        <InputSelect data-focus='search-bar-scope-selection'
            hasUndefined={false} values={scopes}
            valueKey='value'
            value={scope || 'all'}
            name='search-scope'
            onChange={
                (value) => value === 'all' ?
                scopeFunction({group: {value: {name: value}, replace: false}, query:{value: {scope: null}, replace: false}})
                :
                scopeFunction({query: {value :{scope: value}, replace: false}, group: {value: {name: 'all'}, replace: true}})
            }
            />
    );
};
SearchBarScopeSelection.propTypes = {
    scope: PropTypes.string,
    scopes: PropTypes.array.isRequired,
    scopeFunction: PropTypes.func
};
SearchBarScopeSelection.defaultProps = {
    scopes: []
};
const SearchBarScopeSelectionConnected = SearchBarScopeSelection;



export function SearchBar({query, group, scopes, scope, scopeFunction}) {
    return (
        <div data-focus='search-bar'>
            <SearchBarScopeSelectionConnected scopeFunction={scopeFunction} scopes={scopes} scope={scope} />
            <SearchBarInputConnected query={query}/>
        </div>
    );
};
SearchBar.PropTypes ={
    query: PropTypes.func,
    group: PropTypes.func
};
export default SearchBar;
