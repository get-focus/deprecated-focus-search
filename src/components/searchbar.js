import React, {Component, PropTypes} from 'react';
import {compose} from 'redux';
import {connect} from 'react-redux';

import {selectSearch} from '../reducer';

function SearchBar ({query}) {
  return <input onChange={({target : {value}}) => query({term : value})}></input>
}

const searchbarSelector = compose(
  selectSearch('advancedSearch')
)

const SearchBarConnected = connect(searchbarSelector, dispatch => ({
  query: query => dispatch({
    type: 'ADVANCEDSEARCH_UPDATE_QUERY',
    query: query
  })
}))(SearchBar)


function ActionQueryContainer (props) {
  return <div className='mdl-grid mdl-shadow--3dp' style={{padding : '50 0 50 0', display : 'flex', alignItems:'center', flexDirection: 'column'}} >

  <div style={{color: 'green'}}><span>Que recherchez-vous ?</span></div>
  <div style={{display : 'flex', justifyContent:'center'}}>{props.children}</div>

  </div>
}

function ScopeSelection ({group}) {
  return <select onChange= {({target : {value}})=> group({name:value}) }>
    <option value='scope 1'>Scope 2</option>
    <option value='scope 2'>Scope 1</option>
    <option value='all' selected>All</option>
  </select>
}

const ScopeSelectionConnected = connect(searchbarSelector, dispatch => ({
  group: group => dispatch({
    type: 'ADVANCEDSEARCH_UPDATE_GROUP',
    group: group
  })
}))(ScopeSelection)

export function ActionBar () {
  return(
    <ActionQueryContainer>
      <ScopeSelectionConnected/>
      <SearchBarConnected/>
    </ActionQueryContainer>
  )

}

export default ActionBar
