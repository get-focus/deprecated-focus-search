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

export function ScopeSelection({group, query, scope, scopes, scopeFunction}) {
    return <select data-focus='scope-selection' value={scope || 'all'} onChange= {({target : {value}})=> value==='all' ? scopeFunction({group: {name:value}, query:{scope: null}}) : query({scope: value}) }>
          {scopes.map(element =>  <option value={element.value}>{element.label}</option>)}
    </select>
}
const SearchBarScopeSelectionConnected = SearchBarScopeSelection



export function ActionBar({query, group, title,scopes, scope,scopeFunction}) {
    return (
        <div data-focus='action-bar'>
            <ActionQueryContainer title={title}>
                <ScopeSelectionConnected group={group} query={query} scopeFunction={scopeFunction} scopes={scopes} scope={scope}/>
                <SearchBarConnected query={query}/>
            </ActionQueryContainer>
        </div>
    );
};
SearchBar.PropTypes ={
    query: PropTypes.func,
    group: PropTypes.func
}
export default SearchBar;
