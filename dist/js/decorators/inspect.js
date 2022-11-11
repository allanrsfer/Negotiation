export function inspect(target, propertyKey, descriptor) {
    const originalMethod = descriptor.value;
    descriptor.value = function (...args) {
        console.log(`--- Método: ${propertyKey}`);
        console.log(`--- parâmetros: ${JSON.stringify(args)}`);
        const newReturn = originalMethod.apply(this, args);
        console.log(`--- retorno ${JSON.stringify(newReturn)}`);
        return newReturn;
    };
    return descriptor;
}
