import find from 'lodash/find';
import React, {PropTypes} from 'react';

function FacetContainer({...otherProps}) {
   const {facets, onClick, selectedFacets, deleteSelectedFacets} =  otherProps
   const buildFacetData = (facet,facetTitle) => {
     return facet.map(facetData => {
       return <li onClick={onClick.bind(null, facetData.label, facetTitle )}>{facetData.label}</li>
     })
   }
   const builOneFacet = () => {
     return facets.map((facet) => {
        const facetTitle = Object.keys(facet)[0]
        const selectedFacet = selectedFacets ? selectedFacets.find(function (toFind) {
	        return toFind.facetTitle === facetTitle;
	      }) : null;
        if(selectedFacets && selectedFacets.find(toFind => toFind.facetTitle === facetTitle)){
          return <div><span>{selectedFacet.facetTitle}</span><span>    {selectedFacet.facetData}</span><button onClick={deleteSelectedFacets.bind(null, selectedFacet)}>Delete</button></div>
        }
        return <div>
          <span>{Object.keys(facet)}</span>
          <ul>
            {buildFacetData(facet[Object.keys(facet)], Object.keys(facet)[0])}
          </ul>
        </div>
     })
   }
    return (
      <div>
        {builOneFacet()}
      </div>

  );
}


FacetContainer.displayName = 'FacetContainer';
FacetContainer.propTypes = {
    onClick: PropTypes.func.isRequired,
    options: PropTypes.arrayOf(PropTypes.string)
};
FacetContainer.defaultProps = {
    facets: []
}
export default FacetContainer;
