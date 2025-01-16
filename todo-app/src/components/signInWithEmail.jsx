import { auth, } from './firebase';
import { signInWithEmailAndPassword } from "firebase/auth";

export const signInWithEmail = async (email, password) => {
	try {
		const userCredential = await signInWithEmailAndPassword(auth, email, password);
		const user = userCredential.user;
		localStorage.setItem('email', user.email);
	} catch(err) {
		throw new Error(err.message);
	}
};
