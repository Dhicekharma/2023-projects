// Import the atomWithStorage function from the Jotai utils module
import { atomWithStorage } from "jotai/utils";

// Create an atom state named userCredAtom using atomWithStorage
export const userCredAtom = atomWithStorage('userCred', {});
