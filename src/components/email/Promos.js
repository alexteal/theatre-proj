import { getPromoData, deletePromoData } from "../../dataservice";
import { fetchUserData } from "../../dataservice";
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
