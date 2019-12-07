import { Request, Response } from 'express';
import { OK } from 'http-status-codes';
import { version } from '../../../package.json';

const health = (req: Request, res: Response) => {
  res.status(OK).json({ version });
};

export default health;
