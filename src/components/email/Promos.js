import {
  getPromoData,
  deletePromoData,
  fetchUserData,
  setPromoData,
} from "../../dataService.js";

export async function checkPromo(userId, promoId) {
  try {
    const promoData = await getPromoData(promoId);
    const userData = await fetchUserData(userId);
    if (promoData && userData) {
      return promoData.promoVal;
    } else {
      return false;
    }
  } catch (error) {
    console.error(error);
    return false;
  }
}
export async function redeemPromo(userId, promoId) {
  try {
    const isPromoValid = await checkPromo(userId, promoId);
    if (isPromoValid) {
      await deletePromoData(promoId);
      return true;
    } else {
      return false;
    }
  } catch (error) {
    console.error(error);
    return false;
  }
}
export async function createPromo(userId, promoId, promoVal) {
  try {
    const userData = await fetchUserData(userId);
    if (userData.registerForPromotion) {
      await setPromoData(promoId, promoVal, userData.email);
      return promoId;
    } else {
      return false;
    }
  } catch (error) {
    console.error(error);
    return false;
  }
}
