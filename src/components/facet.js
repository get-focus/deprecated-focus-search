import React, {PropTypes} from 'react';
import {compose} from 'redux';
import {facetListWithselectedInformation, selectSearch} from '../reducer';
import Chips from 'focus-components/chips';

import {
    FACET_SHAPE_TYPE,
    FACET_DESCRIPTOR_SHAPE_TYPE
} from '../reducer';



export function FacetTitle(props){
    return <span data-focus='facet-title' >{props.children}</span>
}


export function FacetCount(props){
    return <span data-focus='facet-count'>{props.children}</span>
}


export function Facet(props){
    return (
        <li data-focus='facet' onClick={() => props.onClick(props.code)}>
            <FacetTitle>{props.label}</FacetTitle>
            <FacetCount>{props.count}</FacetCount>
        </li>
    );
}
Facet.defaultProps ={
    selected : false
}
Facet.propTypes = FACET_SHAPE_TYPE;

export function FacetSelected(props){
    return (
        <li data-focus='facet'>
            <Chips label={props.label} onDeleteClick={() => props.onClick(props.code)} />
        </li>
    );
}
FacetSelected.propTypes = FACET_SHAPE_TYPE;

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
    return <div data-focus='facet-block' data-selected={props.selected || false}>
        <h3>{props.label}</h3>
        <ul>
            {props.selected ?
                <div >{props.selectedFacets.map (value =><props.FacetSelectedComponent  key={props.code} label={(props.values.find(element => element.code === value)).label} code={value} onClick={selectedValue => props.deleteFacet({code: props.code, values: selectedValue})}/>)}</div>
                :
                props.values.map(
                    facet => <props.FacetComponent key={facet.code} {...facet} onClick={selectedValue => props.selectFacet({code: props.code, values: selectedValue})}/>
            )}
        </ul>
    </div>
}


FacetBlock.defaultProps = {
    FacetComponent: Facet,
    FacetSelectedComponent: FacetSelected,
    values: []
}
FacetBlock.propTypes = {
    ...FACET_DESCRIPTOR_SHAPE_TYPE,
    deleteFacet: PropTypes.func.isRequired,
    selectFacet: PropTypes.func.isRequired,
    FacetComponent: PropTypes.func,
    FacetSelected: PropTypes.func
};

export function FacetPanel(props){
    return <div data-focus='facet-panel' >
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
