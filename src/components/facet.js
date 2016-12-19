import React, {PropTypes, PureComponent} from 'react';
import {compose} from 'redux';
import i18next from 'i18next';
import Chips from 'focus-components/chips';
import isArray from 'lodash/isArray';

import {facetListWithselectedInformation, selectSearch} from '../reducer';
import {FACET_SHAPE_TYPE, FACET_DESCRIPTOR_SHAPE_TYPE} from '../reducer';


export class FacetTitle extends PureComponent {
    render() {
        const {children} = this.props;
        return <span data-focus='facet-title' >{children}</span>
    };
};
FacetTitle.displayName = 'FacetTitle';


export class FacetCount extends PureComponent {
    render() {
        const {children} = this.props;
        return <span data-focus='facet-count'>{children}</span>
    };
};
FacetCount.displayName = 'FacetCount';



export class Facet extends PureComponent {
    constructor(props) {
        super(props);
        this._onFacetClick = this._onFacetClick.bind(this);
    };
    _onFacetClick() {
        const {code, onClick} = this.props;
        onClick(code);
    };
    render() {
        const {count, label} = this.props;
        return (
            <li data-focus='facet' onClick={this._onFacetClick}>
                <FacetTitle>{label}</FacetTitle>
                <FacetCount>{count}</FacetCount>
            </li>
        );
    };
};
Facet.displayName = 'Facet';
Facet.defaultProps ={
    selected : false
}
Facet.propTypes = FACET_SHAPE_TYPE;




export class FacetSelected extends PureComponent {
    constructor(props) {
        super(props);
        this._onFacetClick = this._onFacetClick.bind(this);
    };
    _onFacetClick() {
        const {code, onClick} = this.props;
        onClick(code);
    };
    render() {
        const {label} = this.props;
        return (
            <li data-focus='facet'>
                <Chips label={label} onDeleteClick={this._onFacetClick} />
            </li>
        );
    }
}
FacetSelected.displayName = 'FacetSelected';
FacetSelected.propTypes = FACET_SHAPE_TYPE;


export class FacetBlock extends PureComponent {
    render() {
        const {code, deleteFacet, FacetComponent, FacetSelectedComponent, label, selected, selectFacet, selectedFacets, values} = this.props;
        return (
            <div data-focus='facet-block' data-selected={selected}>
                <h3>{i18next.t(`search.facet.${label}`)}</h3>
                {selected ?
                    <ul>
                        {
                            isArray(selectedFacets) ?
                            selectedFacets.map(value => (
                                <FacetSelectedComponent
                                    key={code}
                                    label={(values.find(element => element.code === value)).label}
                                    code={value}
                                    onClick={selectedValue => deleteFacet({code: code, values: selectedValue})} />
                            ))
                            :
                            <FacetSelectedComponent
                                key={code}
                                label={(values.find(element => element.code === selectedFacets)).label}
                                code={selectedFacets}
                                onClick={selectedValue => deleteFacet({code: code, values: selectedValue})} />
                        }
                    </ul>
                    :
                    <ul>
                        {
                            values.map(facet => (
                                <FacetComponent
                                    key={facet.code}
                                    {...facet}
                                    onClick={selectedValue => selectFacet({code: code, values: selectedValue})} />
                            ))
                        }
                    </ul>
                }
            </div>
        );
    }
};
FacetBlock.displayName = 'FacetBlock';
FacetBlock.defaultProps = {
    FacetComponent: Facet,
    FacetSelectedComponent: FacetSelected,
    selected: false,
    values: [],
}
FacetBlock.propTypes = {
    ...FACET_DESCRIPTOR_SHAPE_TYPE,
    deleteFacet: PropTypes.func.isRequired,
    selectFacet: PropTypes.func.isRequired,
    FacetComponent: PropTypes.func,
    FacetSelected: PropTypes.func
};

export class FacetPanel extends PureComponent {
    render() {
        const {data, facetAction} = this.props;
        return  (
            <div data-focus='facet-panel'>
                <h4>{i18next.t('focus.search.facets')}</h4>
                {data.map(
                    facetDescriptor => {
                        if(facetDescriptor.values.length > 1 || facetDescriptor.selected) {
                            return <FacetBlock key={facetDescriptor.code}
                                {...facetDescriptor}
                                selected={facetDescriptor.selected}
                                selectFacet={(value) => facetAction(value, false)}
                                deleteFacet={value => facetAction(value, true)} />
                        } else {
                            return null;
                        }
                    }
                )}
            </div>
        );
    }
}
FacetPanel.displayName = 'FacetPanel';
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

export const facetSelector = compose(
    facetListWithselectedInformation,
    selectSearch('advancedSearch')
);
