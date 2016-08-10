import React, {Component, PropTypes} from 'react';
import {compose} from 'redux';
import {connect} from 'react-redux';

import {selectSearch} from '../reducer'

export function ToolBar({listSort, listGroup, sort, group}){
  return <ToolBarContainer>
    <span style={{margin: '5px', color: 'blue'}}>Sort</span>
    <select onChange={({target:{value}}) =>{
      sort({name:value.split('-')[0] , order: value.split('-')[1]})
    }}>
      {
        listSort.map(element => {
          return <div><option value={element+"-asc"}>{element} Asc</option>
                 <option value={element+"-desc"}>{element} Desc</option></div>
        })
      }

    </select>
    <span style={{margin: '5px', color: 'blue'}} >Group</span>
    <select onClick={({target:{value}}) => group({name:value})}>
    {
      listGroup.map(element => {
        return <div><option value={element}>{element}</option></div>
      })
    }
    </select>
  </ToolBarContainer>
}

export function ToolBarContainer(props){
  return <div className='mdl-grid mdl-shadow--3dp' style={{margin: '10 0 10 0'}}><span style={{margin: '5px'}}>{props.title} Bonjour je suis une belle toolBar de la classe !</span>{props.children}</div>
}

export const toolBarSelector =   compose(
      selectSearch('advancedSearch')
  );
export default connect(toolBarSelector, dispatch => ({
  sort: sort => dispatch({
    type: 'ADVANCEDSEARCH_UPDATE_SORT',
    sort: sort
  }),
  group: group => dispatch({
    type: 'ADVANCEDSEARCH_UPDATE_GROUP',
    group: group
  })
}))(ToolBar);



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
  listSort : PropTypes.array.required,
  listGroup : PropTypes.array.required,
}
