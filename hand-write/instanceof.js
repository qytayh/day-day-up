function myInstanceof(l, r) {
  if (!['object','function'].includes(typeof l) || l===null ) {
    return false
  }

  let proto = Object.getPrototypeOf(l)

  while (true) {
    if (proto === null) return false

    if (proto === r.prototype) return true

    proto = Object.getPrototypeOf(proto)
  }
}

const Person = function (){}

console.log(typeof  Person)

const p = new Person()

console.log(myInstanceof(p,Object))
console.log(myInstanceof(p,Person))
