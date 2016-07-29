import React, {PropTypes} from 'react';
import {connect} from 'react-redux';
import {
  FACET_TYPE,
  FACET_DESCRIPTOR_TYPE
} from '../reducer';
const FAKE_DATA = [
  {
    code: 'GENS_LEVEL',
    label: 'Niveau des gens',
    values: [
      {code: 'FAIBLE', label: 'faible', count: 22},
      {code: 'MOYEN', label: 'moyen', count: 54},
      {code: 'FORT', label: 'fort', count: 7}
    ]
  },
  {
    code: 'SALAIRE',
    label: 'Salaire des gens',
    values: [
      {code: 'PAS_CHER', label: 'pas cher', count: 45},
      {code: 'DANS_LA_FOURCHETTE', label: 'dans la moyennt', count: 4},
      {code: 'CHER', label: 'très cher', count: 2}
    ]
  }
];
const facetSelector = s => ({data: FAKE_DATA});
const facetActions = dispatch => ({
  selectFacet: facet => dispatch({
    type: 'YOLO_SELECTED_FACETS',
    value: facet
  })
})

export function FacetTitle(props){
  return <span className='mdl-list__item-primary-content'>{props.children}</span>
}
export function FacetCount(props){
  return <span className='mdl-list__item-secondary-content'>
  <span className='mdl-badge' data-badge={props.children}></span></span>
}

export function Facet(props){
  return (<li
        data-focus='facet'
        className='mdl-list__item'
        onClick={() => props.selectFacet(props.code)}>
        <FacetTitle>{props.label}</FacetTitle>
        <FacetCount>{props.count}</FacetCount>
      </li>
  );
}

Facet.propTypes = FACET_TYPE;

// add hover style
export function FacetBlock(props){
  return <div data-focus='facet-block' className='mdl-card mdl-shadow--2dp' style={{maxWidth: '300px'}}>
      <h3>{props.label}</h3>
      <ul className='mdl-list'>
          {
            props.values.map(
              facet => <props.FacetComponent key={facet.code} {...facet} selectFacet={props.selectFacet} selectFacet={props.selectFacet}/>
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
  ...FACET_DESCRIPTOR_TYPE,
  selectFacet: PropTypes.func.isRequired,
  FacetComponent: PropTypes.func
};

export function FacetPanel(props){
  return <div>
    <h2>Facet panel</h2>
    {props.data.map(
      facetDescriptor => <FacetBlock key={facetDescriptor.code} {...facetDescriptor} selectFacet={props.selectFacet}/>)
    }
  </div>
}
FacetPanel.propTypes = {
  data: PropTypes.arrayOf(FACET_DESCRIPTOR_TYPE)
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
export default connect(facetSelector, facetActions)(FacetPanel);
