import { AuthProvider } from '@/Providers/AuthProvider';
import './globals.css';
import { Inter } from 'next/font/google';

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
	title: 'Auth | Insaaftech',
	description:
		"We are a company that is dedicated to helping businesses achieve their goals through innovative solutions and exceptional customer service."
};

export default function RootLayout({ children }) {
	return (
		<html lang="en">
			<AuthProvider>
				<body className={inter.className}>{children}</body>
			</AuthProvider>
		</html>
	);
}
