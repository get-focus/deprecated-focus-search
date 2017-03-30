import React, {PropTypes, PureComponent} from 'react';
import {ToolBar, ToolBarQuickSearch} from './toolbar';
import InputCheckbox from 'focus-components/input-checkbox';
import Button from 'focus-components/button';

export function MaterialListWrapper ({children}) {
    return (<ul data-focus='list-component' className='mdl-list'>{children}</ul>)
};

//TODO Ephrame : replace idx
export class LineActions extends PureComponent {
    constructor(props) {
        super(props);
        this._handleOnClick = this._handleOnClick.bind(this);
    }
    _handleOnClick(action) {
        const {actions, ActionsComponent, ...otherProps} = this.props;
        return action(otherProps);
    }
    render() {
        const {actions, ActionsComponent, ...otherProps} = this.props;
        return (
            <div data-focus='focus-actions'>
                {(actions) ? (
                    ActionsComponent ?
                    <ActionsComponent {...otherProps} />
                    :
                    actions.map((action, idx) => <Button key={idx} label={action.label} onClick={() => this._handleOnClick(action.action)} />)
                )
                :
                null}
            </div>
        );
    };
}
LineActions.displayName = 'LineActions';
LineActions.PropTypes = {
    actions: PropTypes.arrayOf(PropTypes.object),
    ActionsComponent: PropTypes.func
}

export class MaterialLineWrapper extends PureComponent {
    render() {
        const {actionsLine, ActionsComponent, children, lineDescriptor, stateOfTheSelectionList, ...otherProps} = this.props;
        const {isSelected} = lineDescriptor;
        return (
            <li data-focus='line-component' data-selected={isSelected} className='mdl-list__item'>
                {otherProps.toggleLineSelection && !this.props.isQuickSearch &&
                    <div data-focus='line-component-selection'>
                        <InputCheckbox rawInputValue={isSelected} onChange={() => otherProps.toggleLineSelection(otherProps.id)} />
                    </div>
                }
                <div data-focus='line-component-data'>
                    {children}
                </div>
                {!stateOfTheSelectionList && (actionsLine || ActionsComponent) &&
                    <div data-focus='line-component-actions'>
                        <LineActions actions={actionsLine} ActionsComponent={ActionsComponent} {...lineDescriptor} />
                    </div>
                }
            </li>
        );
    };
};
MaterialLineWrapper.displayName = 'MaterialLineWrapper';
MaterialLineWrapper.PropTypes = {
    actionsLine: PropTypes.arrayOf(PropTypes.object),
    ActionsComponent: PropTypes.func,
    lineDescriptor: PropTypes.object,
    stateOfTheSelectionList: PropTypes.bool
};

export class ListQuickSearch extends PureComponent {
    render() {
        const {
            data,
            GlobalGroupActionsComponent,
            isGroup,
            lineIdentifierProperty,
            lineProps,
            LineWrapper,
            ListWrapper,
            numberOfList,
            isToolBar,
            numberOfSelectedElement,
            scope,
            selectedElements,
            stateOfTheSelectionList,
            toggleAllLine,
            toggleLineSelection,
            unitSearchDispatch,
            valuesForResult: {ActionsComponent, actionsLine, groupList, groupSelect, isSelected, label, listType, LineComponent, numberList, values, sortList, ...otherProps},
        } = this.props;
        return (
            <div data-focus='list-with-toolbar'>
                <ToolBarQuickSearch title={label}/>
                <ListWrapper>
                    {data && data.map(({isSeleted, ...lineDescriptor}, idx) => {
                        const lineWrapperProps = {...lineDescriptor, ...lineProps};
                        return (
                            <div data-focus='line-advanced-search' key={idx}>
                                <LineWrapper
                                    ActionsComponent={ActionsComponent}
                                    actionsLine={actionsLine}
                                    lineDescriptor={lineWrapperProps}
                                    isSelected={isSeleted}
                                    toggleLineSelection={toggleLineSelection}
                                    stateOfTheSelectionList={stateOfTheSelectionList}
                                    id={lineDescriptor[this.props.lineIdentifierProperty]}
                                    isQuickSearch={true}
                                    {...otherProps}>
                                    <LineComponent index={numberOfList} {...lineWrapperProps} />
                                </LineWrapper>
                            </div>
                        );
                    })}
                </ListWrapper>
            </div>
        )
    }
}

ListQuickSearch.defaultProps = {
    isGroup: false,
    lineProps: {},
    isToolBar: true,
    lineIdentifierProperty: 'id',
    ListWrapper: MaterialListWrapper,
    LineWrapper: MaterialLineWrapper
};

