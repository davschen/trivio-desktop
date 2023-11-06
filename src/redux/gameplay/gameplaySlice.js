import { createSlice } from "@reduxjs/toolkit";
import ClueMechanics from "../../models/ClueMechanics";
import arraysEqual from "../../utils/ArrayUtils";

const initialGameplayState = {
  gamePhase: "round1",
  gameplayDisplay: "board",
  finalClueStage: "notBegun",
  finishedClues2D: [],
  finishedCategories: [],
  clueMechanics: { ...(new ClueMechanics()) },
  clue: {},
  pointValues: [200, 400, 600, 800, 1000],
}

const gameplaySlice = createSlice({
  name: "gameplay",
  initialState: initialGameplayState,
  reducers: {
    fillFinishedClues: (state, action) => {
      const currentCustomSet = action.payload;
      const clues2DArray = state.gamePhase === "round1" ? currentCustomSet.round1Clues : currentCustomSet.round2Clues;
      clues2DArray.map((cluesArray, catIndex) => (
        state.finishedClues2D.push(cluesArray.flatMap((clue) => clue ? "incomplete" : "empty"))
      ));
      state.finishedCategories = Array(clues2DArray.length).fill(false);
    },
    assignClue: (state, action) => {
      const currentCustomSet = action.payload.currentCustomSet;
      const catIndex = action.payload.catIndex;
      const clueIndex = action.payload.clueIndex;
      
      if (state.finishedClues2D[catIndex][clueIndex] !== "incomplete") { return }

      const categoryNames = state.gamePhase === "round1" ? currentCustomSet.round1CategoryNames : currentCustomSet.round2CategoryNames;
      const clues = state.gamePhase === "round1" ? currentCustomSet.round1Clues[catIndex] : currentCustomSet.round2Clues[catIndex];
      const responses = state.gamePhase === "round1" ? currentCustomSet.round1Responses[catIndex] : currentCustomSet.round2Responses[catIndex];
      const coordsToCheckWVC = (state.gamePhase === "round1" ? 
        currentCustomSet.roundOneDaily : 
        (currentCustomSet.roundTwoDaily1 || currentCustomSet.roundTwoDaily2)
      );
      const isWVC = arraysEqual([catIndex, clueIndex], coordsToCheckWVC);
      const selectedClue = {
        categoryString: categoryNames[catIndex], 
        clueString: clues[clueIndex], 
        responseString: responses[clueIndex], 
        isWVC: isWVC, 
        isTripleStumper: false, 
        pointValueInt: state.pointValues[clueIndex],
      };
      state.clue = selectedClue;
      state.gameplayDisplay = "clue";
    },
    revealClueWVC: (state) => {
      state.clueMechanics.wvcWagerMade = true;
    },
    revealResponse: (state) => {
      state.clueMechanics.showResponse = true;
    },
    returnToBoard: (state) => {
      state.clueMechanics = { ...(new ClueMechanics()) };
      state.gameplayDisplay = "board";
    },
    modifyFinishedClues: (state, action) => {
      const catIndex = action.payload.catIndex;
      const clueIndex = action.payload.clueIndex;
      const currentCustomSet = action.payload.currentCustomSet;
      const clueComplete = action.payload.clueComplete;
      const isNotIncomplete = (finishedCluesArray) => finishedCluesArray !== "incomplete";
      
      if (state.finishedClues2D[catIndex][clueIndex] === "empty") { return }
      state.finishedClues2D[catIndex][clueIndex] = (clueComplete ? "complete" : "incomplete")
      state.finishedCategories[catIndex] = state.finishedClues2D[catIndex].every(isNotIncomplete);
      
      const isTrue = (categoryFinished) => categoryFinished;
      if (state.finishedCategories.every(isTrue)) {
        state.gamePhase = currentCustomSet.hasTwoRounds ? "round2" : "finalClue";
        if (!currentCustomSet.hasTwoRounds) { return }
        state.finishedClues2D = [];
        currentCustomSet.round2Clues.map((cluesArray, catIndex) => (
          state.finishedClues2D.push(cluesArray.flatMap((clue) => clue ? "incomplete" : "empty"))
        ));
        state.finishedCategories = Array(currentCustomSet.round2Clues.length).fill(false);
      }
    }
  }
});

export const { 
  fillFinishedClues, assignClue, revealClueWVC, revealResponse, returnToBoard, modifyFinishedClues
} = gameplaySlice.actions;
export default gameplaySlice.reducer;
