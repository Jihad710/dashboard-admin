'use client';
import axios from 'axios';
import { useEffect, useState } from 'react';

const UseAdmins = () => {
	const [admins, setAdmins] = useState(null);
	const [control, setControl] = useState(false);
    const [loading, setLoading] = useState(true);
	const ReFetch = () => {
		setControl(!control)
	}
	useEffect(() => {
		(async () => {
			try {
				const response = await axios(`/api/admins`);
				setAdmins(response.data);
				setLoading(false)
			} catch (error) {
				// Handle error
				console.error(error);
			}
		})();
	}, [control]);

	return {admins, ReFetch,loading};
};

export default UseAdmins;
