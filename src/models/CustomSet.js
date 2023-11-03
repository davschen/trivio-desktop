class CustomSet {
  constructor() {
    this.id = null;
    this.round1Clues = {};
    this.round2Clues = {};
    this.round1Responses = {};
    this.round2Responses = {};
    this.round1CategoryNames = {};
    this.round2CategoryNames = {};
    this.title = "";
    this.titleKeywords = [];
    this.description = "";
    this.finalCat = "";
    this.finalClue = "";
    this.finalResponse = "";
    this.dateCreated = Date();
    this.dateLastModified = Date();
    this.roundOneDaily = [];
    this.roundTwoDaily1 = [];
    this.roundTwoDaily2 = [];
    this.userID = "";
    this.numPlays = 0;
    this.numLikes = 0;
    this.numClues = 0;
    this.round1Len = 0;
    this.round2Len = 0;
    this.hasTwoRounds = false;
    this.isDraft = false;
    this.isPublic = false;
  }
};

export default CustomSet;