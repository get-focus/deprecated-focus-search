import find from 'lodash/find';
import React, {PropTypes} from 'react';

function ListContainer({list, ...otherProps}) {
    const renderList = () => {
      return list.map(element => {
        return <div>{element.title}</div>
      })
    }
    return (
      <div>
        {renderList()}
      </div>

  );
}


ListContainer.displayName = 'ListContainer';
ListContainer.propTypes = {
    onClick: PropTypes.func.isRequired,
    options: PropTypes.arrayOf(PropTypes.string)
};
ListContainer.defaultProps = {
    list: []
}
export default ListContainer;
