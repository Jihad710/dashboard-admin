import AdminNavbar from '@/components/Navbar';
import '../globals.css';
import SecureRoute from '@/components/SecureRoute';

export const metadata = {
	title: 'Dashboard | Insaaftech',
	description:
		""
};

export default function RootLayout({ children }) {
	return (
		// todo: uncomment this component after develop whole dashboard to make secure all routes!
		// <SecureRoute>
		<AdminNavbar>{children}</AdminNavbar>
		// </SecureRoute>
	);
}
