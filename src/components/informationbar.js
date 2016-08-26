import React, {Component, PropTypes} from 'react';





export function InformationBar ({totalCount,selectedFacetsList, deleteFacet, facet}) {
  return <div data-focus="information-bar">
          <div data-focus='totalCount'>{totalCount} results</div>
          <div data-focus='selectedFacets'>
              {Object.keys(selectedFacetsList).map((element, index) => {
                  const facetSelected = facet.find(lala => lala.code === element)
                  return selectedFacetsList[element].map(facet => {
                    const facetLabel = facetSelected.values.find(lulu => lulu.code === facet)

                    return <span data-focus='chip' className='mdl-chip'>
                        <span data-focus='chip-text' className='mdl-chip__text'>{facetSelected.label}: {facetLabel.label}</span>
                        <button type="button" className="mdl-chip__action" onClick={()=> {const value = {code: element, values: facet};  console.log(value); return deleteFacet(value)}}><i className="material-icons">cancel</i></button>
                        </span>
                  })

              })}

          </div>
    </div>
}

InformationBar.displayName = "Information Bar";
InformationBar.propTypes = {
  totalCount : PropTypes.string.isRequired
}
InformationBar.defaultProps = {
  totalCount : "Merci de fournir le totalCount =)"
}
