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



export const FacetTitle = (props) => (
    <span data-focus='facet-title'>{props.children}</span>
);
FacetTitle.displayName = 'FacetTitle';




export const FacetCount = (props) => (
    <span data-focus='facet-count'>{props.children}</span>
);
FacetCount.displayName = 'FacetCount';




export const Facet = (props) => (
    <li data-focus='facet' onClick={() => props.onClick(props.code)}>
        <FacetTitle>{props.label}</FacetTitle>
        {props.count &&
            <FacetCount>{props.count}</FacetCount>
        }
    </li>
);
Facet.propTypes = FACET_SHAPE_TYPE;

// export const FacetChips = (props) => (
//     <li data-focus='facet' onClick={() => props.onClick(props.code)}>
//         <span class="mdl-chip mdl-chip--deletable">
//             <span class="mdl-chip__text">{props.label}</span>
//             <button type="button" class="mdl-chip__action"><i class="material-icons">cancel</i></button>
//         </span>
//     </li>
// );
// FacetChips.propTypes = FACET_SHAPE_TYPE;

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

export const FacetBlock = (props) => (
    <div data-focus='facet-block'>
        <h3>{props.label}</h3>
        <ul>
        {
            props.selected ?
                <div>{props.selectedFacets.map(value =><props.FacetComponent key={props.code} label={value} code={value} onClick={selectedValue => props.deleteFacet({code: props.code, values: selectedValue})}/>)}</div>
            :
                props.values.map(
                    facet => <props.FacetComponent key={facet.code} {...facet} onClick={selectedValue => props.selectFacet({code: props.code, values: selectedValue})}/>
                )
        }
        </ul>
    </div>
);
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



const FacetPanel = (props) => (
    <div data-focus='facet-panel'>
    <h2>{props.title}</h2>
    {props.data.map(
        facetDescriptor => <FacetBlock key={facetDescriptor.code} {...facetDescriptor} selected={facetDescriptor.selected} selectFacet={(value) => props.facet(value, false)} deleteFacet={value => props.facet(value, true)}/>)
    }
    </div>
);
FacetPanel.defaultProps = {
    data: []
}
FacetPanel.propTypes = {
    title: PropTypes.string,
    data: PropTypes.arrayOf(PropTypes.shape(FACET_DESCRIPTOR_SHAPE_TYPE))
};
export default FacetPanel;

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
