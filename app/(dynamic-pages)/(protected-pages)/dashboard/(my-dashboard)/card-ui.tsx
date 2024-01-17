"use server";

import { CARD_VIEW_VERTICAL_LAYOUT_COOKIE_KEY } from "@/constants";
import { cookies } from "next/headers";

export async function setCardLayout(isVisible: boolean) {
  const cookieStore = cookies();
  cookieStore.set(CARD_VIEW_VERTICAL_LAYOUT_COOKIE_KEY, String(isVisible));
  return isVisible;
}
