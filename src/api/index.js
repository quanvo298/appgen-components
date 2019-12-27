const BASE_URL = process.env.REACT_APP_BACKEND_URL;

export default function buildRequest(url, requestConfig) {
  const endpoint = BASE_URL + url;
  const baseOption = {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
    ...requestConfig,
  };

  return async (payload = {}) => {
    const fullOption = { ...baseOption, ...payload };
    const user = JSON.parse(sessionStorage.getItem('user'));
    if (user && user.accessToken) {
      fullOption.headers.Authorization = `Bearer ${user.accessToken}`;
    }
    let endpointURL = endpoint;
    try {
      if (fullOption.pathVariable) {
        Object.keys(fullOption.pathVariable).map(k => {
          endpointURL = endpointURL.replace(`:${k}`, fullOption.pathVariable[k]);
          return endpointURL;
        });
      }
      if (fullOption.params) {
        const query = Object.keys(fullOption.params)
          .map(k => {
            if (Array.isArray(fullOption.params[k])) {
              return fullOption.params[k]
                .map(val => `${encodeURIComponent(k)}[]=${encodeURIComponent(val)}`)
                .join('&');
            }
            return `${encodeURIComponent(k)}=${encodeURIComponent(fullOption.params[k])}`;
          })
          .join('&');
        endpointURL += `?${query}`;
      }
      const response = await fetch(endpointURL, fullOption);
      const { status } = response;
      let body = {};
      if (status !== 204) {
        body = await response.json();
      }
      return { httpStatus: status, body };
    } catch (error) {
      error.request = { url, fullOption };
      throw error;
    }
  };
}
