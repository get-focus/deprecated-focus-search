import React, {Component, PropTypes} from 'react';
import {compose} from 'redux';
import {connect} from 'react-redux';

import {selectSearch} from '../reducer';

export function ToolbarSort({listSort, sort}){
  return <select data-focus='select-sort' onChange={({target:{value}}) =>{
      sort({name:value.split('-')[0] , order: value.split('-')[1]})
      }}>
        {
          listSort.map(element => {
            return <div><option data-focus='option-sort' value={element+"-asc"}>{element} Asc</option>
                   <option data-focus='option-sort' value={element+"-desc"}>{element} Desc</option></div>
          })
        }
  </select>
}

export function ToolbarGroup({listGroup, group}){
  return <select data-focus='select-group' onChange={({target:{value}}) => group({name:value})}>
  {
    listGroup.map(element => {
      return <div><option data-focus='option-group' value={element}>{element}</option></div>
    })
  }
  </select>
}


export function ToolBar({listSort, listGroup, sort, group}){
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

export const toolBarSelector =   compose(
      selectSearch('advancedSearch')
  );
const ToolBarConnected =connect(toolBarSelector, dispatch => ({
  sort: sort => dispatch({
    type: 'ADVANCEDSEARCH_UPDATE_SORT',
    sort: sort
  }),
  group: group => dispatch({
    type: 'ADVANCEDSEARCH_UPDATE_GROUP',
    group: group
  })
}))(ToolBar);

export default ToolBarConnected;

ToolBar.defaultProps = {
  listSort: [
    "ouaaaaah",
    "trop",
    "bien"
  ],
  listGroup: [
    "ouaaaaah",
    "trop",
    "bien"
  ]
}

ToolBar.propTypes = {
  listSort : PropTypes.array.isRequired,
  listGroup : PropTypes.array.isRequired,
}
