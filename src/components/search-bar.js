import React, {Component, PropTypes} from 'react';
import {compose} from 'redux';
import {connect} from 'react-redux';

import {selectSearch} from '../reducer';


export const InputSearch = ({query}) => (
    <input data-focus='search-bar-input' onChange={({target : {value}}) => query({term : value})}></input>
);
const InputSearchConnected = InputSearch;

//TO PAS DE PROPS
export const ActionQueryContainer = (props) => (
    <div data-focus='search-bar-query-container'>
        <div>Que recherchez-vous ?</div>
        <div>{props.children}</div>
    </div>
);

export const ScopeSelection = ({group, query}) => (
    <select data-focus='search-bar-scope-selection' onChange= {({target : {value}})=> value==='all' ? group({name:value}) : query({scope: value}) }>
        <option value='scope 1'>Scope 2</option>
        <option value='scope 2'>Scope 1</option>
        <option value='all'>All</option>
    </select>
);
const ScopeSelectionConnected = ScopeSelection;

const SearchBar = ({query, group}) => (
    <div data-focus='search-bar'>
        <ActionQueryContainer>
            <ScopeSelectionConnected group={group} query={query}/>
            <InputSearchConnected query={query}/>
        </ActionQueryContainer>
    </div>
);
export default SearchBar;
