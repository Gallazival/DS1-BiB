const helpers = {
  ifEqual: (value1, value2, options) => {
    if (value1 == value2) {
        return options.fn(this);
    };
  },
  ifQntMaiorQue: (quantidade) => {
    if (quantidade>1){
        return true;
    }else{
        return false;
    };
  }
};

module.exports = helpers;