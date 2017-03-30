import {createStore, applyMiddleware, combineReducers, compose} from 'redux';
import thunkMiddleware from 'redux-thunk';

const combineReducerWithFocus = (projectReducers) => {
  const {dataset, customData, ...otherReducers} = projectReducers;
  const customReducers =  customData ? {customData} : {};
  return combineReducers({
    dataset,
    ...customReducers,
    ...otherReducers,
  });
}

export const createStoreWithFocus = (
    reducers = {},
    customMiddlewares = [],
    enhancers = [],
    translate = element=> element
  ) => {
    return createStore(
      combineReducerWithFocus(reducers),
      compose(
          applyMiddleware(
              ...customMiddlewares,
              thunkMiddleware, // lets us dispatch() functions
              // loggerMiddleware // neat middleware that logs actionsMe
          ),
          ...enhancers
      )
)};
