import { UserModel } from '../models/users_model';
import  { NextFunction, Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import { TOKEN_SECRET } from '../info';

const userModel = new UserModel();

export const index = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const allUsers = await userModel.index();
    res.json(allUsers);
  } catch (error) {
    next(error);
  }
};

export const show = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const user = await userModel.show(req.params.id);
    res.json(user);
  } catch (error) {
    next(error);
  }
};

export const create = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { firstName, lastName, password } = req.body;

    if (
      firstName === undefined ||
      lastName === undefined ||
      password === undefined
    ) {
      res.json({
        message:
          'Please make sure to fill all the inputes {fistName,lastName,password}',
      });
    } else {
      const createdUser = await userModel.create(req.body);
      const token = jwt.sign({ user: createdUser }, TOKEN_SECRET as string);
      res.json({
        user:createdUser,
        token:token
      });
    }
  } catch (error) {
    return next(error);
  }
};

export const destroy = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const deletedUser = await userModel.destroy(req.params.id);
    res.json(deletedUser);
  } catch (error) {
    next(error);
  }
};

export const update = async(req:Request,res:Response,next:NextFunction) => {
  try{
    const updatedUser = await userModel.update(req.params.id,req.body.firstName,req.body.lastName,req.body.password)
    res.json(updatedUser);
  }catch(error){
    next(error)
  }
}

export const authenticate = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { firstName, password } = req.body;
    const hashedPassword = await userModel.authenticate(firstName, password);
    const token = jwt.sign(
      { hashedPassword },
      TOKEN_SECRET as unknown as string
    );
    if (!hashedPassword) {
      return res.status(401).json({
        message: 'the username and passwrod do not match please try again',
      });
    }
    return res.json({
      password: hashedPassword,
      token: token,
    });
  } catch (error) {
    return next(error);
  }
};



