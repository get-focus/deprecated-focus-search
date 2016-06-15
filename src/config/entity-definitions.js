export const user = {
  uuid: {
    domain: 'DO_ID',
    required: true
  },
  firstName: {
    domain: 'DO_TEXTE',
    required: true
  },
  lastName: {
    domain: 'DO_TEXTE',
    required: true
  }
}

export const address = {
  uuid: {
    domain: 'DO_ID',
    required: true
  },
  city: {
    domain: 'DO_TEXTE',
    required: true
  }
}

export const finance = {
  name:  {
    domain: 'DO_TEXTE',
    required: true
  },
  amount:  {
    domain: 'DO_AMOUNT',
    required: true
  },
  currency:  {
    domain: 'DO_SYMBOL',
    required: true
  },
  moves:{
    child: 'financialMove'
  }
}


export const financialMove = {
  transactionType: {
    domain: 'DO_CODE',
    required: true
  },
  amount: {
    domain: 'DO_MONTANT',
    required: true
  }
}
