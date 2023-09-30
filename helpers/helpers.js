const helpers = {
  ifEqual: (value1, value2, options) => {
    if (value1 == value2) {
        return options.fn(this);
    };
  },

  ifPegouEmp: (idUserEmp, idLivroEmp, idLivro, options) => {
    if (idLivroEmp == idLivro){
        return options.fn({idUserEmp, idLivroEmp, idLivro});
  }},
};
module.exports = helpers;