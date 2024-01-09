// Import the atomWithStorage function from the Jotai utils module
import { atomWithStorage } from "jotai/utils";

// Create an atom state named productsAtom using atomWithStorage
export const userDetailAtom = atomWithStorage('userDetail', {});
