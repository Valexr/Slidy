
export function makeObservable(target) {
    let handlers = Symbol('handlers');
    // 1. Создадим хранилище обработчиков
    target[handlers] = [];

    // положим туда функции-обработчики для вызовов в будущем
    target.observe = function (handler) {
        this[handlers].push(handler);
    };

    // 2. Создадим прокси для реакции на изменения
    return new Proxy(target, {
        get(target, prop) {
            if (prop in target) {
                target[handlers].forEach(handler => handler(target, prop));
                return target[prop];
            } else {
                return 0; // значение по умолчанию
            }
        },
        set(target, property, value, receiver) {
            let success = Reflect.set(...arguments); // перенаправим операцию к оригинальному объекту
            if (success) { // если не произошло ошибки при записи свойства
                // вызовем обработчики
                target[handlers].forEach(handler => handler(property, value));
            }
            return success;
        }
    });
}

// let user = {};

// user = makeObservable(user);

// user.observe((key, value) => {
//     alert(`SET ${key}=${value}`);
// });

// user.name = "John";