const jwt = require("jsonwebtoken") ;
const authorization = (req,res,next)=>{
    const token = req.headers.authorization ;
    if (token) {
      const decoded = jwt.verify(token, process.env.key);
      if (decoded) {
        console.log(decoded)
        const userID= decoded.userID ;
        console.log(userID)
        req.body.userID = userID
        next();
      } else {
        res.send("please loign first");
      }
    } else {
      res.send("please loign first");
    }
}
module.exports ={
    authorization
}