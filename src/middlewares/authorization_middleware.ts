import { NextFunction, Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import { TOKEN_SECRET } from '../info';

const verifyAuthToken = (req: Request, res: Response, next: NextFunction) => {
  try {
    const authorizationHeader = req.headers.authorization;
    console.log(authorizationHeader);
    const token = authorizationHeader?.split(' ')[1];
    const decoded = jwt.verify(token as string, TOKEN_SECRET as string);
    console.log(token, decoded);
    console.log(`filaed auth`);
    if (decoded) {
      console.log('autherized');
      next();
    }
  } catch (error) {
    res.status(401);
    next(error);
  }
};

export default verifyAuthToken;
