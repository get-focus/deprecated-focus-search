# Tutorial de fonctionnement de la nouvelle API de forulaire

## De quoi part'on

Nous avons une API qui nous sert un objet JSON de la forme suivante

```json
{  
   "informations":{  
      "uuid":"58d94a87-b8e5-40af-b2d7-fb5ee8cb1270",
      "firstName":"Kian",
      "lastName":"Stroman"
   },
   "adress":[  
      {  
         "uuid":"1234",
         "city":"Cronafort"
      }
   ],
   "finance":{  
      "name":"Personal Loan Account",
      "amount":"157.00",
      "currency":"European Unit of Account 9(E.U.A.-9)",
      "moves":[  
         {  
            "transactionType":"withdrawal",
            "amount":"971.00"
         },
         {  
            "transactionType":"payment",
            "amount":"838.00"
         }
      ]
   }
}
```
L'utilisateur a donc :
- Des informations uuid, name, firstName
- Une adresse
- Des informations financières

L'objectif de ce tutorial est d'afficher chacune de ces données éventuellement un peu plus.

Nous voulons avoir les informations suivantes:
- Un bloc qui contient des données aggrégées sous la forme suivante: `Voici ${name} ${firstName} qui habite à ${ville} et disose de ${amount} sur son compte`
- Un bloc disponible en édition qui contient les infortmations de l'utilisateur
- Un bloc qui récapitule les informations financières et qui permet de les valider


## Initialisation de l'application

- Premièrement nous allons partir du starter kit qui est vide et volontairement ne contient ici que les fichiers de configuration.
- Le fichier `package.json` dispose d'une commande `start` que l'on peut appeller avec `npm start`
- Cette commande fait appel au script suivant:
```js
{
    "dev-server": {
    "command": "node ./server.js", //script appellé au start
    "env": { // L'ensemble des variables d'environnements réglées
      "DEV": true, // Est ce qu'on est en dev ou en prod
      "SOURCE_MAPS": false, // Active t'on les source maps
      "ENTRY_FILE_PATH": "./src/index", // Quel est le point d'entrée
      "PAGE_TITLE": "Focus entity dev page", // Le titre de la page
      "MINIMIFY": false, // Doit'on minifier les sources
      "API_PORT": 9999, // Le port de l'api
      "PACKAGE_JSON_PATH": "../",// Le chemin du package.json
      "ANCHOR_CLASS": "focus-redux-demo-app" // Quelle est la classe du container
    }
  }
}
```
- Lancer la commande `npm start` et rendez vous à [http://localhost:3000](http://localhost:3000)
- Il ne se passe rien

Nous allons donce créer un dans le fichier index.js les élements suivants
Le but est juste d'afficher un composant React.
```jsx
// On récupère react
import React from 'react';
import ReactDOM from 'react-dom';



// On crée le composant Application
const App = props =>
<div>
    /*{On injecte la props name dans le titre}*/
    <h1>Bienvenue {props.name}</h1>
</div>;

// La fonction ReactDOM est utilisée afin de rendre un composant React dans le DOM du navigateur. On doit lui fournir un conteneur HTML en second argument.
ReactDOM.render(
  // On créé le composant App et on lui fournit une props name
  <App name='pierre' />,
  // Conteneur HTML <div class='focus-redux-demo-app'></div>
  // Présent en amont
  document.querySelector('.focus-redux-demo-app')
);

```
