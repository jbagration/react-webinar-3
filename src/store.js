/**
 * Хранилище состояния приложения
 */
class Store {
  constructor(initState = {}) {
    this.state = {
      ...initState,
      lastAddedCode: 0, // Добавляем поле для хранения последнего добавленного кода
    };
    this.listeners = []; // Слушатели изменений состояния
  }
  /**
   * Подписка слушателя на изменения состояния
   * @param listener {Function}
   * @returns {Function} Функция отписки
   */
  subscribe(listener) {
    this.listeners.push(listener);
    // Возвращается функция для удаления добавленного слушателя
    return () => {
      this.listeners = this.listeners.filter(item => item !== listener);
    };
  }

  /**
   * Выбор состояния
   * @returns {Object}
   */
  getState() {
    return this.state;
  }

  /**
   * Установка состояния
   * @param newState {Object}
   */
  setState(newState) {
    this.state = newState;
    // Вызываем всех слушателей
    for (const listener of this.listeners) listener();
  }

  /**
   * Добавление новой записи
   */
  addItem() {
    const newCode = this.generateUniqueCode();

    const newList = [...this.state.list, { code: newCode, title: 'Новая запись' }];

    this.setState({
      ...this.state,
      list: newList,
      lastAddedCode: newCode, // Обновляем последнее добавленное число
    });
  }

  /**
   * Генерация уникального кода для новой записи
   * @returns {number}
   */
  generateUniqueCode() {
    // Если есть последнее добавленное число, используем его + 1
    if (this.state.lastAddedCode) {
      return this.state.lastAddedCode + 1;
    }

    // Если список не пуст, начинаем с максимального кода в списке + 1
    if (this.state.list.length > 0) {
      const maxCode = Math.max(...this.state.list.map(item => item.code));
      return maxCode + 1;
    }

    // В противном случае, начинаем с 1
    return 1;
  }
  /**
   * Удаление записи по коду
   * @param code
   */
  deleteItem(code) {
    this.setState({
      ...this.state,
      list: this.state.list.filter(item => item.code !== code),
    });
  }

  /**
   * Выделение записи по коду
   * @param code
   */
  selectItem(code) {
    this.setState({
      ...this.state,
      list: this.state.list.map(item => {
        if (item.code === code && !item.selected) {
          item.selected = true;
          item.highlightCount = (item.highlightCount || 0) + 1;
        } else {
          item.selected = false;
        }
        return item;
      }),
    });
  }
}

export default Store;