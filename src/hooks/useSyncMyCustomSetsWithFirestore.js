import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { firestore } from "../services/firebase";
import { updateCustomSets, addAuthorName } from "../redux/customSets/customSetsSlice";
import CustomSetFromV1 from "../models/CustomSetFromV1";
import CustomSetFromCherry from "../models/CustomSetFromCherry";

export async function standardizeCustomSets(customSets) {
  // Checking for properties unique to versions' customSet objects
  const isVersion1 = (set) => {
    return set.jCategoryIDs !== undefined;
  };
  const isVersionCherry = (set) => {
    return set.round1CatIDs !== undefined;
  };
  const isVersionDurian = (set) => {
    return set.round1Clues !== undefined;
  };

  // All versions turn into the latest version, Durian
  async function deserializeVersion1(set) {
    const userSetDocRef = firestore.doc(`userSets/${set.id}`);
    const userSetSnap = await userSetDocRef.get();

    if (!userSetSnap.exists) {
      throw new Error(`User set with id ${set.id} not found`);
    }

    const userSetData = userSetSnap.data();
    userSetData.id = set.id;

    const { jCategoryIDs, djCategoryIDs } = userSetData;
    const round1Categories = await Promise.all(jCategoryIDs.map(async id => {
      if (id) {
        const catSnap = await firestore.doc(`userCategories/${id}`).get();
        return catSnap.data();
      } else {
        return [];
      }
    }));
    const round2Categories = await Promise.all(djCategoryIDs.map(async id => {
      if (id) {
        const catSnap = await firestore.doc(`userCategories/${id}`).get();
        return catSnap.data();
      } else {
        return [];
      }
    }));
    return new CustomSetFromV1(userSetData, round1Categories, round2Categories);
  };

  async function deserializeVersionCherry(set) {
    const userSetDocRef = firestore.doc(`userSets/${set.id}`);
    const userSetSnap = await userSetDocRef.get();

    if (!userSetSnap.exists) {
      throw new Error(`User set with id ${set.id} not found`);
    }

    const userSetData = userSetSnap.data();
    userSetData.id = set.id;

    const { round1CatIDs, round2CatIDs } = userSetData;
    const round1Categories = await Promise.all(round1CatIDs.map(async id => {
      if (id) {
        const catSnap = await firestore.doc(`userCategories/${id}`).get();
        return catSnap.data();
      } else {
        return [];
      }
    }));
    const round2Categories = await Promise.all(round2CatIDs.map(async id => {
      if (id) {
        const catSnap = await firestore.doc(`userCategories/${id}`).get();
        return catSnap.data();
      } else {
        return [];
      }
    }));
    return new CustomSetFromCherry(userSetData, round1Categories, round2Categories);
  }

  const standardizedCustomSetsPromises = customSets.map(set => {
    if (isVersion1(set)) {
      return deserializeVersion1(set);
    } else if (isVersionCherry(set)) {
      return deserializeVersionCherry(set);
    } else if (isVersionDurian(set)) {
      set.dateCreated = set.dateCreated.toString();
      return Promise.resolve(set);
    } else {
      console.log("Unrecognized user set format");
      return Promise.resolve(null);
    }
  });

  const standardizedCustomSets = await Promise.all(standardizedCustomSetsPromises);
  return standardizedCustomSets;
};

function useSyncMyCustomSetsWithFirestore() {
  const dispatch = useDispatch();
  const userUUID = useSelector(state => state.user.UUID);

  useEffect(() => {
    const userSetsRef = firestore.collection('userSets');

    const unsubscribe = userSetsRef.where('userID', '==', userUUID)
      .onSnapshot(async snapshot => {
        const customSetsArray = [];
        snapshot.docChanges().forEach(change => {
          if (change.type === 'added' || change.type === 'modified') {
            customSetsArray.push({ ...change.doc.data(), id: change.doc.id });
          }
          if (change.type === 'removed') {
            const index = customSetsArray.findIndex(set => set.id === change.doc.id);
            if (index !== -1) {
              customSetsArray.splice(index, 1);
            }
          }
        });
        // At this point, customSetsArray is a collection of JS objects with varying
        // properties based on the version the customSet was created/modified during.
        
        // We thus plug in some logic that converts all of these objects into one
        // standardized form, namely the most recent version (Durian, as of writing)
        const standardizedSets = await standardizeCustomSets(customSetsArray);
        const standardizedSetObjects = standardizedSets.map(set => set.toObject ? set.toObject() : set);
        dispatch(updateCustomSets(standardizedSetObjects));
      });
    
    return () => unsubscribe();
  }, [dispatch, userUUID]);
};

export default useSyncMyCustomSetsWithFirestore;