import { User, UserModel } from '../models/users_model';
import express, { NextFunction, Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import { TOKEN_SECRET } from '../info';
import verifyAuthToken from '../middlewares/authorization_middleware';

const userModel = new UserModel();

const index = async (req: Request, res: Response, next: NextFunction) => {
  try {
    jwt.verify(req.body.token, TOKEN_SECRET as string);
  } catch (error) {
    res.status(401);
    res.json('invalid token' + error);
    return;
  }

  try {
    const allUsers = await userModel.index();
    res.json(allUsers);
  } catch (error) {
    next(error);
  }
};

const show = async (req: Request, res: Response, next: NextFunction) => {
  try {
    jwt.verify(req.body.token, TOKEN_SECRET as string);
  } catch (error) {
    res.status(401);
    res.json('invalid token' + error);
    return;
  }

  try {
    const user = await userModel.show(req.params.id);
    res.json({
      user: { ...user },
    });
  } catch (error) {
    next(error);
  }
};

const create = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const createdUser = await userModel.create(req.body);
    const token = jwt.sign({ user: createdUser }, TOKEN_SECRET as string);
    res.json({
      status: 'success',
      data: { ...createdUser, token },
      message: 'user created successfully',
    });
  } catch (error) {
    next(error);
  }
};

const authenticate = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { firstName, password } = req.body;
    const user = await userModel.authenticate(firstName, password);
    const token = jwt.sign({ user }, TOKEN_SECRET as unknown as string);
    if (!user) {
      return res.status(401).json({
        status: 'error',
        message: 'the username and passwrod do not match please try again',
      });
    }
    return res.json({
      status: 'success',
      data: { user, token },
      message: 'user autheticated successfully',
    });
  } catch (error) {
    return next(error);
  }
};

const user_routes = (app: express.Application) => {
  app.get('/users', index);
  app.get('/user/:id', show);
  app.post('/user/authonticate', authenticate);
  app.post('/user', create);
};

export default user_routes;
