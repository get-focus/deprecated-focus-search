import React, {PropTypes} from 'react';
import ToolBar from './toolbar';
import connectToSelectableList from './selectable-list';
const FAKE_DATA_LIST = [
  {id: 1, firstName: 'Don Rodrigo', age: 12},
  {id: 2, firstName: 'Don Stefano', age: 87},
  {id: 3, firstName: 'Don Roberto', age: 46},
  {id: 4, firstName: 'Don Michello', age: 22}
]

export function MaterialListWrapper ({children}) {
  return <ul className='mdl-list' data-focus>{children}</ul>;
}

function ListComponent({toggleLineSelection, LineComponent, lineIdentifierProperty, data,children, ...otherProps}){
    return <ul>
    {data.map( ({isSeleted, ...lineDescriptor}) => <LineComponent isSelected={isSeleted} toggleLineSelection={toggleLineSelection} key={lineDescriptor[lineIdentifierProperty]} {...lineDescriptor} />)}
    </ul>
  }

/*
<Provider Lines>

const connectToLineComponent =  Component => ({contentType, ...otherProps}) => {
  const LineComponent = _getLineComponentFromContext(contentType);
  return <Component {...otherProps} LineComponent={LineComponent}/>;
}
*/
export function ResultList ({data, isSelectable, lineIdentifierProperty,getLineComponent, LineComponent, contentType, sort, group, ListWrapper, sortList, isGroup, groupList}) {
  const ListWrapperSelectable = isSelectable ? connectToSelectableList(ListComponent, LineComponent) : ()=> <ListComponent data={data} LineComponent={LineComponent}/>;
  return(
    <div>
      <h2>result list</h2>
      <ToolBar listGroup={groupList} listSort={sortList} sort={sort} group={group} isGroup={isGroup}/>
      <ListWrapperSelectable data={data}/>
    </div>
  );
}

ResultList.defaultProps = {
  data: FAKE_DATA_LIST/*[]*/,
  lineIdentifierProperty: 'id',
  isSelectable: false,
  listWrapper: MaterialListWrapper
}

ResultList.propTypes = {
  data: PropTypes.array,
  lineIdentifierProperty: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  isSelectable: PropTypes.boolean,
  /* This function is use to get the line component depending */
  getLineComponent: PropTypes.func,
  ListWrapper: PropTypes.func
}
export function ResultGroup  ({data, sort, group, isGroup}) {
  return <div data-focus='result-group' >
    {data.map(element => {
        //TO do add ListWrapper
        return <ResultList data={element.data} sort={sort} group={group} isGroup={isGroup} LineComponent={element.LineComponent} groupList={element.groupList} sortList={element.sortList} />
    })}
  </div>
}
export default ResultList;
