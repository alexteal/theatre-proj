import {
  getPromoData,
  deletePromoData,
  fetchUserData,
  setPromoData,
} from "../../dataService.js";
import { v4 as uuidv4 } from "uuid";

export async function checkPromo(userId, promoId) {
  try {
    const promoData = await getPromoData(promoId);
    const userData = await fetchUserData(userId);
    if (promoData && userData) {
      return promoData.userEmail === userData.email;
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
export async function createPromo(userData, promoVal) {
  try {
    if (userData.registerForPromotion) {
      const promoId = uuidv4();
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
