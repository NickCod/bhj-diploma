/**
 * Класс Account наследуется от Entity.
 * Управляет счетами пользователя.
 * Имеет свойство URL со значением '/account'
 * */
class Account extends Entity {
  static URL = '/account'; // Указываем адрес для работы со счетами

  /**
   * Получает информацию о счёте
   * @param {string|number} id - Идентификатор счёта.
   * @param {Function} callback - Callback-функция для обработки результата.
   */
  static get(id = '', callback) {
    // Формируем полный URL, включая id счёта
    const fullURL = this.URL + '/' + id;

    // Выполняем GET-запрос на сервер через createRequest
    createRequest({
      url: fullURL,
      method: 'GET',
      callback: callback
    });
  }
}
