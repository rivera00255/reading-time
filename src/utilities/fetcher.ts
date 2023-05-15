type Method = 'GET' | 'POST' | 'PUT' | 'DELETE';

export const fetcher = async (method: Method, url: string, body?: { [key: string]: any }, cache?: RequestCache) => {
  try {
    const response = await fetch(url, {
      method: method,
      body: JSON.stringify(body),
      cache: cache ? cache : 'default',
    });
    return await response.json();
  } catch (e) {
    console.log(e);
  }
};

export const fetcherWithAuth = async (
  method: Method,
  url: string,
  headers?: { [key: string]: string },
  body?: { [key: string]: any }
) => {
  try {
    const response = await fetch(url, {
      method: method,
      headers: headers,
      body: JSON.stringify(body),
    });
    return await response.json();
  } catch (e) {
    console.log(e);
  }
};
