import React, {PropTypes} from 'react';
import ToolBar from './toolbar';
import connectToSelectableList from './selectable-list';
import InputCheckbox from 'focus-components/input-checkbox';

export function MaterialListWrapper ({children}) {
    return (<ul data-focus='list-component' className='mdl-list'>{children}</ul>)
};

//TODO Ephrame : replace idx
export function FocusAction({actions, ActionsComponent, ...otherProps}){
    return (
        <div data-focus='focus-actions'>
            {actions ? actions.map((action, idx) => <button key={idx} onClick={action.action}>{action.label}</button>) : <ActionsComponent {...otherProps}/>}
        </div>
    );
}

export function MaterialLineWrapper({children, actionsLine, ActionsComponent, ...props}) {
    return (
        <li data-focus='line-component' className='mdl-list__item'>
            {props.toggleLineSelection &&
                <div data-focus='line-component-selection'>
                    <InputCheckbox value={props.isSelected} onChange={() => props.toggleLineSelection(props.id)} />
                </div>
            }
            {children}
            {(actionsLine || ActionsComponent) && <div data-focus='line-component-actions'><FocusAction actions={actionsLine} ActionsComponent={ActionsComponent} {...props}/></div>}
        </li>
    );
};

export function ListComponentWithToolBar(props){
    //to do check the values
    //{groupList, sortList, LineComponent, values,actionsLine, label, code}
    const {numberOfList,valuesForResult: {values, groupSelect,groupList, sortList, isSelected, LineComponent, numberList, actionsLine}, toggleLineSelection,unitSearchDispatch, toggleAllLine, isGroup, lineIdentifierProperty, ListWrapper,LineWrapper} = props
    return (
      <div>
        <ToolBar data-focus='toolbar-advanced-search'
            groupAction={unitSearchDispatch.groupAction}
            sortAction={unitSearchDispatch.sortAction}
            groupList={groupList}
            sortList={sortList}
            isGroup={isGroup}
            groupSelect={groupSelect}
            toggleAllLine={toggleAllLine}
            />
          <ListWrapper>
              {values && values.map(({isSeleted, ...lineDescriptor}, idx) => (
                  <div data-focus='line-advanced-search' key={idx}>
                      <LineWrapper isSelected={isSeleted} toggleLineSelection={toggleLineSelection}  actionsLine={actionsLine} {...lineDescriptor}>
                          <LineComponent index={numberOfList}  {...lineDescriptor} />
                      </LineWrapper>
                  </div>
              ))}
          </ListWrapper>
      </div>
    )
};
ListComponentWithToolBar.displayName ='ListcomponentWithSelection';
ListComponentWithToolBar.propTypes = {
    toggleLineSelection: PropTypes.func,
    LineComponent: PropTypes.func.isRequired,
    lineIdentifierProperty: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
    data: PropTypes.array.isRequired,
    ListWrapper: PropTypes.func.isRequired,
    LineWrapper: PropTypes.func
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

export function ResultList({valuesForResult,isGroup, unitSearchDispatch,numberOfList}) {
    return(
        <div data-focus='result-list'>
            {/**Toolbar needs the toggleAllLine :-1 */}
            <ListComponentWithToolBar data-focus='selectable-list-advanced-search'
                isGroup={isGroup}
                unitSearchDispatch={unitSearchDispatch}
                valuesForResult={valuesForResult}
                numberOfList={numberOfList}
                />
        </div>
    );
};
ResultList.defaultProps = {
    data: [],
    lineIdentifierProperty: 'id',
    isSelectable: false,
    toolbarProps: {},
    ListComponent: ListComponentWithToolBar
};
ResultList.propTypes = {
    data: PropTypes.array,
    toolbarProps: PropTypes.object.isRequired,
    lineIdentifierProperty: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    isSelectable: PropTypes.bool,
    /* This function is use to get the line component depending */
    ListComponent: PropTypes.func
};


export function ResultGroup({valuesForResults, isGroup,unitSearchDispatch }) {
    return (
      <div data-focus='result-group' >
          {valuesForResults.map((element, idx) => {
              //TO do add ListWrapper
              const valuesForResult = {
                ...element
              }
              return (
                <ResultList
                      isGroup={isGroup}
                      valuesForResult={valuesForResult}
                      unitSearchDispatch={unitSearchDispatch}
                      key={idx}
                      numberOfList={idx}
                      />
              );
          })}
      </div>
    )
};
ResultGroup.displayName = 'Result Group'
ResultGroup.propTypes = {
    data: PropTypes.array.isRequired,
    toolbarProps: PropTypes.object.isRequired
};
ResultGroup.defaultProps = {
    data: [],
    toolbarProps: {}
};
