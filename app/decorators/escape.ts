export function escape(
  target:any,
  propertyKey: string,
  descriptor: PropertyDescriptor
){
  const originalMethod = descriptor.value
  descriptor.value = function(...args:any[]){
    let newReturn = originalMethod.apply(this, args)
    if(typeof newReturn === 'string'){
      // console.log(`@escape em ação na classe ${this.constructor.name} para o método ${propertyKey}`)
      newReturn  = newReturn.replace(/<script>[\s\S]*?<\/script>/, '')
    }
    return newReturn
  }

  return descriptor
}