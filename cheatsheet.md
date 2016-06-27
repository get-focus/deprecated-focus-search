## Composant react

```
// Quand j'ai besoin d'un mixin
const MonComposant = React.createClass(...)

// Quand j'ai besoin d'une méthode du cycle de vie
// Quand j'ai besoin du state
class MonComposant extends React.Component{}

// Quand je fais un composant pure (presque tout le temps)
// Attention pas de state :+1
function MonComposant(props){...}
```

## High order component usuels

- [connectToForm]()
- [connectToMetadata]()
- [connectToFieldHelpers]()
- [connectToMasterData]()
- [connectToRedux]()

> Ne pas hésiter à faire des
> HoC projets si plusieurs pages pareilles

Exemple

```jsx
const formConfig = {
    formKey: 'userForm',
    entityPathArray: ['user'],
    loadAction: loadUserAction,
    saveAction: saveUserAction,
    nonValidatedFields: ['user.firstName']
};

const ConnectedUserForm = compose(
    connectToMetadata(['user']),
    connectToForm(formConfig),
    connectToFieldHelpers()
)(SmartUser );
```

## Temps de dev (ws compris)

- 1 Page [1/8, 1/2]j
  - 1 header [1/4, 1/2]
  - 1 bloc information [1/4, 1/2]j
  - 1 liste [1/4, 3/4]j
  - 1 popin ajout liste [1/4, 1/2]j
  - 1 bloc d'autres data [1/4, 1/2]j

> Total: [1,5 - 3,25]j
> (HORS MÉTIER COMPLEXE)
> Si ce n'est pas le cas levez une alerte


## PropTypes
Chaque composant doit avoir des [Proptypes](https://facebook.github.io/react/docs/reusable-components.html)
```jsx
MonComposant.propTypes = {
  name: Proptypes.string,
  ...
}
```

## Metadata

Sur les forms pas de composants à la main.<br/>
Utilisez les metadonnées :+1
- [InputComponent]()
- [DisplayComponent]()
- formatter, validators
- ...

## Action builder

- Il est là pour aller vite
- Ne pas hésitez à faire des actions à la main
- 1 noeud`actionBuilder(['nodeName']) => response => dispatch({nodeName : response})`
- N noeuds `actionBuilder(['n1', 'n2', ...]) => response => dispatch({n1 : response.n1}) + dispatch({n2 : response.n2})`

## Une page de detail
- La page appelle le chargement (données critiques + données secondaires)
- Chaque bloc gère sa sauvegarde
- Chaque bloc est un `connectedForm`

```
_Page => action load (load1+2 et load3)
|_block1 => action save1
|_block2 => action save2
|_block3
|_popin1
```

`dispatch(action) => middleware => reducers => state => component update`

## Form Helper
 Les helpers sont là pour vous aider en utilisant les metadonnées.
- [fieldFor](https://github.com/get-focus/focus-tuto-redux/blob/master/README.md#la-vue)
- [displayFor](https://github.com/get-focus/focus-tuto-redux/blob/master/README.md#la-vue)
- [selectFor](https://github.com/get-focus/focus-tuto-redux/blob/master/README.md#les-listes-de-ref%C3%A9rences)
- [listFor](https://github.com/get-focus/focus-tuto-redux/blob/master/README.md#les-listes)
- [fieldForLine](https://github.com/get-focus/focus-tuto-redux/blob/master/README.md#les-listes)

```jsx
const User = ({fieldFor,listFor,selectFor  ...otherProps}) => (
  <Panel title='Exemple' {...otherProps}>
    {/* Exemples avec les helpers*/}
      {fieldFor('name', {entityPath: 'finance'})}
      {selectFor('civility', {entityPath: 'user', masterDatum: 'civility'})}
      {listFor('moves', { redirectEntityPath: ['financialMove'], LineComponent: FinancialMoveLine})}
  </Panel>
)
```

## Field

Ce que je peux fournir au `fieldFor` (et ses frères) [ici]()
- name: string,
- isRequired: boolean,
- validateOnBlur: boolean,
- InputComponent: ReactClass | function,
- SelectComponent: ReactClass | function,
- DisplayComponent: ReactClass | function,
- multiple: boolean
- options: Object,
- onChange: function,
- onBlur: function,
- rawInputValue: any,
- formattedInputValue: any

## Cas d'usages

- J'ai un champ qui dépend d'un autre => middleware custom
- En consultation j'ai un champs avec des étoiles => Je fais un composant à la main que je mets dans le domaine.
- J'ai une liste dans un formulaire => `listFor`
- J'ai une définition avec trop de champs => `nonValidateFields`

## State + reducers
- Si j'ai un sélécteur de state => il doit être écrit à côté du reducer
