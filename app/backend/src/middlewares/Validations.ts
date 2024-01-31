import { Request, Response, NextFunction } from 'express';

class Validations {
  static validateTeams(req: Request, res: Response, next: NextFunction): Response | void {
    const team = req.body;
    const requiredKeys = ['teamsName'];
    const notFoundKey = requiredKeys.find((key) => !(key in team));
    if (notFoundKey) {
      return res.status(400).json({ message: `${notFoundKey} is required` });
    }

    next();
  }
}

export default Validations;
