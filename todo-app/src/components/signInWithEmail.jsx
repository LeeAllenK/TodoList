import { auth } from './firebase';
import { signInWithEmailAndPassword } from "firebase/auth";

export const signInWithEmail = async (email, password) => {
	try {
		await signInWithEmailAndPassword(auth, email, password);
	} catch(err) {
		throw new Error(err.message);
	}
};
