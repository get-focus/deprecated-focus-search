
import React, {Component, PropTypes} from 'react';
import {loadLine} from '../actions/single-action-creator';

const SEARCH_CONTEXT_TYPE = {
  searchMetadata: PropTypes.object
};

export function connect() {
  return function getSarchConnectedComponent(ComponentToConnect){
    function SearchConnectedComponent(props, context){
      const {searchMetadata} = context
      return <ComponentToConnect searchMetadata={searchMetadata}/>
    }
    SearchConnectedComponent.displayName= 'SearchConnectedComponent';
    SearchConnectedComponent.contextTypes = SEARCH_CONTEXT_TYPE;
    return SearchConnectedComponent;
  }
}




class SearchProvider extends Component {
    getChildContext() {
        return {
          searchMetadata : this.props.searchMetadata
        };
    }
    render() {
        return this.props.children;
    }
}

SearchProvider.childContextTypes = SEARCH_CONTEXT_TYPE;
SearchProvider.contextTypes = {
    store: PropTypes.shape({
        subscribe: PropTypes.func.isRequired,
        dispatch: PropTypes.func.isRequired,
        getState: PropTypes.func.isRequired
    })
};
SearchProvider.propTypes = {
    searchMetadata: PropTypes.object.isRequired
};




export const Provider = SearchProvider;
