// Middleware to check if user is authenticated
const isAuthenticatedMiddleware = (req, res, next) => {
  
    if (req.isAuthenticated()) {
      console.log("t'as bien accès là");
      
      return next();
    } else {
      console.log("You're not auth !!!!!");
        
      
    }
}

module.exports = isAuthenticatedMiddleware