import jsonwebtoken from 'jsonwebtoken';

export const mockJsonWebToken = (data: boolean) => {
  jest.mock('jsonwebtoken');
  jsonwebtoken.verify = jest.fn().mockReturnThis();
  jest.spyOn(jsonwebtoken, 'verify').mockImplementation(() => data);
};
