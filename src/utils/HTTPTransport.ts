import { Options } from './types';

enum METHODS {
    GET = 'GET',
    POST = 'POST',
    PUT = 'PUT',
    PATCH = 'PATCH',
    DELETE = 'DELETE'
}

export class HTTPTransport {
  get = (url: string, options: Options = {}) => this.request(url, { ...options, method: METHODS.GET }, options.timeout);

  post = (url: string, options: Options = {}) => this.request(url, { ...options, method: METHODS.POST }, options.timeout);

  put = (url: string, options: Options = {}) => this.request(url, { ...options, method: METHODS.PUT }, options.timeout);

  delete = (url: string, options: Options = {}) => this.request(url, { ...options, method: METHODS.DELETE }, options.timeout);

  queryStringify(data: any) {
    if (typeof data !== 'object') {
      throw new Error('Data must be object');
    }

    const keys = Object.keys(data);
    return keys.reduce((result, key, ind) => `${result}${key}=${data[key]}${ind < keys.length - 1 ? '&' : ''}`, '?');
  }

  request(url: string, options: Options = {}, timeout = 5000): Promise<XMLHttpRequest> {
    const { headers = { 'Content-Type': 'application/json' }, method, data } = options;

    return new Promise((resolve, reject) => {
      if (!method) {
        reject(new Error('No method'));
        return;
      }

      const xhr = new XMLHttpRequest();

      const isGetMethod = method === METHODS.GET;

      const urlData = isGetMethod && !!data ? `${url}${this.queryStringify(data)}` : url;
      xhr.open(method as string, urlData);

      Object.keys(headers).forEach((key) => xhr.setRequestHeader(key, headers[key]));

      xhr.onload = () => {
        const { status, response } = xhr;
        return (status >= 200 && status <= 299) ? resolve(response) : reject(response);
      };

      resolve(xhr);
      xhr.onabort = reject;
      xhr.onerror = reject;

      xhr.timeout = timeout;
      xhr.ontimeout = reject;

      if (isGetMethod || !data) {
        xhr.send();
      } else {
        xhr.send(data);
      }
    });
  }
}