function bindMethods(instance) {
  const methodNames = getMethodNames(
    Object.getPrototypeOf(instance),instance);
  
  const subMethodNames =  getMethodNames(Object.getPrototypeOf(Object.getPrototypeOf(instance)),instance);


  [...methodNames,...subMethodNames].forEach((methodName) => {
    instance[methodName] = instance[methodName].bind(instance);
  });
}

function getMethodNames(prototype, instance) {
  return Object.getOwnPropertyNames(prototype).filter(
    (name) => name !== "constructor" && typeof instance[name] === "function"
  );
}

export default bindMethods;
