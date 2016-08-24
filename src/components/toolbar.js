import React, {Component, PureComponent, PropTypes} from 'react';
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
export class ToolBar extends PureComponent {
  render () {
    const {toolbarProps : {groupList,sortList,  sort, group,isGroup} ,selectState, toggleAllLine} = this.props;
    _checkProps(groupList, sortList);
    const label = selectState ? 'Unselect' : 'Select '
    return <div data-focus="toolbar">
        <ToolBarContainer>
          <button onClick={() => toggleAllLine()}>{label}</button>
          <span style={{margin: '5px', color: 'blue'}}>Sort</span>
          <ToolbarSort sort={sort} listSort={sortList}/>

          { !isGroup &&  <span style={{margin: '5px', color: 'blue'}} >Group</span>}
          {!isGroup && <ToolbarGroup group={group} listGroup={groupList}/>}
        </ToolBarContainer>
    </div>
  }

}

// export function ToolBar({listSort,toggleAllLine, listGroup, sort, group, isGroup, selectState}){
//
// }

export function ToolBarContainer(props){
  return <div data-focus='toolbar-container'  className='mdl-grid mdl-shadow--3dp' style={{margin: '10 0 10 0'}}><span style={{margin: '5px'}}>{props.title}</span>{props.children}</div>
}

const ToolBarConnected =ToolBar;

export default ToolBarConnected;

ToolBar.defaultProps = {
  listSort: [],
  listGroup: []
}

ToolBar.propTypes = {
  toolbarProps: PropTypes.shape ({
    sort: PropTypes.func.isRequired,
    group: PropTypes.func.isRequired,
    sortList : PropTypes.array.isRequired,
    groupList : PropTypes.array.isRequired,
  })
}
