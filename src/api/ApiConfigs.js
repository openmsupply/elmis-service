import qs from 'qs';
import https from 'https';

/**
 * Static class for managing Axios configurations of eSigl API
 * requests.
 */
export default class ApiConfigs {
  static cookie = '';

  static BASE_CONFIG = {
    baseURL: 'https://83.96.240.209',
    httpsAgent: new https.Agent({
      rejectUnauthorized: false,
    }),
  };

  static setCookie = cookie => {
    ApiConfigs.cookie = cookie;
  };

  static getLoginConfig = (username, password) => ({
    ...ApiConfigs.BASE_CONFIG,
    url: '/j_spring_security_check',
    withCredentials: true,
    headers: { 'content-type': 'application/x-www-form-urlencoded' },
    data: qs.stringify({ j_username: username, j_password: password }),
    validateStatus: status => (status >= 200 && status < 300) || status === 302,
    maxRedirects: 0,
  });
}
