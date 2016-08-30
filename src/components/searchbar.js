import React, {Component, PropTypes} from 'react';
import {compose} from 'redux';
import {connect} from 'react-redux';

import {selectSearch} from '../reducer';

export function SearchBar({query}) {
    return <input data-focus='searchbar' onChange={({target : {value}}) => query({term : value})}></input>
}
SearchBar.defaultProps= {

}
SearchBar.propTypes= {
  query: PropTypes.func
}


const SearchBarConnected =SearchBar;

//TODO PAS DE PROPS
//style={{padding : '50 0 50 0', display : 'flex', alignItems:'center', flexDirection: 'column'}}
export function ActionQueryContainer(props) {
    return <div data-focus='action-query-container'>
        <div>{props.title}</div>
        <div>{props.children}</div>
    </div>
}

ActionQueryContainer.defaultProps = {
  title: "Que recherchez-vous ?"
}
ActionQueryContainer.propTypes = {
  title: PropTypes.string
}

export function ScopeSelection({group, query, scope, scopes}) {
    return <select data-focus='scope-selection' value={scope || 'all'} onChange= {({target : {value}})=> value==='all' ? group({name:value}, false, true) : query({scope: value}) }>
          {scopes.map(element =>  <option value={element.value}>{element.label}</option>)}
    </select>
}

ScopeSelection.defaultProps= {
  scopes: []
}
ScopeSelection.propTypes= {
  scopes: PropTypes.array,
  query: PropTypes.func,
  group: PropTypes.func
}

const ScopeSelectionConnected = ScopeSelection

export function ActionBar({query, group, title,scopes, scope}) {
    return (
        <div data-focus='action-bar'>
            <ActionQueryContainer title={title}>
                <ScopeSelectionConnected group={group} query={query} scopes={scopes} scope={scope}/>
                <SearchBarConnected query={query}/>
            </ActionQueryContainer>
        </div>
    );
};

ActionBar.PropTypes ={
  title: PropTypes.string,
  query: PropTypes.func,
  group: PropTypes.func
}
export default ActionBar;
