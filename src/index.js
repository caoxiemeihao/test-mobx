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

    const func = val
    
    if (typeof func === 'function') {
      Object.defineProperty(target.prototype, key, {
        value(...args) {
          console.log(args)
          console.log('before ' + key)
          const ret = func.apply(this, args)
          console.log('after ' + key)

          return ret
        }
      })
    }
  }
}

// bable 编译报错
// 参考链接 [https://github.com/babel/gulp-babel/issues/124]

@log
class Numberic {
  PI = 3.1415925

  add(...nums) {
    return nums.reduce((p, n) => (p + n), 0)
  }
}

new Numberic().add(1, 2, 3)
