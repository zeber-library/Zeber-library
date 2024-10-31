const jwt = require("jsonwebtoken");

const authMiddlewares = (req, res, next) => {
    const authHeader = req.headers.authorization;
    // console.log(req);

    if(!authHeader || !authHeader.startsWith('Bearer ')){
        return res.status(403).json({
            msg: "Login again!",
            code: 404
        });
    }

    // console.log("token received")

    const token = authHeader.split(' ')[1];

    try{
        const decoded = jwt.verify(token, process.env.SECRET);
        // console.log(decoded);
        req.body.email = decoded.email;
        next();
    }
    catch(err){
        return res.status(403).send(err);
    }
};

module.exports = {
    authMiddlewares
}