import Checkbox from 'focus-components/components/input/checkbox'

export const DO_ID = {
  type: 'text',
  //InputComponent: (props) => <div>DO_ID {JSON.stringify(props)}</div>
}

export const DO_TEXTE = {
  type: 'text',
  //InputComponent: (props) => <div>DO_TEXTE {JSON.stringify(props)}</div>
}
export const DO_AMOUNT = {
  type: 'number',
  //InputComponent: (props) => <div>DO_AMOUNT {JSON.stringify(props)}</div>
}
export const DO_SYMBOL = {
  type: 'text',
  //InputComponent: (props) => <div>DO_SYMBOL {JSON.stringify(props)}</div>
}
export const DO_CODE = {
  type: 'text',
  //InputComponent: (props) => <div>DO_CODE {JSON.stringify(props)}</div>
}
export const DO_MONTANT = {
  type: 'number',
  //InputComponent: (props) => <div>DO_MONTANT {JSON.stringify(props)}</div>
}

export const DO_CHECKBOX = {
  type: 'boolean',
  InputComponent: Checkbox,
  DisplayComponent: Checkbox
}
