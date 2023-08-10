export class Section {
    constructor({ items/*массив элементов*/, renderer/*функиця отвечающая за отрисовку эелментов*/ }, containerSelector /*селектор контейнера в который всталяем разметку*/) {
        this._renderedItems = items; // сохраняем массив данных
        this._renderer = renderer; // сохраняем функцию рендера 
        this._container = document.querySelector(containerSelector); // сохраняем элемент по селектору контейнера
    }

    // Публичный метод добавления принимающий элемент и добавляющий его в разметку
    addItem(element) {
        this._container.append(element);
    }
    // Публичный метод очистки контейнера
    clear() {
        this._container.innerHTML = '';
    }
    // Публичный метод отрисовки всех элементов, с помощью функции renderer
    renderItems() {
        this.clear();

        this._renderedItems.forEach(item => {
            this._renderer(item);
        });
    }
}