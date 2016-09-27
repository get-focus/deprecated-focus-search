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
    return {
        label: `${item}`,
        action: () => groupAction({name: item})
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

export function ToolbarSort({sortList, sort}) {
    const operationList = reduce(sortList, (result, item) => concat(result, _buildSortAction(item, 'asc', sort), _buildSortAction(item, 'desc', sort)), []);
    const buttonProps = {icon: undefined, label: 'Trier', shape: null};
    return <Dropdown data-focus='toolbar-sort' operations={operationList} button={buttonProps} />;
};
ToolbarSort.displayName = 'ToolbarSort';
ToolbarSort.propTypes = {
    sort: PropTypes.func.isRequired,
    sortList : PropTypes.array.isRequired
};



export function ToolbarGroup({groupList, group}) {
    const operationList = reduce(groupList, (result, item) => concat(result, _buildGroupAction(item, group)), []);
    const buttonProps = {icon: undefined, label: 'Grouper', shape: null};
    return <Dropdown data-focus='toolbar-group' operations={operationList} button={buttonProps} />;
};
ToolbarGroup.displayName = 'ToolbarGroup';
ToolbarGroup.propTypes = {
    group: PropTypes.func.isRequired,
    groupList : PropTypes.array.isRequired
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


const ToolBar = ({toolbarProps : {groupList, sortList, sort, group, isGroup}, selectState, toggleAllLine}) => {
    _checkProps(groupList, sortList);
    return (
        <div data-focus='toolbar' className='mdl-grid mdl-shadow--3dp'>
            <ToolbarSelection selectState={selectState} toggleAllLine={toggleAllLine} />
            <ToolbarSort sort={sort} sortList={sortList} />
            {!isGroup && <ToolbarGroup group={group} groupList={groupList} />}
        </div>
    );
};
ToolBar.displayName = 'ToolBar';
ToolBar.defaultProps = {
    toolbarProps: {
        sort: () => console.warn('please define a sort function...'),
        group: () => console.warn('please define a grou function...'),
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
        sortList: PropTypes.array.isRequired,
        groupList: PropTypes.array.isRequired,
    }),
    selectState: PropTypes.bool,
    toggleAllLine: PropTypes.func
};
const ToolBarConnected = ToolBar;
export default ToolBarConnected;
