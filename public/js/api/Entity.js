/**
 * Класс Entity - базовый для взаимодействия с сервером.
 * Имеет свойство URL, равно пустой строке.
 * */
class Entity {
  static URL = ''; // Пустая строка, нужно переопределить в классах-потомках

  static list(data, callback) {
    createRequest({
      url: this.URL,
      data: data,
      method: 'GET',
      callback: callback
    });
  }

  static create(data, callback) {
    createRequest({
      url: this.URL,
      data: data,
      method: 'PUT',
      callback: callback
    });
  }

  static remove(data, callback) {
    createRequest({
      url: this.URL,
      data: data,
      method: 'DELETE',
      callback: callback
    });
  }
}
