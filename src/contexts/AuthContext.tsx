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
  isAdmin: boolean;
  hasActiveSubscription: boolean;
  signupWithEmail: (email: string, password: string) => Promise<void>;
  loginWithEmail: (email: string, password: string, isAdminLogin?: boolean) => Promise<void>;
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

// Admin credentials
const ADMIN_EMAIL = 'admin@xkroot.ai';
const ADMIN_PASSWORD = 'admin123';

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [isNewUser, setIsNewUser] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [hasActiveSubscription, setHasActiveSubscription] = useState(false);
  const navigate = useNavigate();

  async function signupWithEmail(email: string, password: string) {
    const result = await createUserWithEmailAndPassword(auth, email, password);
    setIsNewUser(true);
    navigate('/profile');
  }

  async function loginWithEmail(email: string, password: string, isAdminLogin = false) {
    try {
      // For admin login, verify credentials before Firebase auth
      if (isAdminLogin) {
        if (email !== ADMIN_EMAIL || password !== ADMIN_PASSWORD) {
          throw new Error('Invalid admin credentials');
        }
      }

      const result = await signInWithEmailAndPassword(auth, email, password);
      
      if (isAdminLogin) {
        if (email === ADMIN_EMAIL) {
          setIsAdmin(true);
          navigate('/admin/dashboard');
          return;
        } else {
          throw new Error('Invalid admin credentials');
        }
      }

      // Regular user login flow
      const hasProfile = await checkUserProfile(result.user.uid);
      if (!hasProfile) {
        setIsNewUser(true);
        navigate('/profile');
      } else {
        navigate('/jobs');
      }
    } catch (error) {
      throw error;
    }
  }

  async function loginWithGoogle() {
    const provider = new GoogleAuthProvider();
    const result = await signInWithPopup(auth, provider);
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
    setIsAdmin(false);
    setHasActiveSubscription(false);
    navigate('/login');
  }

  // Check if user has created a profile
  async function checkUserProfile(userId: string): Promise<boolean> {
    // This would typically be a database query
    const profile = localStorage.getItem(`profile_${userId}`);
    return !!profile;
  }

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        // Check if user is admin
        if (user.email === ADMIN_EMAIL) {
          setIsAdmin(true);
        }
        const hasProfile = await checkUserProfile(user.uid);
        setIsNewUser(!hasProfile);

        // Check subscription status
        // This would typically be a database query
        const hasSubscription = localStorage.getItem(`subscription_${user.uid}`);
        setHasActiveSubscription(!!hasSubscription);
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
    isAdmin,
    hasActiveSubscription,
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