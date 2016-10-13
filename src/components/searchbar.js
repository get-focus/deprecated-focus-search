import React, {Component, PropTypes} from 'react';
import {compose} from 'redux';
import {connect} from 'react-redux';
import InputText from 'focus-components/input-text';
import InputSelect from 'focus-components/select-mdl';

import {selectSearch} from '../reducer';

export function SearchBarInput({queryAction}) {
    return <InputText data-focus='search-bar-input' name='search-bar-input' onChange={(value) => queryAction({term : value})} />
};
SearchBarInput.propTypes= {
    query: PropTypes.func
};
const SearchBarInputConnected =SearchBarInput;




export function SearchBarScopeSelection({scope, scopes, scopeAction}) {
    return (
        <InputSelect data-focus='search-bar-scope-selection'
            hasUndefined={false} values={scopes}
            valueKey='value'
            value={scope || 'ALL'}
            name='search-scope'
            onChange={
                (value) => value === 'ALL' ?
                scopeAction({group: {value: {name: value}, replace: false}, query:{value: {scope: null}, replace: false}})
                :
                scopeAction({query: {value :{scope: value}, replace: false}, group: {value: {}, replace: true}})
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



export function SearchBar({queryAction, scopes, scope, scopeAction}) {
    return (
        <div data-focus='search-bar'>
            <SearchBarScopeSelectionConnected
                scopeAction={scopeAction} scopes={scopes} scope={scope} />
            <SearchBarInputConnected queryAction={queryAction}/>
        </div>
    );
};
SearchBar.PropTypes ={
    query: PropTypes.func,
    group: PropTypes.func
};
