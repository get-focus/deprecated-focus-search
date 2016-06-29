import {createStore} from 'redux';
const DEFAULT_STATE = {user: {name: 'pas de nom'}};
// On créé un store bidon qui a un state par défaut et le retourne.
// Un reducer est une fonction qui prend le state et le modifie
// Ici notre reducer est une fonction identité
const store = createStore((state = DEFAULT_STATE) => state);

export default store; 
