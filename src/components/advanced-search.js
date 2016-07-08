import {connect as connectToState} from 'react-redux';
import compose from 'lodash/flowRight';
import React, {Component, PropTypes} from 'react';
import {selectSearch} from '../reducer'

import DefaultFacet from './facet'


class AdvancedSearch extends Component {
  componentWillMount(){
    const {action, dispatch} = this.props;
    dispatch(action())
  }
  onClick(value, facet){
    const {updateSelectedFacets, dispatch} = this.props;
    dispatch(updateSelectedFacets({facetTitle : facet, facetData : value}))
  }
  render () {
    const {results, criteria, dispatch,deleteSelectedFacets} = this.props;
    return <div style={{color: 'orange'}}>
      <DefaultFacet facets={results.facets} selectedFacets={criteria.selectedFacets} deleteSelectedFacets={(element) => dispatch(deleteSelectedFacets(element))} onClick={this.onClick.bind(this)}/>
    </div>;
  }

}

const ConnectedComponentHome = compose(
  connectToState(selectSearch('otherSearch'))
)(AdvancedSearch)
export default ConnectedComponentHome;


AdvancedSearch.propTypes = {
    results: PropTypes.object

};

AdvancedSearch.defaultProps = {
    results: {}
}
