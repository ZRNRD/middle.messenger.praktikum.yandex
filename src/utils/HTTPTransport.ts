import { Options, METHODS, TRequestData } from './types';
import { queryStringify } from './helpers';

export class HTTPTransport {
  protected url: string;

  constructor(path: string) {
    this.url = `${path}`;
  }

  public get<Response>(path = '/', data?: TRequestData, headers?: Record<string, string>): Promise<Response> {
    const query = queryStringify(data);
    return this.request<Response>(this.url + path, {
      method: METHODS.GET,
      data: query,
      headers,
    });
  }

  public post<Response = unknown>(path: string, data?: unknown, headers?: Record<string, string>): Promise<Response> {
    return this.request<Response>(this.url + path, {
      method: METHODS.POST,
      data,
      headers,
    });
  }

  public put<Response = void>(path: string, data: unknown, headers?: Record<string, string>, contentType?: string): Promise<Response> {
    return this.request<Response>(this.url + path, {
      method: METHODS.PUT,
      data,
      headers,
      contentType,
    });
  }

  public patch<Response = void>(path: string, data: unknown, headers?: Record<string, string>): Promise<Response> {
    return this.request<Response>(this.url + path, {
      method: METHODS.PATCH,
      data,
      headers,
    });
  }

  public delete<Response>(path: string, data?: unknown, headers?: Record<string, string>): Promise<Response> {
    return this.request<Response>(this.url + path, {
      method: METHODS.DELETE,
      data,
      headers,
    });
  }

  private request<Response>(url: string, options: Options = { method: METHODS.GET }): Promise<Response> {
    const { method, data = {}, headers = {} } = options;

    return new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest();
      xhr.open(method || '', url);

      xhr.onreadystatechange = () => {
        if (xhr.readyState === XMLHttpRequest.DONE) {
          if (xhr.status >= 200 && xhr.status <= 299) {
            resolve(xhr.response);
          } else {
            reject(xhr.response);
          }
        }
      };

      xhr.onabort = () => reject({ reason: 'abort' });
      xhr.onerror = () => reject({ reason: 'network error' });
      xhr.ontimeout = () => reject({ reason: 'timeout' });

      xhr.withCredentials = true;
      xhr.responseType = 'json';

      Object.entries(headers).forEach((entry) => xhr.setRequestHeader(entry[0], entry[1]));
      xhr.setRequestHeader('Accept', 'application/json');

      if (method === METHODS.GET || !data) {
        xhr.setRequestHeader('Content-Type', 'application/json');
        xhr.send();
      } else if (data instanceof FormData) {
        xhr.send(data);
      } else {
        xhr.setRequestHeader('Content-Type', 'application/json');
        xhr.send(JSON.stringify(data));
      }
    });
  }
}
