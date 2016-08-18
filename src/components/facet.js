import React, {PropTypes} from 'react';
import {compose} from 'redux';
import {facetListWithselectedInformation, selectSearch} from '../reducer'

import {
  FACET_SHAPE_TYPE,
  FACET_DESCRIPTOR_SHAPE_TYPE
} from '../reducer';

const facetActions = dispatch => ({
  selectFacet: facet => dispatch({
    type: 'ADVANCEDSEARCH_UPDATE_SELECTED_FACETS',
    selectedFacets: facet
  }),
  deleteFacet: facet => dispatch({
    type: 'ADVANCEDSEARCH_UPDATE_SELECTED_FACETS',
    selectedFacets: facet,
    replace: true
  })
})

export function FacetTitle(props){
  return <span data-focus='facet-title' className='mdl-list__item-primary-content'>{props.children}</span>
}
export function FacetCount(props){
  return <div data-focus='facet-count' className='mdl-list__item-secondary-content'>
  <span className='mdl-badge' data-badge={props.children}></span></div>
}

export function Facet(props){

  return (<li
        data-focus='facet'
        className='mdl-list__item'
        onClick={() => props.onClick(props.code)}>
        <FacetTitle>{props.label}</FacetTitle>
        <FacetCount>{props.count}</FacetCount>
      </li>
  );
}

Facet.propTypes = FACET_SHAPE_TYPE;

// add hover style
// connect(sFacetBlock, code => FacetComponent)
/*
function connectToFacetDomain(FacetComponent){
// context property
  const facetComponentsMap = {
    'PAYS': (props) => <div>Pays</div>
  }
  function DomainConnectedFacetComponent(props){
      return <FacetComponent {...props} FacetComponent={facetComponentsMap[props.code]}/>
  };

  return DomainConnectedFacetComponent;
}
*/

export function FacetBlock(props){
  return <div data-focus='facet-block' className='mdl-card mdl-shadow--2dp' style={{maxWidth: '300px'}}>
      <h3>{props.label}</h3>

      <ul className='mdl-list'>
          {
            props.selected ?
            <div>{props.selectedFacets.map (value =><props.FacetComponent key={props.code} label={value} code={value} onClick={selectedValue => props.deleteFacet({code: props.code, values: selectedValue})}/>)}</div>
            :
            props.values.map(
              facet => <props.FacetComponent key={facet.code} {...facet} onClick={selectedValue => props.selectFacet({code: props.code, values: selectedValue})}/>
            )
          }
      </ul>
  </div>
}


FacetBlock.defaultProps = {
  FacetComponent: Facet,
  values: []
}
FacetBlock.propTypes = {
  ...FACET_DESCRIPTOR_SHAPE_TYPE,
  deleteFacet: PropTypes.func.isRequired,
  selectFacet: PropTypes.func.isRequired,
  FacetComponent: PropTypes.func
};

export function FacetPanel(props){
  return <div data-focus='facet-panel'
  className='mdl-card mdl-shadow--3dp'
  >
    <h2>{props.title}</h2>
    {props.data.map(
      facetDescriptor => <FacetBlock key={facetDescriptor.code} {...facetDescriptor} selected={facetDescriptor.selected} selectFacet={(value) => props.facet(value, false)} deleteFacet={value => props.facet(value, true)}/>)
    }
  </div>
}
FacetPanel.defaultProps = {
  data: []
}
FacetPanel.propTypes = {
  title: PropTypes.string,
  data: PropTypes.arrayOf(PropTypes.shape(FACET_DESCRIPTOR_SHAPE_TYPE))
};


/* HTML structure
---------------
  FacetPanel
    FacetBlock
      Facet
      Facet
      Facet
      ...
    FacetBlock
      Facet
      Facet
      ...
    ...
--------------

/* Default Export is a connected component */

export const facetSelector =   compose(
     facetListWithselectedInformation,
     selectSearch('advancedSearch')
  );
export default FacetPanel
