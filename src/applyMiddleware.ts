function applyMiddleWare(...middlewares) {
  return ({
    useRedux, 
    store, 
    Provider, 
    useSelect
}) => middlewares.reduce((acc, middleware) => 
  {
    const resultMiddleware = middleware(useRedux);
        
    return {
      ...acc, 
      ...resultMiddleware, 
      store, 
      Provider,
      useSelect
    };
    
  }, {});
}

export default applyMiddleWare;
