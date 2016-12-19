import React, {PropTypes, PureComponent} from 'react';
import {compose} from 'redux';
import {connect} from 'react-redux';
import isArray from 'lodash/isArray';
import reduce from 'lodash/reduce';
import concat from 'lodash/concat';
import camelCase from 'lodash/camelCase';
import i18next from 'i18next';

import {selectSearch} from '../reducer';
import Button from 'focus-components/button';
import Dropdown from 'focus-components/dropdown';


function _buildSortAction(scope, item, order, sortAction) {
    const classification = scope ? scope : 'all';
    return {
        label: i18next.t(`search.sort.${classification}.${camelCase(item)}.${order}`),
        action: () => sortAction({name: item, order: order})
    };
};

function _buildGroupAction(scope, item, groupAction) {
    const groupCreate = {name: item};
    const classification = scope ? scope : 'all';
    return {
        label: i18next.t(`search.group.${classification}.${camelCase(item)}`),
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

export class ToolbarSort extends PureComponent {
    render() {
        const {scope, sortList, sortAction} = this.props;
        const operationList = reduce(sortList, (result, item) => concat(result, _buildSortAction(scope, item, 'asc', sortAction), _buildSortAction(scope, item, 'desc', sortAction)), []);
        const buttonProps = {icon: undefined, label: i18next.t('focus.search.sort'), shape: null};
        return <Dropdown data-focus='toolbar-sort' operations={operationList} button={buttonProps} />
    };
};
ToolbarSort.displayName = 'ToolbarSort';
ToolbarSort.propTypes = {
    scope: PropTypes.string,
    sortAction: PropTypes.func.isRequired,
    sortList : PropTypes.array.isRequired
};

export class ToolbarGroup extends PureComponent {
    render() {
        const {scope, groupList, groupAction, unGroup} = this.props;
        const operationList = reduce(groupList, (result, item) => concat(result, _buildGroupAction(scope, item, groupAction)), []);
        const buttonProps = {icon: undefined, label: 'focus.search.group', shape: null};
        return (
            unGroup ?
            <Button onClick={() => groupAction({})} label={i18next.t('focus.search.ungroup')} shape={null} />
            :
            <Dropdown data-focus='toolbar-group' operations={operationList} button={buttonProps} />
        );
    }
};
ToolbarGroup.displayName = 'ToolbarGroup';
ToolbarGroup.propTypes = {
    scope: PropTypes.string,
    groupAction: PropTypes.func.isRequired,
    groupList : PropTypes.array.isRequired
};


class ToolbarSelection extends PureComponent {
    render() {
        const {selectState, toggleAllLine, label, totalCount} = this.props;
        return (
            <span>
                {toggleAllLine && selectState && <Button onClick={toggleAllLine} icon='check_box' shape='icon' />}
                {toggleAllLine && !selectState && <Button onClick={toggleAllLine} icon='check_box_outline_blank' shape='icon' />}
                <span>{label}</span>
                {totalCount && <span> ({totalCount})</span>}
            </span>
        );
    };
};
ToolbarSelection.displayName = 'ToolbarSelection';
ToolbarSelection.propTypes = {
    selectState: PropTypes.bool,
    toggleAllLine: PropTypes.func
};

export class ToolBar extends PureComponent {
    render() {
        const {
            GlobalGroupActionsComponent,
            groupAction,
            groupList,
            isGroup,
            label, //not enough explicit, choose another name
            numberOfSelectedElement,
            scope,
            selectedElements,
            sortAction,
            sortList,
            stateOfTheSelectionList,
            toggleAllLine,
            totalCount,
            unGroup
        } = this.props;
        const displaySort = !isGroup && sortList && sortList.length > 0;
        const displayGroup = !isGroup && groupList && groupList.length > 0;
        return (
            <div data-focus='toolbar' className='mdl-grid mdl-shadow--3dp'>
                <ToolbarSelection label={label} totalCount={totalCount} selectState={stateOfTheSelectionList} toggleAllLine={toggleAllLine} />
                {(numberOfSelectedElement > 0) && <div data-focus='toolbar-selected-elements'>{i18next.t('focus.search.selected', {count: numberOfSelectedElement})}</div>}
                {displaySort && <ToolbarSort scope={scope} sortAction={sortAction} sortList={sortList} />}
                {displayGroup && <ToolbarGroup scope={scope} unGroup={unGroup} groupAction={groupAction} groupList={groupList} />}
                {GlobalGroupActionsComponent && stateOfTheSelectionList && <div data-focus='toolbar-group-actions'><GlobalGroupActionsComponent selectedElements={selectedElements} /></div>}
            </div>
        );
    };
};
ToolBar.displayName = 'ToolBar';
ToolBar.propTypes = {
    GlobalGroupActionsComponent: PropTypes.func,
    groupAction: PropTypes.func.isRequired,
    groupList: PropTypes.array,
    isGroup: PropTypes.bool,
    label: PropTypes.string,
    numberOfSelectedElement: PropTypes.number,
    scope: PropTypes.string,
    selectedElements: PropTypes.arrayOf(PropTypes.object),
    selectState: PropTypes.bool,
    sortAction: PropTypes.func.isRequired,
    sortList: PropTypes.array,
    stateOfTheSelectionList: PropTypes.bool,
    toggleAllLine: PropTypes.func.isRequired,
    totalCount: PropTypes.number,
    unGroup: PropTypes.bool
};
ToolBar.defaultProps = {
    groupAction: () => console.warn('please define a group function...'),
    groupList: [],
    isGroup: false,
    numberOfSelectedElement: 0,
    selectState: false,
    sortAction: () => console.warn('please define a sort function...'),
    sortList: []
};
