class CustomSetFromCherry {
  constructor(customSetCherry, round1Categories, round2Categories) {
    this.id = customSetCherry.id;
    this.round1Clues = round1Categories.map(category => category.clues);
    this.round2Clues = round2Categories.map(category => category.clues);
    this.round1Responses = round1Categories.map(category => category.responses);
    this.round2Responses = round2Categories.map(category => category.responses);
    this.round1CategoryNames = round1Categories.map(category => category.name);
    this.round2CategoryNames = round2Categories.map(category => category.name);
    this.title = customSetCherry.title;
    this.titleKeywords = customSetCherry.titleKeywords;
    this.description = customSetCherry.description;
    this.finalCat = customSetCherry.finalCat;
    this.finalClue = customSetCherry.finalClue;
    this.finalResponse = customSetCherry.finalResponse;
    this.dateCreated = customSetCherry.dateCreated.toString();
    this.dateLastModified = customSetCherry.dateLastModified.toString();
    this.roundOneDaily = customSetCherry.roundOneDaily;
    this.roundTwoDaily1 = customSetCherry.roundTwoDaily1;
    this.roundTwoDaily2 = customSetCherry.roundTwoDaily2;
    this.userID = customSetCherry.userID;
    this.numPlays = customSetCherry.plays;
    this.numLikes = 0;
    this.numClues = customSetCherry.numClues;
    this.round1Len = customSetCherry.round1Len;
    this.round2Len = customSetCherry.round2Len;
    this.hasTwoRounds = customSetCherry.hasTwoRounds;
    this.isDraft = customSetCherry.isDraft;
    this.isPublic = customSetCherry.isPublic;
  }

  toObject() {
    return { ...this };
  }
};

export default CustomSetFromCherry;