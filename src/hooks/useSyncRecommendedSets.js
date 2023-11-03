import { firestore } from "../services/firebase";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { updateRecommendedSets, addAuthorNames } from "../redux/customSets/customSetsSlice";
import { standardizeCustomSets } from "./useSyncMyCustomSetsWithFirestore";

async function getSetIDsNames(customSets) {
  const setIDsNames = await Promise.all(customSets.map(async set => {
    if (set) {
      const userDocRef = await firestore.doc(`users/${set.userID}`).get();
      return [set.id, userDocRef.data().name];
    } else {
      return ["", ""];
    }
  }))
  return setIDsNames;
};

function useSyncRecommendedSets() {
  const dispatch = useDispatch()
  
  useEffect(() => {
    const recommendedSets = [];
    const userSetsRef = firestore.collection('userSets');
    userSetsRef.where("isPublic", "==", true)
      .orderBy("dateCreated", "desc")
      .limit(10)
      .get()
      .then(async querySnapshot => {
        querySnapshot.forEach(doc => {
          recommendedSets.push({ ...doc.data(), id: doc.id });
        });
        const standardizedSets = await standardizeCustomSets(recommendedSets);
        const recommendedSetsObjects = standardizedSets.map(set => set.toObject ? set.toObject() : set);
        dispatch(updateRecommendedSets(recommendedSetsObjects));

        const setIDsNames = await getSetIDsNames(standardizedSets);
        dispatch(addAuthorNames(setIDsNames));
      }).catch(error => {
        console.error("Error fetching documents: ", error);
      });
  }, [dispatch]);
};

export default useSyncRecommendedSets;