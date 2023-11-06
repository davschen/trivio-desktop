class Clue {
  constructor(clueObject) {
    this.categoryString = clueObject.categoryString;
    this.clueString = clueObject.clueString;
    this.responseString = clueObject.responseString;
    this.isWVC = clueObject.isWVC;
    this.isTripleStumper = clueObject.isTripleStumper;
    this.pointValueInt = clueObject.pointValueInt;
  };
};

export default Clue;