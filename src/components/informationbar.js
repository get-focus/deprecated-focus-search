import React, {Component, PropTypes} from 'react';
import Chips from 'focus-components/chips';
import lowerCase from 'lodash/lowerCase';
import isArray from 'lodash/isArray';
import i18next from 'i18next';

export function InformationBar (props) {
    const {totalCount, selectedFacetsList, deleteFacet, scopeFunction, scopeList, group, facets, unitSearchDispatch : {scopeAction}} = props;
    const scopeLabel = scopeList && scopeList.length > 0 ? i18next.t(`search.scope.${lowerCase(scopeList)}`) : 'Not defined';
    const scopeLetter = scopeLabel && scopeLabel.length > 0 ? scopeLabel[0] : 'N';
    return (
        <div data-focus='information-bar'>
            <div data-focus='totalCount'>{totalCount}  {i18next.t('focus.search.results.for')}</div>
            {scopeList &&
                <div data-focus='scope-selected'>
                    <Chips label={scopeLabel}
                        letter={scopeLetter}
                        onDeleteClick={scopeList === 'all' ? undefined : () => scopeAction({query:{value :{scope: undefined}, replace: false}, group: {value: {}, replace: false}})}/>
                </div>
            }
            <div data-focus='selectedFacets'>
                {Object.keys(selectedFacetsList).map((element, index) => {
                    const currentFacetSelected = facets.find(facet => facet.code === element)
                    if(isArray(selectedFacetsList[element])) {
                        return selectedFacetsList[element].map(selectedFacet => {
                            const theFacet = currentFacetSelected.values.find(facet => facet.code === selectedFacet)
                            const displayedLabel = `${currentFacetSelected.label}: ${theFacet.label}`;
                            return <Chips label={displayedLabel} onDeleteClick={() => {const value = {code: element, values: selectedFacet}; return deleteFacet(value)}} />
                        })
                    } else {
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
    totalCount : 0,
    selectedFacetsList : []
};
