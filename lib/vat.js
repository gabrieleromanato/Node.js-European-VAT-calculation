'use strict';

class Vat {
  constructor(value) {
    this.value = ((value / 100) + 1);
  }
  add(amount) {
    return (amount * this.value);
  }
  remove(amount) {
    return (amount / this.value);
  }
  amount(total) {
    let diff = (total / this.value);
    return (total - diff);
  }
}

module.exports = Vat;
