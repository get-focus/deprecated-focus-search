import React, {Component, PureComponent, PropTypes} from 'react';
import {compose} from 'redux';
import {connect} from 'react-redux';
import isArray from 'lodash/isArray';
import {selectSearch} from '../reducer';

export function ToolbarSort({listSort, sort}){
    return <select data-focus='select-sort' onChange={({target:{value}}) => {
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
};

function _checkProps(listSort, listGroup){
    if(!isArray(listSort) || listSort.length < 1){
        throw new Error("You must provide a array for the listGroup not empty in the SearchProvider")
    }
    if(!isArray(listGroup) || listGroup.length < 1){
        throw new Error("You must provide a array fort the listSort in not empty in the SearchProvider")
    }
};

export function ToolbarGroup({listGroup, group}){
    return (
        <select data-focus='select-group' onChange={({target:{value}}) => group({name:value})}>
            {listGroup.map((element, idx) => {
                return <option key={idx} data-focus='option-group' value={element}>{element}</option>
            })}
        </select>
    );
};


export class ToolBar extends PureComponent {
    render () {
        const {toolbarProps : {groupList, sortList, sort, group, isGroup}, selectState, toggleAllLine} = this.props;
        _checkProps(groupList, sortList);
        const label = selectState ? 'Unselect' : 'Select';
        return (
            <div data-focus='toolbar' className='mdl-grid mdl-shadow--3dp'>
                <div>
                    <button onClick={() => toggleAllLine()}>{label}</button>
                </div>
                <div>
                    <span>Sort</span>
                    <ToolbarSort sort={sort} listSort={sortList} />
                </div>
                {!isGroup &&
                    <div>
                        <span>Group</span>
                        <ToolbarGroup group={group} listGroup={groupList} />
                    </div>
                }
            </div>
        );
    };
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
    })
};
