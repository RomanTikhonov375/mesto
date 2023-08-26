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
    renderItems(obj, userId, ownerId) {
        // Проверка если передаваемый элемент массив, то делаем перебор, иначе просто добавляем элемент. 
        if (Array.isArray(obj)) {
            obj.forEach(item => {
                this._renderer(item, userId, ownerId);
            });
        } else this._renderer(obj);

    }
}