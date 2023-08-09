/**
 * Основная функция для совершения запросов
 * на сервер.
 * */
const createRequest = (options = {}) => {
  const xhr = new XMLHttpRequest();

  xhr.open(options.method, options.url);

  if (options.method === "GET") {
    const params = new URLSearchParams(options.data);
    xhr.open(options.method, `${options.url}?${params}`);
  } else {
    const formData = new FormData();
    for (const key in options.data) {
      formData.append(key, options.data[key]);
    }
    xhr.send(formData);
  }

  xhr.responseType = "json";

  xhr.onload = () => {
    if (xhr.status === 200) {
      options.callback(null, xhr.response);
    } else {
      options.callback({ status: xhr.status, message: xhr.statusText }, null);
    }
  };

  xhr.onerror = () => {
    options.callback({ status: xhr.status, message: xhr.statusText }, null);
  };

  xhr.send();
};
