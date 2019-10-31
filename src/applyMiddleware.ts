const applyMiddleWare = (...middlewares) => useRedux => 
  middlewares.reduce((acc, middleware) => 
    {
      const resultMiddleware = middleware(useRedux);
      return {
        ...acc, 
        ...resultMiddleware, 
      };   
    }, {}
  );

export default applyMiddleWare;
