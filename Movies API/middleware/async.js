module.exports = function asyncMiddleware(handler){
    return async (req, res, next) => {
        try {
          await handler(req, res)
        }
        catch(ex){
          next(ex);                       // this is coming from index.js > function(err, req, res, next)
        }
      } ;
}