/**
 * Класс User управляет авторизацией, выходом и
 * регистрацией пользователя из приложения
 * Имеет свойство URL, равное '/user'.
 * */
class User {
  static URL = '/user'; // Адрес для работы с пользователями

  /**
   * Устанавливает текущего пользователя в
   * локальном хранилище.
   * @param {Object} user - Данные пользователя.
   */
  static setCurrent(user) {
    localStorage.user = JSON.stringify(user);
  }

  /**
   * Удаляет информацию об авторизованном
   * пользователе из локального хранилища.
   */
  static unsetCurrent() {
    delete localStorage.user;
  }

  /**
   * Возвращает текущего авторизованного пользователя
   * из локального хранилища.
   * @returns {Object|undefined} - Данные текущего пользователя.
   */
  static current() {
    try {
      return JSON.parse(localStorage.user);
    } catch (e) {
      return undefined;
    }
  }

  /**
   * Получает информацию о текущем
   * авторизованном пользователе.
   * @param {Function} callback - Callback-функция для обработки результата.
   */
  static fetch(callback) {
    createRequest({
      url: this.URL + '/current',
      method: 'GET',
      responseType: 'json',
      callback: (err, response) => {
        if (response.success && response.user) {
          this.setCurrent(response.user);
        }
        callback(err, response);
      }
    });
  }

  /**
   * Производит попытку авторизации.
   * После успешной авторизации необходимо
   * сохранить пользователя через метод
   * User.setCurrent.
   * @param {Object} data - Данные для авторизации (email, password).
   * @param {Function} callback - Callback-функция для обработки результата.
   */
  static login(data, callback) {
    createRequest({
      url: this.URL + '/login',
      method: 'POST',
      responseType: 'json',
      data,
      callback: (err, response) => {
        if (response.success && response.user) {
          this.setCurrent(response.user);
        }
        callback(err, response);
      }
    });
  }

  /**
   * Производит попытку регистрации пользователя.
   * После успешной регистрации необходимо
   * сохранить пользователя через метод
   * User.setCurrent.
   * @param {Object} data - Данные для регистрации (name, email, password).
   * @param {Function} callback - Callback-функция для обработки результата.
   */
  static register(data, callback) {
    createRequest({
      url: this.URL + '/register',
      method: 'POST',
      responseType: 'json',
      data,
      callback: (err, response) => {
        if (response.success && response.user) {
          this.setCurrent(response.user);
        }
        callback(err, response);
      }
    });
  }

  /**
   * Производит выход из приложения.
   * После успешного выхода вызывает метод User.unsetCurrent.
   * @param {Function} callback - Callback-функция для обработки результата.
   */
  static logout(callback) {
    createRequest({
      url: this.URL + '/logout',
      method: 'POST',
      responseType: 'json',
      callback: (err, response) => {
        if (response.success) {
          this.unsetCurrent();
        }
        callback(err, response);
      }
    });
  }
}