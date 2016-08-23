import React, {Component, PropTypes} from 'react';
import {compose} from 'redux';
import {connect} from 'react-redux';
import isArray from 'lodash/isArray';
import {selectSearch} from '../reducer';


function _checkProps(listSort, listGroup) {
  if(!isArray(listSort) || listSort.length < 1){
     throw new Error('You must provide a array for the listGroup not empty in the SearchProvider')
  }
  if(!isArray(listGroup) || listGroup.length < 1){
     throw new Error('You must provide a array fort the listSort in not empty in the SearchProvider')
  }
};

export const ToolbarSort = ({listSort, sort}) => (
    <select data-focus='select-sort' onChange={({target:{value}}) => { sort({name:value.split('-')[0] , order: value.split('-')[1]}) }}>
        {listSort.map((element, idx) => (
            <optgroup label={element} key={idx}>
                <option data-focus='option-sort' value={element+'-asc'}>{element} Croissant</option>
                <option data-focus='option-sort' value={element+'-desc'}>{element} Décroissant</option>
            </optgroup>
        ))}
    </select>
);

export const ToolbarGroup = ({listGroup, group}) => (
    <select data-focus='select-group' onChange={({target:{value}}) => group({name:value})}>
        {listGroup.map((element, idx) => { return <option key={idx} data-focus='option-group' value={element}>{element}</option> })}
    </select>
);


export function ToolBar({listSort, listGroup, sort, group, isGroup}) {
    _checkProps(listGroup, listSort)
    const hasSort = listGroup && listGroup.length > 0;
    const hasGroup = !isGroup;
    return (
        <div data-focus='toolbar' className='mdl-grid mdl-shadow--3dp'>
            {_checkProps &&
                <div>
                    <span>Sort</span>
                    <ToolbarSort sort={sort} listSort={listSort}/>
                </div>
            }
            {hasGroup &&
                <div>
                    <span>Group</span>
                    <ToolbarGroup group={group} listGroup={listGroup}/>
                </div>
            }
        </div>
    );
}
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
ToolBar.displayName = 'Toolbar';
const ToolBarConnected = ToolBar;
ToolBarConnected.displayName = 'ToolBarConnected';
export default ToolBarConnected;
