import express from 'express'
import {index,show,authenticate,create,destroy,update} from '../handlers/users_handler'
import verifyAuthToken from '../middlewares/authorization_middleware';


const users_routes = (app: express.Application) => {
    app.get('/users', verifyAuthToken, index);
    app.get('/user/:id', verifyAuthToken, show);
    app.post('/user/authenticate', authenticate);
    app.post('/user', create);
    app.delete('/user/:id', verifyAuthToken, destroy);
    app.put('/user/:id', update)
};

export default users_routes
