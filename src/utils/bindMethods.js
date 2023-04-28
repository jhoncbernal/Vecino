function bindMethods(instance) {
  const methodNames = Object.getOwnPropertyNames(
    Object.getPrototypeOf(Object.getPrototypeOf(instance))
  ).filter(
    (name) => name !== "constructor" && typeof instance[name] === "function"
  );

  methodNames.forEach((methodName) => {
    instance[methodName] = instance[methodName].bind(instance);
  });
}

module.exports = bindMethods;
