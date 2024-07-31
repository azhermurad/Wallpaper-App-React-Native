import { Slot } from 'expo-router';
import AuthProvider from '../context/AuthProvider';

export default function Root() {
    return (
        <AuthProvider>
            <Slot />
        </AuthProvider>
    );
}
