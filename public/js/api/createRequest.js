/**
 * Основная функция для совершения запросов
 * на сервер.
 * */

const createRequest = (options = {}) => {
  const xhr = new XMLHttpRequest();

  const url = options.url ? new URL(options.url, location.origin) : false;
  const { method, callback, data } = options;

  const formData = new FormData();

  if (!url && !method && !callback) {
    console.error('Не хватате данных для запроса');
    return;
  }

  if (data) {
    if (method === 'GET') {
      for (let i in data) {
        url.searchParams.set(i, options.data[i]);
      }
    } else {
      for (let i in data) {
        formData.append(i, options.data[i]);
      }
    }
  }

  try {
    xhr.responseType = 'json';
    xhr.open(method, url);

    if (method === 'GET') {
      xhr.send();
    } else {
      xhr.send(formData);
    }

    xhr.onreadystatechange = function () {
      if (xhr.readyState === 4 && xhr.status === 0) {
        throw new Error('Произошла неизвестная ошибка. Ответ сервера не получен.');
      }
    };
  } catch (err) {
    callback(err);
  }

  xhr.addEventListener('load', () => {
    if (xhr.response.success) {
      callback(null, xhr.response);
    } else {
      callback(xhr.response.error);
    }
  });
};
