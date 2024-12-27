import { auth, db } from './firebase';
import { createUserWithEmailAndPassword } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";

export const signUpWithEmail = async (email, password, firstName, lastName) => {
	try {
		const userCredential = await createUserWithEmailAndPassword(auth, email, password);
		const user = userCredential.user;
		await setDoc(doc(db, "users", user.uid), {
			firstName,
			lastName,
			email
		});
	} catch(err) {
		throw new Error(err.message);
	}
};
