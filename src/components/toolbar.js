import React, {Component, PropTypes} from 'react';
import {compose} from 'redux';
import {connect} from 'react-redux';
import isArray from 'lodash/isArray';
import {selectSearch} from '../reducer';

export function ToolbarSort({listSort, sort}){
  return <select data-focus='select-sort' onChange={({target:{value}}) =>{
      sort({name:value.split('-')[0] , order: value.split('-')[1]})
      }}>
        {
          listSort.map((element, idx) => {
            return <optgroup label={element} key={idx}>
                      <option data-focus='option-sort' value={element+"-asc"}>{element} Croissant</option>
                      <option data-focus='option-sort' value={element+"-desc"}>{element} Décroissant</option>
                   </optgroup>
          })
        }
  </select>
}

function _checkProps(listSort, listGroup){
  if(!isArray(listSort) || listSort.length < 1){
     throw new Error("You must provide a array for the listGroup not empty in the SearchProvider")
  }
  if(!isArray(listGroup) || listGroup.length < 1){
     throw new Error("You must provide a array fort the listSort in not empty in the SearchProvider")
  }
}

export function ToolbarGroup({listGroup, group}){
  return <select data-focus='select-group' onChange={({target:{value}}) => group({name:value})}>
  {
    listGroup.map((element, idx) => {
      return <option key={idx} data-focus='option-group' value={element}>{element}</option>
    })
  }
  </select>
}


export function ToolBar({listSort, listGroup, sort, group}){

  _checkProps(listGroup, listSort)
  return <div data-focus="toolbar">
      <ToolBarContainer>
        <span style={{margin: '5px', color: 'blue'}}>Sort</span>
        <ToolbarSort sort={sort} listSort={listSort}/>

        <span style={{margin: '5px', color: 'blue'}} >Group</span>
        <ToolbarGroup group={group} listGroup={listGroup}/>

      </ToolBarContainer>
  </div>
}

export function ToolBarContainer(props){
  return <div data-focus='toolbar-container'  className='mdl-grid mdl-shadow--3dp' style={{margin: '10 0 10 0'}}><span style={{margin: '5px'}}>{props.title} Bonjour je suis une belle toolBar de la classe !</span>{props.children}</div>
}

const ToolBarConnected =ToolBar;

export default ToolBarConnected;

ToolBar.defaultProps = {
  listSort: [],
  listGroup: []
}

ToolBar.propTypes = {
  sort: PropTypes.func.isRequired,
  group: PropTypes.func.isRequired,
  listSort : PropTypes.array.isRequired,
  listGroup : PropTypes.array.isRequired,
}
