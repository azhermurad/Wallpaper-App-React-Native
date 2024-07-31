import {
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
    isAuthanticated: boolean;
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
    const [session, setSession] = useState<string | null>(null);
    const [error, setError] = useState(null);
    const [isAuthanticated, setIsAuthanticated] = useState<boolean>(false);

    const signIn = async (data: Partial<singUpData>) => {
        try {
            const user = await signInWithEmailAndPassword(
                auth,
                data.email as string,
                data.password as string
            );
            console.log(user.user.uid);

            // const userData = {
            //     email: user.user.email,
            //     name: 'azher ali',
            //     image: '',
            //     userid: user.user.uid,
            // };
            // const userCollection = doc(db, 'users', user.user.uid);
            // await setDoc(userCollection, userData);
        } catch (error: any) {
            const errorCode = error.code;
            const errorMessage = error.message;
            console.log(errorMessage);
        }
    };

    useEffect(() => {
        const unsub = onAuthStateChanged(auth, (user) => {
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
            const user = await createUserWithEmailAndPassword(
                auth,
                data.email,
                data.password
            );
            await setDoc(doc(db, 'users', user.user.uid), data);
        } catch (error: any) {
            const errorCode = error.code;
            const errorMessage = error.message;
            console.log(errorMessage);
        }
    };

    return (
        <AuthContext.Provider
            value={{
                isLoading: false,
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
