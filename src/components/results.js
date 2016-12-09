import React, {PropTypes, PureComponent} from 'react';
import {ToolBar} from './toolbar';
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
                {otherProps.toggleLineSelection &&
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

export class ListComponentWithToolBar extends PureComponent {
    render () {  //to do check the values
        const {
            lineProps,
            data,
            GlobalGroupActionsComponent,
            isGroup,
            lineIdentifierProperty,
            LineWrapper,
            ListWrapper,
            numberOfList,
            numberOfSelectedElement,
            selectedElements,
            stateOfTheSelectionList,
            toggleAllLine,
            toggleLineSelection,
            unitSearchDispatch,
            valuesForResult: {ActionsComponent, actionsLine, groupList, groupSelect, isSelected, label, listType, LineComponent, numberList, values, sortList, ...otherProps},
        } = this.props;
        return (
            <div>
                <ToolBar
                    data-focus='toolbar-advanced-search'
                    GlobalGroupActionsComponent={GlobalGroupActionsComponent}
                    groupAction={unitSearchDispatch.groupAction}
                    groupList={groupList}
                    groupSelect={groupSelect}
                    isGroup={isGroup}
                    label={label}
                    numberOfSelectedElement={numberOfSelectedElement}
                    selectedElements={selectedElements}
                    sortAction={unitSearchDispatch.sortAction}
                    sortList={sortList}
                    stateOfTheSelectionList={stateOfTheSelectionList}
                    toggleAllLine={toggleAllLine}
                    unGroup={false} />
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
ListComponentWithToolBar.displayName ='ListcomponentWithSelection';
ListComponentWithToolBar.propTypes = {
    lineProps: PropTypes.object,
    data: PropTypes.array.isRequired,
    LineComponent: PropTypes.func.isRequired,
    lineIdentifierProperty: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
    LineWrapper: PropTypes.func,
    ListWrapper: PropTypes.func.isRequired,
    toggleLineSelection: PropTypes.func
};
ListComponentWithToolBar.defaultProps = {
    lineProps: {},
    lineIdentifierProperty: 'id',
    ListWrapper: MaterialListWrapper,
    LineWrapper: MaterialLineWrapper
};




export class ResultList extends PureComponent {
    render() {
        const {customLineProps, valuesForResult, isGroup, lineIdentifierProperty, unitSearchDispatch, numberOfList, youHaveToChange, ListComponentWithToolBar, GlobalActions} = this.props;            const {listType} = valuesForResult;
        const lineProps = customLineProps && listType ? customLineProps[listType] : {};
        return (
            <div data-focus='result-list'>
                {/**Toolbar needs the toggleAllLine :-1 */}
                <ListComponentWithToolBar
                    lineProps={lineProps}
                    data-focus='selectable-list-advanced-search'
                    data={valuesForResult.values}
                    GlobalGroupActionsComponent={valuesForResult.GlobalGroupActionsComponent}
                    isGroup={isGroup}
                    LineComponent={valuesForResult.LineComponent}
                    lineIdentifierProperty={valuesForResult.lineIdentifierProperty}
                    numberOfList={numberOfList}
                    unitSearchDispatch={unitSearchDispatch}
                    valuesForResult={valuesForResult}
                    youHaveToChange={youHaveToChange} />
            </div>
        );
    }
}
ResultList.displayName = 'ResultList';
ResultList.defaultProps = {
    customLineProps: {},
    data: [],
    isSelectable: false,
    ListComponentWithToolBar: ListComponentWithToolBar,
    lineIdentifierProperty: 'id',
    valuesForResult: {}
};
ResultList.propTypes = {
    customLineProps: PropTypes.object,
    data: PropTypes.array,
    isSelectable: PropTypes.bool,
    /* This function is use to get the line component depending */
    ListComponentWithToolBar: PropTypes.func,
    lineIdentifierProperty: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    valuesForResult: PropTypes.object
};


export class ResultGroup extends PureComponent {
    render() {
        const {customLineProps, isAllScopeResults, isGroup, ListComponent, valuesForResults, unitSearchDispatch} = this.props
        return (
            <div data-focus='result-group'>
                {!isAllScopeResults &&
                    <ToolBar
                        data-focus='toolbar-ungroup'
                        groupAction={unitSearchDispatch.groupAction}
                        unGroup={true}
                        groupList={[{code: 'ungroup', label:'ungroup'}]} />
                }
                {valuesForResults.map((element, idx) => {
                    //TO do add ListWrapper
                    const valuesForResult = {...element};
                    return (
                        <ResultList
                            customLineProps={customLineProps}
                            isGroup={isGroup}
                            key={idx}
                            ListComponentWithToolBar={ListComponent}
                            numberOfList={idx}
                            valuesForResult={valuesForResult}
                            unitSearchDispatch={unitSearchDispatch}  />
                    );
                })}
            </div>
        );
    };
};
ResultGroup.displayName = 'Result Group';
ResultGroup.propTypes = {
    customLineProps: PropTypes.object,
    data: PropTypes.array.isRequired
};
ResultGroup.defaultProps = {
    customLineProps: {},
    data: []
};
