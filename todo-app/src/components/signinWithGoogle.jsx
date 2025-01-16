import { auth, provider } from './firebase';
import { signInWithPopup } from "firebase/auth";

export const signInWithGooglePopup = async () => {
	try {
		await signInWithPopup(auth, provider);
	} catch(err) {
		throw new Error(err.message);
	}
};
