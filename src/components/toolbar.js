import React, {Component, PureComponent, PropTypes} from 'react';
import {compose} from 'redux';
import {connect} from 'react-redux';
import isArray from 'lodash/isArray';
import reduce from 'lodash/reduce';
import concat from 'lodash/concat';
import {selectSearch} from '../reducer';
import Button from 'focus-components/components/button';
import Dropdown from './temporary/dropdown';


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

export function ToolbarSort({listSort, sort}) {
    const operationList = reduce(listSort, (result, item) => concat(result, _buildSortAction(item, 'asc', sort), _buildSortAction(item, 'desc', sort)), []);
    const buttonProps = {icon: undefined, label: 'Trier', shape: null};
    return <Dropdown operationList={operationList} buttonProps={buttonProps} />;
};

function _checkProps(listSort, listGroup){
    if(!isArray(listSort) || listSort.length < 1) {
        throw new Error("You must provide a array for the listGroup not empty in the SearchProvider")
    }
    if(!isArray(listGroup) || listGroup.length < 1) {
        throw new Error("You must provide a array fort the listSort in not empty in the SearchProvider")
    }
};

export function ToolbarGroup({listGroup, group}) {
    const operationList = reduce(listGroup, (result, item) => concat(result, _buildGroupAction(item, group)), []);
    const buttonProps = {icon: undefined, label: 'Grouper', shape: null};
    return <Dropdown operationList={operationList} buttonProps={buttonProps} />;
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
ToolbarSelection.propTypes = {
    selectState: PropTypes.bool,
    toggleAllLine: PropTypes.func
};


const ToolBar = ({toolbarProps : {groupList, sortList, sort, group, isGroup}, selectState, toggleAllLine}) => {
    _checkProps(groupList, sortList);
    return (
        <div data-focus='toolbar' className='mdl-grid mdl-shadow--3dp'>
            <ToolbarSelection selectState={selectState} toggleAllLine={toggleAllLine} />
            <ToolbarSort sort={sort} listSort={sortList} />
            {!isGroup && <ToolbarGroup group={group} listGroup={groupList} />}
        </div>
    );
};
const ToolBarConnected = ToolBar;
export default ToolBarConnected;
ToolBar.defaultProps = {
    listSort: [],
    listGroup: []
};
ToolBar.propTypes = {
    toolbarProps: PropTypes.shape ({
        sort: PropTypes.func.isRequired,
        group: PropTypes.func.isRequired,
        sortList : PropTypes.array.isRequired,
        groupList : PropTypes.array.isRequired,
    }),
    selectState: PropTypes.bool,
    toggleAllLine: PropTypes.func
};
