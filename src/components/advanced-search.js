import {connect as connectToState} from 'react-redux';
import compose from 'lodash/flowRight';
import React, {Component, PropTypes} from 'react';
import {selectSearch} from '../reducer'

import DefaultFacet from './facet-container';
import DefaultList from './list-container';

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
    const {results, criteria, dispatch, updateSelectedFacets} = this.props;
    return <div style={{color: 'orange'}}>
     criteria:
      <div>{JSON.stringify(this.props.criteria)}</div>
      results
      <div>{JSON.stringify(this.props.results)}</div>

      <DefaultFacet facets={results.facets} selectedFacets={criteria.selectedFacets} deleteSelectedFacets={(element) => dispatch(updateSelectedFacets(element, true))} onClick={this.onClick.bind(this)}/>
      <DefaultList list={results.list} />
    </div>;
  }

}

const ConnectedComponentHome = compose(
  connectToState(selectSearch('advancedSearch'))
)(AdvancedSearch)
export default ConnectedComponentHome;


AdvancedSearch.propTypes = {
    results: PropTypes.object

};

AdvancedSearch.defaultProps = {
    results: {}
}
