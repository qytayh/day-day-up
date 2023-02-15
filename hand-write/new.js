function myNew(fun, args) {
  const obj = {}

  obj.__proto__ = fun.prototype

  const r = fun.apply(obj, args)

  return r instanceof Object ? r : obj
}
