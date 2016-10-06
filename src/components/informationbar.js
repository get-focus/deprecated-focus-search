import React, {Component, PropTypes} from 'react';
import Chips from 'focus-components/chips';
import upperCase from 'lodash/upperCase';
import isArray from 'lodash/isArray';

export function InformationBar ({totalCount, selectedFacetsList, deleteFacet, scopeFunction,scope, group, facets}) {
    const scopeLetter = scope && scope.length > 0 ? upperCase(scope[0]) : undefined;
    console.log(selectedFacetsList)
    return (
        <div data-focus="information-bar">
            <div data-focus='totalCount'>{totalCount} results for</div>
            {scope &&
                <div data-focus="scope-selected">
                    <Chips label={scope} letter={scopeLetter} onDeleteClick={()=>scopeFunction({query:{value :{scope: null}, replace: false}, group: {value: {name: 'all'}, replace: false}})}/>
                </div>
            }
            <div data-focus='selectedFacets'>

                {Object.keys(selectedFacetsList).map((element, index) => {
                    const currentFacetSelected = facets.find(facet => facet.code === element)
                    if(isArray(selectedFacetsList[element])){
                      return selectedFacetsList[element].map(selectedFacet => {
                          const theFacet = currentFacetSelected.values.find(facet => facet.code === selectedFacet)
                          const displayedLabel = `${currentFacetSelected.label}: ${theFacet.label}`;
                          return <Chips label={displayedLabel} onDeleteClick={() => {const value = {code: element, values: selectedFacet}; return deleteFacet(value)}} />
                      })
                    }else {
                      const selectedFacet = selectedFacetsList[element];
                      const theFacet = currentFacetSelected.values.find(facet => facet.code === selectedFacet)
                      const displayedLabel = `${currentFacetSelected.label}: ${theFacet.label}`;
                      return <Chips label={displayedLabel} onDeleteClick={() => {const value = {code: element, values: selectedFacet}; return deleteFacet(value)}} />

                    }

                })}
            </div>
        </div>
    )
};
//TODO add prop types
InformationBar.displayName = 'Information Bar';
InformationBar.propTypes = {
    totalCount : PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired  
};
InformationBar.defaultProps = {
    totalCount : "Merci de fournir le totalCount =)",
    selectedFacetsList : []
};
