import React, {Component, PropTypes} from 'react';
import {compose} from 'redux';
import {connect} from 'react-redux';

import {selectSearch} from '../reducer'

export function ToolBar(props){
  return <ToolBarContainer>
    <button onClick={() =>props.sort({name:'lalaSort' , order: 'lolSort'})}>Sort</button>
    <button onClick={() =>props.group({name:'lalaGroup' , order: 'lolGroup'})}>Group</button>
  </ToolBarContainer>
}

export function ToolBarContainer(props){
  return <div className='mdl-grid mdl-shadow--3dp' style={{margin: '10 0 10 0'}}>{props.title} Bonjour je suis une belle toolBar de la classe !{props.children}</div>
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
