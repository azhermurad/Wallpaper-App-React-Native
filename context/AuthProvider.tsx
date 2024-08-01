import React, {
    useContext,
    createContext,
    type PropsWithChildren,
    useState,
    useEffect,
} from 'react';
import db, { auth } from '../firebaseConfig';
import {
    createUserWithEmailAndPassword,
    onAuthStateChanged,
    signInWithEmailAndPassword,
} from 'firebase/auth';
import { doc, setDoc } from 'firebase/firestore';

interface singUpData {
    email: string;
    password: string;
    name: string;
}

interface AuthcontexTypes {
    isLoading: boolean;
    isAuthanticated: null | boolean;
    signIn(data: Partial<singUpData>): void;
    signUp(data: singUpData): void;
    signOut(): void;
}

const AuthContext = createContext<AuthcontexTypes>({
    isAuthanticated: false,
    isLoading: false,
    signIn: (data: Partial<singUpData>) => null,
    signUp: (data: singUpData) => null,
    signOut: () => null,
});

export const useAuth = () => {
    return useContext(AuthContext);
};

const AuthProvider = ({ children }: { children: React.ReactNode }) => {
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);
    const [isAuthanticated, setIsAuthanticated] = useState<boolean | null>(
        null
    );

    const signIn = async (data: Partial<singUpData>) => {
        try {
            setIsLoading(true);
            const user = await signInWithEmailAndPassword(
                auth,
                data.email as string,
                data.password as string
            );

            setIsLoading(false);
        } catch (error: any) {
            const errorCode = error.code;
            const errorMessage = error.message;
            console.log(errorMessage);
            setIsLoading(false);
        }
    };

    useEffect(() => {
        const unsub = onAuthStateChanged(auth, (user) => {
            console.log(user?.email, 'onauth function is calling');
            if (user) {
                setIsAuthanticated(true);
            } else {
                setIsAuthanticated(false);
            }
        });
        return () => unsub();
    }, []);

    const signUp = async (data: singUpData) => {
        try {
            setIsLoading(true);
            const user = await createUserWithEmailAndPassword(
                auth,
                data.email,
                data.password
            );
            const userData = {
                email: user.user.email,
                name: data.name,
                image: 'imageurl',
                userid: user.user.uid,
            };
            const userCollection = doc(db, 'users', user.user.uid);
            await setDoc(userCollection, userData);
            setIsLoading(false);
        } catch (error: any) {
            const errorCode = error.code;
            const errorMessage = error.message;

            console.log(errorMessage);
            setIsLoading(false);
        }
    };

    console.log(isAuthanticated);
    return (
        <AuthContext.Provider
            value={{
                isLoading,
                signIn,
                signUp,
                isAuthanticated,
                signOut: () => {},
            }}
        >
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;
