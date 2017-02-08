import React, {PropTypes, PureComponent} from 'react';
import Chips from 'focus-components/chips';
import lowerCase from 'lodash/lowerCase';
import isArray from 'lodash/isArray';
import i18next from 'i18next';

export class InformationBar extends PureComponent {
    render() {
        const {
            deleteFacet,
            facets,
            hasDefinedScopes,
            scope,
            selectedFacetsList,
            term,
            totalCount,
            unitSearchDispatch: {scopeAction}
        } = this.props;
        const scopeLabel = hasDefinedScopes && scope && scope.length > 0 ? i18next.t(`search.scope.${lowerCase(scope)}`) : 'Not defined';
        return (
            <div data-focus='information-bar'>
                <div data-focus='totalCount'>
                    <span>{i18next.t('focus.search.results.number', {count: totalCount})}</span>
                    <span>{i18next.t('focus.search.results.for')}</span>
                    {term && <span>&laquo;&nbsp;{term}&nbsp;&raquo;</span>}
                </div>
                {hasDefinedScopes && scope &&
                    <div data-focus='scope-selected'>
                        <Chips
                            label={scopeLabel}
                            onDeleteClick={scope === 'all' ? undefined : () => scopeAction({query: {value: {scope: undefined}, replace: false}, group: {value: {}, replace: false}})} />
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
        );
    };
};
InformationBar.displayName = 'Information Bar';
InformationBar.propTypes = {
    deleteFacet: PropTypes.func,
    facets: PropTypes.arrayOf(PropTypes.object),
    scope: PropTypes.string,
    selectedFacetsList: PropTypes.arrayOf(PropTypes.string),
    term: PropTypes.string,
    totalCount: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
    unitSearchDispatch: PropTypes.object
};
InformationBar.defaultProps = {
    totalCount : 0,
    selectedFacetsList : []
};
