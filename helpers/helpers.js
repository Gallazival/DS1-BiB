const helpers = {
  ifEqual: (value1, value2, options) => {
    if (value1 == value2) {
        return options.fn(this);
    }
  }

};

module.exports = helpers;