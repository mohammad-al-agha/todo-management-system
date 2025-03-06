"use server";

import { cookies } from "next/headers";

export const localAction = async (key: string, value?: any) => {
  const cookieStore = await cookies();
  if (value) {
    cookieStore.set(
      key,
      typeof value === "string" ? value : JSON.stringify(value)
    );
  } else {
    return cookieStore.get(key);
  }
};
