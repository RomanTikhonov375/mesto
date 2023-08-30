export class Section {
    constructor({ renderer/*функиця отвечающая за отрисовку эелментов*/ }, containerSelector /*селектор контейнера в который всталяем разметку*/) {
        // this._renderedItems = items; // сохраняем массив данных
        this._renderer = renderer; // сохраняем функцию рендера 
        this._container = document.querySelector(containerSelector); // сохраняем элемент по селектору контейнера
    }

    // Публичный метод добавления принимающий элемент и добавляющий его в разметку
    addItem(element) {
        this._container.prepend(element);
    }

    // Публичный метод отрисовки всех элементов, с помощью функции renderer
    renderItems(items) {
        items.forEach(item => {
            this._renderer(item);
        });
        

    }
}