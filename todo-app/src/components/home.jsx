import { auth } from './firebase';
import { signOut } from 'firebase/auth';
import React from 'react';

function Home({ children, style }) {
	const Logout = async () => {
		try {
			await signOut(auth);
			localStorage.clear();
			window.location.reload();
		} catch(error) {
			console.error('Error signing out:', error);
		}
	};

	return (
		<div>
			<div className="logout">
				<button
					className="logoutBtn"
					onClick={Logout}
					style={style}
				>
					{children} Sign out
				</button>
			</div>
		</div>
	);
}

export default Home;
