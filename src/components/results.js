import React, {PropTypes} from 'react';
import ToolBar from './toolbar';

const FAKE_DATA_LIST = [
  {id: 1, firstName: 'Don Rodrigo', age: 12},
  {id: 2, firstName: 'Don Stefano', age: 87},
  {id: 3, firstName: 'Don Roberto', age: 46},
  {id: 4, firstName: 'Don Michello', age: 22}
]

export function MaterialListWrapper ({children}) {
  return <ul className='mdl-list' data-focus>{children}</ul>;
}

export function LineComponentToDefine (props){
  return <div style={{color: 'white', backgroundColor: 'tomato'}}>You should define a line component, props: {JSON.stringify(props)}</div>
}

const _getLineComponentFromContentTypeExample = (contentType, listData) => {
  switch (contentType) {
    case 'DonDiegoType':
      return props => <div>Line DonDiegoType {JSON.stringify(props)}</div>
      break;
    case 'DonRicardoType':
      return props => <div>Line DonRicardoType {JSON.stringify(props)}</div>
      break;
    default:
      return LineComponentToDefine;

  }
}
/*
<Provider Lines>

const connectToLineComponent =  Component => ({contentType, ...otherProps}) => {
  const LineComponent = _getLineComponentFromContext(contentType);
  return <Component {...otherProps} LineComponent={LineComponent}/>;
}
*/
export function ResultList ({data, lineIdentifierProperty,getLineComponent, LineComponent, contentType, sort, group, ListWrapper, sortList, isGroup, groupList}) {

  return(
    <div>
      <h2>result list</h2>
      <ToolBar listGroup={groupList} listSort={sortList} sort={sort} group={group} isGroup={isGroup}/>
      <ListWrapper>
        {data.map(lineDescriptor => <LineComponent key={lineDescriptor[lineIdentifierProperty]} {...lineDescriptor}/>)}
      </ListWrapper>
    </div>
  );
}

ResultList.defaultProps = {
  data: FAKE_DATA_LIST/*[]*/,
  lineIdentifierProperty: 'id',
  getLineComponent: _getLineComponentFromContentTypeExample, // TODO: remove it.
  ListWrapper: MaterialListWrapper
}

ResultList.propTypes = {
  data: PropTypes.array,
  lineIdentifierProperty: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
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
