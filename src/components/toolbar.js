import React, {PropTypes, PureComponent} from 'react';
import {compose} from 'redux';
import {connect} from 'react-redux';
import isArray from 'lodash/isArray';
import reduce from 'lodash/reduce';
import concat from 'lodash/concat';
import toLower from 'lodash/toLower';
import i18next from 'i18next';

import {selectSearch} from '../reducer';
import Button from 'focus-components/button';
import Dropdown from 'focus-components/dropdown';


function _buildSortAction(scope, item, order, sortAction) {
    return {
        label: `search.sort.${scope}.entry.${toLower(item)}.${order}`,
        action: () => sortAction({name: item, order: order})
    };
};

function _buildGroupAction(scope, item, groupAction) {
    const isUngroup = item === 'ungroup';
    const groupCreate = isUngroup ? {} : {name: item}
    return {
        label: isUngroup ? 'focus.search.group.ungroup' : `search.group.${scope}.entry.${toLower(item)}`,
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
    scope: PropTypes.string.isRequired,
    sortAction: PropTypes.func.isRequired,
    sortList : PropTypes.array
};

export class ToolbarGroup extends PureComponent {
    render() {
        const {scope, groupList, groupAction, unGroup} = this.props;
        const label = i18next.t(unGroup ? 'focus.search.ungroup': 'focus.search.group');
        const operationList = reduce(groupList, (result, item) => concat(result, _buildGroupAction(scope, item, groupAction)), []);
        const buttonProps = {icon: undefined, label: label, shape: null};
        return (
            unGroup ?
            <Button onClick={operationList[0].action} label={i18next.t('focus.search.ungroup')} />
            :
            <Dropdown data-focus='toolbar-group' operations={operationList} button={buttonProps} />
        );
    }
};
ToolbarGroup.displayName = 'ToolbarGroup';
ToolbarGroup.propTypes = {
    scope: PropTypes.string.isRequired,
    groupAction: PropTypes.func.isRequired,
    groupList : PropTypes.array
};


class ToolbarSelection extends PureComponent {
    render() {
        const {selectState, toggleAllLine, label, totalCount} = this.props;
        return (
            <span>
                {selectState && <Button onClick={toggleAllLine} icon='check_box' shape='icon' />}
                {!selectState && <Button onClick={toggleAllLine} icon='check_box_outline_blank' shape='icon' /> }
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
            GlobalActions,
            GlobalGroupActionsComponent,
            groupAction,
            groupList=[],
            groupSelect,
            isGroup,
            label,
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
        return (
            <div data-focus='toolbar' className='mdl-grid mdl-shadow--3dp'>
                {toggleAllLine && <ToolbarSelection label={label} totalCount={totalCount} selectState={stateOfTheSelectionList} toggleAllLine={toggleAllLine} />}
                {(numberOfSelectedElement > 0) && <div data-focus='toolbar-selected-elements'>{i18next.t('focus.search.selected', {count: numberOfSelectedElement})}</div>}
                {!isGroup && sortList && <ToolbarSort scope={scope} sortAction={sortAction} sortList={sortList} />}
                {!isGroup && groupList && <ToolbarGroup scope={scope} unGroup={unGroup} groupAction={groupAction} groupList={groupList} />}
                {GlobalActions && stateOfTheSelectionList && <div data-focus='toolbar-global-actions'><GlobalActions selectedElements={selectedElements} /></div>}
                {GlobalGroupActionsComponent && stateOfTheSelectionList && <div data-focus='toolbar-group-actions'><GlobalGroupActionsComponent selectedElements={selectedElements} /></div>}
            </div>
        );
    };
};
ToolBar.displayName = 'ToolBar';
ToolBar.defaultProps = {
    sortAction: () => console.warn('please define a sort function...'),
    groupAction: () => console.warn('please define a group function...'),
    sortList: [],
    groupList: [],
    selectState: false,
    toggleAllLine: undefined
};
ToolBar.propTypes = {
    sortAction: PropTypes.func.isRequired,
    groupAction: PropTypes.func.isRequired,
    sortList: PropTypes.array,
    groupList: PropTypes.array,
    selectState: PropTypes.bool,
    toggleAllLine: PropTypes.func
};
