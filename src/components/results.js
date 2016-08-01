import React, {PropTypes} from 'react';

const FAKE_DATA_LIST = [
  {id: 1, firstName: 'Don Rodrigo', age: 12},
  {id: 2, firstName: 'Don Stefano', age: 87},
  {id: 3, firstName: 'Don Roberto', age: 46},
  {id: 4, firstName: 'Don Michello', age: 22}
]

export function ListWrapper ({children}) {
  return <ul className='mdl-list' data-focus>{children}</ul>;
}

export function LineComponentToDefine (props){
  return <div style={{color: 'white', backgroundColor: 'tomato'}}>You should define a line component, props: {JSON.stringify(props)}</div>
}

export function ResultList ({data, lineIdentifierProperty, LineComponent}) {
  return(
    <div>
      <h2>result list</h2>
      <ListWrapper>
        {data.map(lineDescriptor => <LineComponent key={lineDescriptor[lineIdentifierProperty]} {...lineDescriptor}/>)}
      </ListWrapper>
    </div>
  );
}

ResultList.defaultProps = {
  data: FAKE_DATA_LIST/*[]*/,
  lineIdentifierProperty: 'id',
  LineComponent: LineComponentToDefine
}

ResultList.propTypes = {
  data: PropTypes.array,
  lineIdentifierProperty: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
}

export default ResultList;
