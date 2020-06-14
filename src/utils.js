import Cookies from "js-cookie";
import { useState, useEffect } from "react";

export const formStyle = { border: "2px solid black", padding: "5px" };

export function tryParseCookie(name) {
  const cookie = Cookies.get(name).trim();
  if (!cookie) {
    return;
  }
  try {
    return JSON.parse(cookie);
  } catch {}
}

export function useAutoSaveState(name, initial) {
  const defaultValue = tryParseCookie(name) ?? initial;
  const [value, setValue] = useState(defaultValue);

  useEffect(() => {
    Cookies.set(name, value);
  }, [value, name]);

  return [value, setValue];
}
