import { auth, provider } from './firebase';
import { signInWithRedirect, signInWithPopup } from "firebase/auth";

export const signInWithGoogleRedirect = async () => {
	try {
		await signInWithRedirect(auth, provider);
	} catch(err) {
		throw new Error(err.message);
	}
};

export const signInWithGooglePopup = async () => {
	try {
		await signInWithPopup(auth, provider);
	} catch(err) {
		throw new Error(err.message);
	}
};
