export function domInjector(selector) {
    return function (target, propertyKey) {
        console.log(`Modificando prototype ${target.constructor.name} e adicionando o getter para a propriedade ${propertyKey}`);
        const getter = function () {
            const element = document.querySelector(selector);
            console.log(`buscando elemento do DOM com o seletor ${selector} para injetar em ${propertyKey}`);
            return element;
        };
        Object.defineProperty(target, propertyKey, {
            get: getter
        });
    };
}
