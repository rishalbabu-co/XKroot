import { createContext, useContext, useEffect, useState } from 'react';
import { 
  Auth,
  User,
  GoogleAuthProvider,
  GithubAuthProvider,
  PhoneAuthProvider,
  signInWithPopup,
  signInWithCredential,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  RecaptchaVerifier
} from 'firebase/auth';
import { auth } from '../lib/firebase';
import { useNavigate } from 'react-router-dom';

interface AuthContextType {
  currentUser: User | null;
  loading: boolean;
  isNewUser: boolean;
  signupWithEmail: (email: string, password: string) => Promise<void>;
  loginWithEmail: (email: string, password: string) => Promise<void>;
  loginWithGoogle: () => Promise<void>;
  loginWithGithub: () => Promise<void>;
  loginWithPhone: (phoneNumber: string) => Promise<string>;
  verifyOTP: (verificationId: string, otp: string) => Promise<void>;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | null>(null);

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [isNewUser, setIsNewUser] = useState(false);
  const navigate = useNavigate();

  async function signupWithEmail(email: string, password: string) {
    const result = await createUserWithEmailAndPassword(auth, email, password);
    setIsNewUser(true);
    // Redirect to profile creation page for new users
    navigate('/profile');
  }

  async function loginWithEmail(email: string, password: string) {
    const result = await signInWithEmailAndPassword(auth, email, password);
    // Check if profile exists
    const hasProfile = await checkUserProfile(result.user.uid);
    if (!hasProfile) {
      setIsNewUser(true);
      navigate('/profile');
    } else {
      navigate('/jobs');
    }
  }

  async function loginWithGoogle() {
    const provider = new GoogleAuthProvider();
    const result = await signInWithPopup(auth, provider);
    // Check if profile exists
    const hasProfile = await checkUserProfile(result.user.uid);
    if (!hasProfile) {
      setIsNewUser(true);
      navigate('/profile');
    } else {
      navigate('/jobs');
    }
  }

  async function loginWithGithub() {
    const provider = new GithubAuthProvider();
    const result = await signInWithPopup(auth, provider);
    // Check if profile exists
    const hasProfile = await checkUserProfile(result.user.uid);
    if (!hasProfile) {
      setIsNewUser(true);
      navigate('/profile');
    } else {
      navigate('/jobs');
    }
  }

  async function loginWithPhone(phoneNumber: string) {
    const recaptcha = new RecaptchaVerifier(auth, 'recaptcha-container', {
      size: 'invisible',
    });
    
    const provider = new PhoneAuthProvider(auth);
    const verificationId = await provider.verifyPhoneNumber(phoneNumber, recaptcha);
    recaptcha.clear();
    return verificationId;
  }

  async function verifyOTP(verificationId: string, otp: string) {
    const credential = PhoneAuthProvider.credential(verificationId, otp);
    const result = await signInWithCredential(auth, credential);
    // Check if profile exists
    const hasProfile = await checkUserProfile(result.user.uid);
    if (!hasProfile) {
      setIsNewUser(true);
      navigate('/profile');
    } else {
      navigate('/jobs');
    }
  }

  async function logout() {
    await signOut(auth);
    navigate('/login');
  }

  // Check if user has created a profile
  async function checkUserProfile(userId: string): Promise<boolean> {
    // This would typically be a database query
    // For now, we'll check localStorage as an example
    const profile = localStorage.getItem(`profile_${userId}`);
    return !!profile;
  }

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        const hasProfile = await checkUserProfile(user.uid);
        setIsNewUser(!hasProfile);
      }
      setCurrentUser(user);
      setLoading(false);
    });

    return unsubscribe;
  }, []);

  const value = {
    currentUser,
    loading,
    isNewUser,
    signupWithEmail,
    loginWithEmail,
    loginWithGoogle,
    loginWithGithub,
    loginWithPhone,
    verifyOTP,
    logout
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
}