export class ListComponentWithToolBar extends PureComponent {
    render () {  //to do check the values
        const {
            data,
            GlobalGroupActionsComponent,
            isGroup,
            lineIdentifierProperty,
            lineProps,
            LineWrapper,
            ListWrapper,
            numberOfList,
            isToolBar,
            numberOfSelectedElement,
            scope,
            selectedElements,
            stateOfTheSelectionList,
            toggleAllLine,
            toggleLineSelection,
            unitSearchDispatch,
            valuesForResult: {ActionsComponent, actionsLine, groupList, groupSelect, isSelected, label, listType, LineComponent, numberList, values, sortList, ...otherProps},
        } = this.props;
        return (
            <div data-focus='list-with-toolbar'>
                {isToolBar && <ToolBar
                    data-focus='toolbar-advanced-search'
                    GlobalGroupActionsComponent={GlobalGroupActionsComponent}
                    groupAction={unitSearchDispatch.groupAction}
                    groupList={groupList}
                    groupSelect={groupSelect}
                    isGroup={isGroup}
                    label={label}
                    numberOfSelectedElement={numberOfSelectedElement}
                    scope={scope}
                    selectedElements={selectedElements}
                    sortAction={unitSearchDispatch.sortAction}
                    sortList={sortList}
                    stateOfTheSelectionList={stateOfTheSelectionList}
                    toggleAllLine={toggleAllLine}
                    unGroup={false} />}
                <ListWrapper>
                    {data && data.map(({isSeleted, ...lineDescriptor}, idx) => {
                        const lineWrapperProps = {...lineDescriptor, ...lineProps};
                        return (
                            <div data-focus='line-advanced-search' key={idx}>
                                <LineWrapper
                                    ActionsComponent={ActionsComponent}
                                    actionsLine={actionsLine}
                                    lineDescriptor={lineWrapperProps}
                                    isSelected={isSeleted}
                                    toggleLineSelection={toggleLineSelection}
                                    stateOfTheSelectionList={stateOfTheSelectionList}
                                    id={lineDescriptor[this.props.lineIdentifierProperty]}
                                    {...otherProps}>
                                    <LineComponent index={numberOfList} {...lineWrapperProps} />
                                </LineWrapper>
                            </div>
                        );
                    })}
                </ListWrapper>
            </div>
        );
    };
};
ListComponentWithToolBar.displayName ='ListComponentWithToolBar';
ListComponentWithToolBar.propTypes = {
    GlobalGroupActionsComponent: PropTypes.func,
    isGroup: PropTypes.bool,
    lineProps: PropTypes.object,
    lineIdentifierProperty: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
    LineWrapper: PropTypes.func,
    ListWrapper: PropTypes.func,
    numberOfList: PropTypes.number,
    numberOfSelectedElement: PropTypes.number,
    scope: PropTypes.string,
    selectedElements: PropTypes.arrayOf(PropTypes.object),
    stateOfTheSelectionList: PropTypes.bool,
    toggleAllLine: PropTypes.func,
    toggleLineSelection: PropTypes.func,
    unitSearchDispatch: PropTypes.object.isRequired,
    valuesForResult: PropTypes.object.isRequired
};
ListComponentWithToolBar.defaultProps = {
    isGroup: false,
    lineProps: {},
    isToolBar: true,
    lineIdentifierProperty: 'id',
    ListWrapper: MaterialListWrapper,
    LineWrapper: MaterialLineWrapper
};


export class ResultList extends PureComponent {
    render() {
        const {
            customLineProps,
            isGroup,
            lineIdentifierProperty,
            ListComponent,
            numberOfList,
            scope,
            unitSearchDispatch,
            isToolBar,
            valuesForResult,
            groupSelected,
            paginateProps,
        } = this.props;
        const {listType} = valuesForResult;
        const lineProps = customLineProps && listType ? customLineProps[listType] : {};
        return (
            <div data-focus='result-list'>
                {/**Toolbar needs the toggleAllLine :-1 */}
                <ListComponent
                    data-focus='selectable-list-advanced-search'
                    data={valuesForResult.data}
                    groupSelected={groupSelected}
                    GlobalGroupActionsComponent={valuesForResult.GlobalGroupActionsComponent}
                    isGroup={isGroup}
                    isToolBar={isToolBar}
                    LineComponent={valuesForResult.LineComponent}
                    lineIdentifierProperty={valuesForResult.lineIdentifierProperty}
                    lineProps={lineProps}
                    numberOfList={numberOfList}
                    scope={scope}
                    unitSearchDispatch={unitSearchDispatch}
                    valuesForResult={valuesForResult}
                    {...paginateProps}
                   />
            </div>
        );
    }
}
ResultList.displayName = 'ResultList';
ResultList.propTypes = {
    customLineProps: PropTypes.object,
    isGroup: PropTypes.bool,
    ListComponent: PropTypes.func,
    lineIdentifierProperty: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    numberOfList: PropTypes.number,
    scope: PropTypes.string,
    unitSearchDispatch: PropTypes.object,
    valuesForResult: PropTypes.object
};
ResultList.defaultProps = {
    customLineProps: {},
    isGroup: false,
    lineIdentifierProperty: 'id',
    unitSearchDispatch: {},
    valuesForResult: {}
};


export class ResultGroup extends PureComponent {
    render() {
        const {customLineProps, isAllScopeResults, isGroup, isQuickSearch, ListComponent, paginateFunction, scope, valuesForResults, unitSearchDispatch, groupSelected, paginateProps} = this.props;
        return (
            <div data-focus='result-group'>
                {!isAllScopeResults && !isQuickSearch &&
                    <ToolBar
                        data-focus='toolbar-ungroup'
                        groupAction={unitSearchDispatch.groupAction}
                        groupList={[{code: 'ungroup', label:'ungroup'}]}
                        scope={scope}
                        unGroup={true} />
                }
                {valuesForResults.map((element, idx) => {
                    //Todo add ListWrapper
                    const valuesForResult = {...element};
                    return (
                        <ResultList
                            customLineProps={customLineProps}
                            isGroup={isGroup}
                            key={idx}
                            paginateProps={paginateProps}
                            groupSelected={groupSelected}
                            ListComponent={ListComponent}
                            numberOfList={idx}
                            paginateFunction={paginateFunction}
                            valuesForResult={valuesForResult}
                            unitSearchDispatch={unitSearchDispatch} />
                    );
                })}
            </div>
        );
    };
};
ResultGroup.displayName = 'ResultGroup';
ResultGroup.propTypes = {
    customLineProps: PropTypes.object,
    isAllScopeResults: PropTypes.bool,
    isGroup: PropTypes.bool,
    ListComponent: PropTypes.func,
    scope: PropTypes.string,
    valuesForResults: PropTypes.array,
    unitSearchDispatch: PropTypes.object
};
ResultGroup.defaultProps = {
    customLineProps: {},
    isGroup: false
};
