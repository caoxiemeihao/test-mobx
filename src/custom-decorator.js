"uset strict"

/**
 * 修饰类，入参只有 target [被修饰的类]
 * @param {Class} target 
 */
function log(target) {
  const desc = Object.getOwnPropertyDescriptors(target.prototype) // 获取所有的成员签名

  for ([key, val] of Object.entries(desc)) {
    if (key === 'constructor') {
      continue
    }

    const func = val.value

    if (typeof func === 'function') {
      Object.defineProperty(target.prototype, key, {
        value(...args) {
          console.log('args ->', args)
          console.log('before ->' + key)
          const ret = func.apply(this, args)
          console.log('after ->' + key)

          return ret
        }
      })
    }
  }
}

// bable 编译报错
// 参考链接 [https://github.com/babel/gulp-babel/issues/124]

/**
 * 修饰类成员的装饰器有三个参数
 * @param {Object} target 属性所在的类实例
 * @param {String} key 属性 key
 * @param {Object} desc 描述符
 */
function readonly(target, key, descriptor) {
  console.log(descriptor)
  descriptor.writable = false
}


function validate(target, key, descriptor) {
  const func = descriptor.value
  descriptor.value = function(...args) {
    for (let num of args) {
      if (typeof num !== 'number') {
        throw new Error(`"${num}" is not a number.`)
      }
    }

    return func.apply(this, args)
  }
}


@log
class Numberic {
  @readonly PI = 3.1415925

  @validate
  add(...nums) {
    return nums.reduce((p, n) => (p + n), 0)
  }
}


console.log(new Numberic().add(1, 2, 3)) // 6
new Numberic().PI = 100
new Numberic().add(3, '2', 1)