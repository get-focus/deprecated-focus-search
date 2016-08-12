import React, {Component, PropTypes} from 'react';
import {compose} from 'redux';
import {connect} from 'react-redux';

import {selectSearch} from '../reducer';

export function SearchBar ({query}) {
  return <input data-focus='searchbar' onChange={({target : {value}}) => query({term : value})}></input>
}


const SearchBarConnected =SearchBar;

//TO PAS DE PROPS

export function ActionQueryContainer (props) {
  return <div data-focus='action-query-container' className='mdl-grid mdl-shadow--3dp' style={{padding : '50 0 50 0', display : 'flex', alignItems:'center', flexDirection: 'column'}} >
  <div style={{color: 'green'}}><span>Que recherchez-vous ?</span></div>
  <div style={{display : 'flex', justifyContent:'center'}}>{props.children}</div>

  </div>
}

export function ScopeSelection ({group, query}) {
  return <select data-focus='scope-selection' onChange= {({target : {value}})=> value==='all' ? group({name:value}) : query({scope: value}) }>
    <option value='scope 1'>Scope 2</option>
    <option value='scope 2'>Scope 1</option>
    <option value='all'>All</option>
  </select>
}

const ScopeSelectionConnected = ScopeSelection

export function ActionBar ({query, group}) {
  return(
    <div data-focus='action-bar'>
    <ActionQueryContainer>
      <ScopeSelectionConnected group={group} query={query}/>
      <SearchBarConnected query={query}/>
    </ActionQueryContainer>
    </div>
  )

}

export default ActionBar
