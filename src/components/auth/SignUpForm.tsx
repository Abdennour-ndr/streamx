import type { ChangeEvent, FormEvent, ReactElement, Fragment as ReactFragment } from 'react';
import { useState, Fragment } from 'react';
import Link from 'next/link';

interface FormData {
  username: string;
  email: string;
  password: string;
  confirmPassword: string;
}

interface FormField {
  id: keyof FormData;
  label: string;
  type: 'text' | 'email' | 'password';
  pattern?: string;
  minLength?: number;
  maxLength?: number;
}

interface SignUpFormProps {
  onSubmit: (username: string, email: string, password: string) => Promise<void>;
  redirectUrl?: string;
}

const SignUpForm = ({ onSubmit, redirectUrl }: SignUpFormProps): ReactElement => {
  const [formData, setFormData] = useState<FormData>({
    username: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [fieldErrors, setFieldErrors] = useState<Partial<Record<keyof FormData, string>>>({});

  const updateFormData = (field: keyof FormData) => (
    e: ChangeEvent<HTMLInputElement>
  ): void => {
    setFormData((prev: FormData) => ({
      ...prev,
      [field]: e.target?.value ?? ''
    }));
    
    // Clear field error when user types
    if (fieldErrors[field]) {
      setFieldErrors((prev: Partial<Record<keyof FormData, string>>) => ({
        ...prev,
        [field]: undefined
      }));
    }
  };

  const validators = {
    email: (email: string): boolean => {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/u;
      return emailRegex.test(email);
    },
    
    password: (password: string): boolean => {
      const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^\w\s])[A-Za-z\d\W]{8,}$/u;
      return passwordRegex.test(password);
    },
    
    username: (username: string): boolean => {
      const usernameRegex = /^[\p{L}\p{N}_]{3,20}$/u;
      return usernameRegex.test(username);
    }
  } as const;

  const validateForm = (): boolean => {
    const { username, email, password, confirmPassword } = formData;
    const errors: Partial<Record<keyof FormData, string>> = {};
    
    // Check for empty fields
    if (!username.trim()) {
      errors.username = 'اسم المستخدم مطلوب';
    } else if (!validators.username(username)) {
      errors.username = 'اسم المستخدم يجب أن يكون بين 3 و 20 حرفاً، ويحتوي على أحرف وأرقام وشرطة سفلية فقط';
    }
    
    if (!email.trim()) {
      errors.email = 'البريد الإلكتروني مطلوب';
    } else if (!validators.email(email)) {
      errors.email = 'البريد الإلكتروني غير صالح';
    }
    
    if (!password) {
      errors.password = 'كلمة المرور مطلوبة';
    } else if (!validators.password(password)) {
      errors.password = 'كلمة المرور يجب أن تحتوي على الأقل 8 أحرف، حرف كبير، حرف صغير، رقم، وحرف خاص';
    }
    
    if (!confirmPassword) {
      errors.confirmPassword = 'تأكيد كلمة المرور مطلوب';
    } else if (password !== confirmPassword) {
      errors.confirmPassword = 'كلمات المرور غير متطابقة';
    }
    
    setFieldErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>): Promise<void> => {
    e.preventDefault();
    setError(null);
    
    if (!validateForm()) {
      return;
    }

    try {
      setLoading(true);
      await onSubmit(
        formData.username.trim(),
        formData.email.trim().toLowerCase(),
        formData.password
      );
    } catch (err: unknown) {
      const errorMessage = err instanceof Error ? err.message : 'حدث خطأ غير متوقع';
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  const formFields: FormField[] = [
    {
      id: 'username',
      label: 'اسم المستخدم',
      type: 'text',
      pattern: '[\\p{L}\\p{N}_]{3,20}',
      minLength: 3,
      maxLength: 20
    },
    {
      id: 'email',
      label: 'البريد الإلكتروني',
      type: 'email'
    },
    {
      id: 'password',
      label: 'كلمة المرور',
      type: 'password',
      minLength: 8
    },
    {
      id: 'confirmPassword',
      label: 'تأكيد كلمة المرور',
      type: 'password',
      minLength: 8
    }
  ];

  return (
    <div className="bg-gray-900 rounded-lg overflow-hidden p-8 max-w-md w-full">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-white">إنشاء حساب StreamX</h2>
        <p className="mt-2 text-gray-400">
          انضم إلى مجتمعنا اليوم
        </p>
      </div>
      
      {error && (
        <div className="mb-4 p-3 bg-red-900/30 border border-red-800 rounded-md text-red-400 text-sm" role="alert">
          {error}
        </div>
      )}
      
      <form onSubmit={handleSubmit} className="space-y-6" noValidate>
        {formFields.map(field => (
          <div key={field.id}>
            <label htmlFor={field.id} className="block text-sm font-medium text-gray-400">
              {field.label}
            </label>
            <input
              id={field.id}
              type={field.type}
              required
              className={`mt-1 block w-full rounded-md bg-gray-800 border-gray-700 text-white shadow-sm focus:border-blue-500 focus:ring-blue-500 ${
                fieldErrors[field.id] ? 'border-red-500' : ''
              }`}
              value={formData[field.id]}
              onChange={updateFormData(field.id)}
              disabled={loading}
              pattern={field.pattern}
              minLength={field.minLength}
              maxLength={field.maxLength}
            />
            {fieldErrors[field.id] && (
              <p className="mt-1 text-sm text-red-500">{fieldErrors[field.id]}</p>
            )}
          </div>
        ))}
        
        <div className="flex items-center">
          <input
            id="terms"
            type="checkbox"
            required
            className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-700 rounded bg-gray-800"
          />
          <label htmlFor="terms" className="ml-2 block text-sm text-gray-400">
            أوافق على{' '}
            <a href="/terms" className="text-blue-500 hover:text-blue-400">
              شروط الخدمة
            </a>{' '}
            و{' '}
            <a href="/privacy" className="text-blue-500 hover:text-blue-400">
              سياسة الخصوصية
            </a>
          </label>
        </div>
        
        <button
          type="submit"
          disabled={loading}
          className={`w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 ${
            loading ? 'opacity-50 cursor-not-allowed' : ''
          }`}
        >
          {loading ? (
            <Fragment>
              <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
              </svg>
              جاري إنشاء الحساب...
            </Fragment>
          ) : (
            'تسجيل'
          )}
        </button>
      </form>
      
      <div className="mt-6 text-center">
        <p className="text-sm text-gray-400">
          لديك حساب بالفعل؟{' '}
          <Link 
            href={`/auth/signin${redirectUrl ? `?redirect=${encodeURIComponent(redirectUrl)}` : ''}`}
            className="text-blue-500 hover:text-blue-400"
          >
            تسجيل الدخول
          </Link>
        </p>
      </div>
    </div>
  );
};

export default SignUpForm;
