import { request, response} from "express";
import passport from "passport";

const middlewarePassportCall = (strategy) => {
    return async (req = request,res = response, next) => {
        passport.authenticate(strategy, (err, user, info) => {
            if(err) return res.status(500).send({status: 'Error', error: err});
            if(!user) return res.status(400).send(info)
            req.user = user;
            next()
        })(req,res,next)
    }
}

export default middlewarePassportCall;
