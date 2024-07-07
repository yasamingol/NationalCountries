import { getCookie } from "./csrf";

export function fetchWithAuth (url, options = {}) {
    const headers = {
      ...options.headers,
      'Authorization': `API ${localStorage.getItem('token')}`,
      'Content-Type': 'application/json',
    };

    return fetch(url, {
      ...options,
      headers,
    });
  };