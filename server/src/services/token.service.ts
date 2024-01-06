import jwt from 'jsonwebtoken';
import Token from '../models/Token';
import config from 'config';


const token = () => {
  const generate = (payload: {_id: string}) => {
    const accessToken = jwt.sign(payload, config.get('ACCESS_SECRET'), { algorithm: 'none', expiresIn: '1h'});

    const refreshToken = jwt.sign(payload, config.get('REFRESH_SECRET'));

    return {
      accessToken,
      refreshToken,
      expiresIn: 3600,
    };
  }

  const save = async (userId: string, refreshToken: string) => {
    const data = await Token.findOne({ user: userId });
    if (data) {
      data.refreshToken = refreshToken;
      return data.save();
    }
    const token = await Token.create({ user: userId, refreshToken });
    return token;
  }

  const validateRefresh = (refreshToken: string) => {
    try {
      return jwt.verify(refreshToken, config.get('REFRESH_SECRET'));
    } catch (error) {
      return null;
    }
  }

  const validateAccess = (accessToken: string) => {
    try {
      return jwt.verify(accessToken, config.get('ACCESS_SECRET'));
    } catch (error) {
      return null;
    }
  }
  // const validateAccess = (accessToken: any): any => {
  //   return accessToken;
  // }

  const findToken = async (refreshToken: string) => {
    try {
      return await Token.findOne({ refreshToken });
    } catch (error) {
      return null;
    }
  }

  return { generate, save, validateRefresh, validateAccess, findToken };
}

const tokenService = {
  generate: token().generate,
  save: token().save,
  validateRefresh: token().validateRefresh,
  validateAccess: token().validateAccess,
  findToken: token().findToken,
};

export default tokenService;