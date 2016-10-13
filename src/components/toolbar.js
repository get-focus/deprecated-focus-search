import React, {Component, PureComponent, PropTypes} from 'react';
import {compose} from 'redux';
import {connect} from 'react-redux';
import isArray from 'lodash/isArray';
import reduce from 'lodash/reduce';
import concat from 'lodash/concat';

import {selectSearch} from '../reducer';
import Button from 'focus-components/button';
import Dropdown from 'focus-components/dropdown';


function _buildSortAction(item, order, sortAction) {
    return {
        label: `${item} ${order}`,
        action: () => sortAction({name: item, order: order})
    };
};

function _buildGroupAction(item, groupAction) {
    const groupCreate = item.code === "ungroup" ? {} : {name: item.code}
    return {
        label: `${item.label}`,
        action: () => groupAction(groupCreate)
    };
};

function _checkProps(sortList, groupList){
    if(!isArray(sortList) || sortList.length < 1) {
        throw new Error("You must provide a array for the groupList not empty in the SearchProvider")
    }
    if(!isArray(groupList) || groupList.length < 1) {
        throw new Error("You must provide a array fort the sortList in not empty in the SearchProvider")
    }
};

export function ToolbarSort({sortList, sortAction}) {
    const operationList = reduce(sortList, (result, item) => concat(result, _buildSortAction(item, 'asc', sortAction), _buildSortAction(item, 'desc', sortAction)), []);
    const buttonProps = {icon: undefined, label: 'Trier', shape: null};
    return ( <Dropdown data-focus='toolbar-sort' operations={operationList} button={buttonProps} />);
};
ToolbarSort.displayName = 'ToolbarSort';
ToolbarSort.propTypes = {
    sort: PropTypes.func.isRequired,
    sortList : PropTypes.array
};



export function ToolbarGroup({groupList, groupAction}) {
    const operationList = reduce(groupList, (result, item) => concat(result, _buildGroupAction(item, groupAction)), []);
    const buttonProps = {icon: undefined, label: 'Grouper', shape: null};
    return ( <Dropdown data-focus='toolbar-group' operations={operationList} button={buttonProps} />);
};
ToolbarGroup.displayName = 'ToolbarGroup';
ToolbarGroup.propTypes = {
    group: PropTypes.func.isRequired,
    groupList : PropTypes.array
};

const ToolbarSelection = ({selectState, toggleAllLine}) => {
    //<i class="material-icons">indeterminate_check_box</i>
    return (
        <span>
            {selectState && <Button onClick={toggleAllLine} icon='check_box' shape='icon' />}
            {!selectState && <Button onClick={toggleAllLine} icon='check_box_outline_blank' shape='icon' /> }
        </span>
    );
};
ToolbarSelection.displayName = 'ToolbarSelection';
ToolbarSelection.propTypes = {
    selectState: PropTypes.bool,
    toggleAllLine: PropTypes.func
};


const ToolBar = ({groupList, sortList,groupSelect, sortAction, groupAction, isGroup, selectState, toggleAllLine}) => {
    const toolBarGroup = groupList.reduce((array, item)=> {
      if(groupSelect &&  groupSelect.name !== item.code) array.push(item);
      else array.push({code: 'ungroup', label:'ungroup'})
      return array;
    }, [])
    return (
        <div data-focus='toolbar' className='mdl-grid mdl-shadow--3dp'>
            <ToolbarSelection selectState={selectState} toggleAllLine={toggleAllLine} />
            {sortList && <ToolbarSort sortAction={sortAction} sortList={sortList} />}
            {!isGroup && groupList && <ToolbarGroup groupAction={groupAction} groupList={groupList} />}
            {isGroup && groupList && <ToolbarGroup groupAction={groupAction} groupList={toolBarGroup} />}

        </div>
    );
};
ToolBar.displayName = 'ToolBar';
ToolBar.defaultProps = {
    toolbarProps: {
        sort: () => console.warn('please define a sort function...'),
        group: () => console.warn('please define a group function...'),
        sortList: [],
        groupList: []
    },
    selectState: false,
    toggleAllLine: undefined
};
ToolBar.propTypes = {
    toolbarProps: PropTypes.shape({
        sort: PropTypes.func.isRequired,
        group: PropTypes.func.isRequired,
        sortList: PropTypes.array,
        groupList: PropTypes.array,
    }),
    selectState: PropTypes.bool,
    toggleAllLine: PropTypes.func
};
const ToolBarConnected = ToolBar;
export default ToolBarConnected;
