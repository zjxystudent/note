function idMaker() {
  let index = 0;
  return {
    next: function() {
      return { value: index++, done: false };
    }
  };
}
const it = idMaker();
it.next().value 
console.log(it.next().value )