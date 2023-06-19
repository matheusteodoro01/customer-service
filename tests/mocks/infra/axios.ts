import axios from 'axios';
import { makePublicKey } from '@/tests/mocks';

export const mockAxios = (data?: any, status?: number) => {
  jest.mock('axios');
  axios.create = jest.fn().mockReturnThis();

  jest.spyOn(axios, 'get').mockImplementation((url) => {
    if (url.includes('/protocol/openid-connect/certs')) {
      if (status && status !== 200) {
        return Promise.reject({ response: { status } });
      }
      return Promise.resolve({ data: data ?? makePublicKey });
    }
    return Promise.resolve({ data });
  });
};
