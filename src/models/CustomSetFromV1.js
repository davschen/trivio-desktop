class CustomSetFromV1 {
  constructor(customSetV1, round1Categories, round2Categories) {
    this.id = customSetV1.id;
    this.round1Clues = round1Categories.map(category => category.clues);
    this.round2Clues = round2Categories.map(category => category.clues);
    this.round1Responses = round1Categories.map(category => category.responses);
    this.round2Responses = round2Categories.map(category => category.responses);
    this.round1CategoryNames = round1Categories.map(category => category.name);
    this.round2CategoryNames = round2Categories.map(category => category.name);
    this.title = customSetV1.title;
    this.titleKeywords = customSetV1.titleKeywords;
    this.description = "";
    this.finalCat = customSetV1.fjCategory;
    this.finalClue = customSetV1.fjClue;
    this.finalResponse = customSetV1.fjResponse;
    this.dateCreated = customSetV1.dateCreated.toString();
    this.dateLastModified = customSetV1.dateCreated.toString();
    this.roundOneDaily = customSetV1.jeopardyDailyDoubles;
    this.roundTwoDaily1 = customSetV1.djDailyDoubles1;
    this.roundTwoDaily2 = customSetV1.djDailyDoubles2;
    this.userID = customSetV1.userID;
    this.numPlays = customSetV1.plays;
    this.numLikes = 0;
    this.numClues = customSetV1.numclues;
    this.round1Len = customSetV1.jRoundLen;
    this.round2Len = customSetV1.djRoundLen;
    this.hasTwoRounds = true;
    this.isDraft = false;
    this.isPublic = customSetV1.isPublic;
  }

  toObject() {
    return { ...this };
  }
};

export default CustomSetFromV1;