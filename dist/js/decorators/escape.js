export function escape(target, propertyKey, descriptor) {
    const originalMethod = descriptor.value;
    descriptor.value = function (...args) {
        let newReturn = originalMethod.apply(this, args);
        if (typeof newReturn === 'string') {
            newReturn = newReturn.replace(/<script>[\s\S]*?<\/script>/, '');
        }
        return newReturn;
    };
    return descriptor;
}
