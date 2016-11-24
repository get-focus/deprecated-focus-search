import React, {PureComponent, PropTypes} from 'react';
import {ToolBar} from './toolbar';
import InputCheckbox from 'focus-components/input-checkbox';
import Button from 'focus-components/button';

export function MaterialListWrapper ({children}) {
    return (<ul data-focus='list-component' className='mdl-list'>{children}</ul>)
};

//TODO Ephrame : replace idx
export function LineActions({actions, ActionsComponent, ...otherProps}) {
    return (
        <div data-focus='focus-actions'>
            {(actions) ? (
                ActionsComponent ?
                <ActionsComponent {...otherProps} />
                :
                actions.map((action, idx) => <Button key={idx} label={action.label} onClick={action.action} />)
            )
            :
            null}
        </div>
    );
}

export function MaterialLineWrapper({children, actionsLine, ActionsComponent, isSelected, stateOfTheSelectionList, ...props}) {
    return (
        <li data-focus='line-component' data-selected={isSelected} className='mdl-list__item'>
            {props.toggleLineSelection &&
                <div data-focus='line-component-selection'>
                    <InputCheckbox rawInputValue={isSelected} onChange={() => props.toggleLineSelection(props.id)} />
                </div>
            }
            {children}
            {!stateOfTheSelectionList && (actionsLine || ActionsComponent) &&
                <div data-focus='line-component-actions'>
                    <LineActions actions={actionsLine} ActionsComponent={ActionsComponent} {...props} />
                </div>
            }
        </li>
    );
};

export class ListComponentWithToolBar extends PureComponent {
    render () {  //to do check the values
        const {
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
            valuesForResult: {values, label, groupSelect, groupList, sortList, isSelected, LineComponent, numberList, actionsLine, ActionsComponent, ...otherProps},
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
                    {data && data.map(({isSeleted, ...lineDescriptor}, idx) => (
                        <div data-focus='line-advanced-search' key={idx}>
                            <LineWrapper ActionsComponent={ActionsComponent} actionsLine={actionsLine} isSelected={isSeleted} toggleLineSelection={toggleLineSelection} stateOfTheSelectionList={stateOfTheSelectionList} id={lineDescriptor[this.props.lineIdentifierProperty]} {...lineDescriptor} {...otherProps}>
                                <LineComponent index={numberOfList} {...lineDescriptor} />
                            </LineWrapper>
                        </div>
                    ))}
                </ListWrapper>
            </div>
        );
    };
};
ListComponentWithToolBar.displayName ='ListcomponentWithSelection';
ListComponentWithToolBar.propTypes = {
    data: PropTypes.array.isRequired,
    LineComponent: PropTypes.func.isRequired,
    lineIdentifierProperty: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
    LineWrapper: PropTypes.func,
    ListWrapper: PropTypes.func.isRequired,
    toggleLineSelection: PropTypes.func
};
ListComponentWithToolBar.defaultProps = {
    lineIdentifierProperty: 'id',
    ListWrapper: MaterialListWrapper,
    LineWrapper: MaterialLineWrapper
};


/*
<Provider Lines>
const connectToLineComponent =  Component => ({listType, ...otherProps}) => {
const LineComponent = _getLineComponentFromContext(listType);
return <Component {...otherProps} LineComponent={LineComponent}/>;
}
*/

export function ResultList({valuesForResult, isGroup, lineIdentifierProperty, unitSearchDispatch, numberOfList, youHaveToChange, ListComponentWithToolBar, GlobalActions}) {
    return(
        <div data-focus='result-list'>
            {/**Toolbar needs the toggleAllLine :-1 */}
            <ListComponentWithToolBar
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
};
ResultList.defaultProps = {
    data: [],
    lineIdentifierProperty: 'id',
    isSelectable: false,
    valuesForResult: {},
    ListComponentWithToolBar: ListComponentWithToolBar
};
ResultList.propTypes = {
    data: PropTypes.array,
    toolbarProps: PropTypes.object.isRequired,
    lineIdentifierProperty: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    isSelectable: PropTypes.bool,
    /* This function is use to get the line component depending */
    ListComponentWithToolBar: PropTypes.func
};


export class ResultGroup extends PureComponent {
    render(){
        const {valuesForResults, isGroup, unitSearchDispatch, ListComponent, scope , hasScope} = this.props
        return (
            <div data-focus='result-group'>
                {!hasScope &&
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
                            isGroup={isGroup}
                            ListComponentWithToolBar={ListComponent}
                            valuesForResult={valuesForResult}
                            unitSearchDispatch={unitSearchDispatch}
                            key={idx}
                            numberOfList={idx} />
                    );
                })}
            </div>
        );
    };
};


// export function ResuGroup({valuesForResults,scope, isGroup,unitSearchDispatch, ListComponent }) {
//     return (
//       <div data-focus='result-group' >
//       <ToolBar data-focus='toolbar-advanced-search'
//           isGroup={false}
//           scope={scope}
//           stateOfTheSelectionList={false}
//           toggleAllLine={()=> console.log('Je suis dans la merde')}
//           />
//           {valuesForResults.map((element, idx) => {
//               //TO do add ListWrapper
//               const valuesForResult = {
//                 ...element
//               }
//               return (
//                 <ResultList
//                       isGroup={isGroup}
//                       ListComponentWithToolBar={ListComponent}
//                       valuesForResult={valuesForResult}
//                       unitSearchDispatch={unitSearchDispatch}
//                       key={idx}
//                       numberOfList={idx}
//                       />
//               );
//           })}
//       </div>
//     )
// };

ResultGroup.displayName = 'Result Group'
ResultGroup.propTypes = {
    data: PropTypes.array.isRequired,
    toolbarProps: PropTypes.object.isRequired
};
ResultGroup.defaultProps = {
    data: [],
    toolbarProps: {}
};
