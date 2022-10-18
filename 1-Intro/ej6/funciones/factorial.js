function factorial(params) {
   let num = 1
   for (let i = params; i > 0; i--) {
      num *= i
   }
   return num
}


module.exports = factorial
