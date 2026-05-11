import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

type Theme = 'light' | 'dark';
type Language = 'fa' | 'en';

interface AppContextType {
  theme: Theme;
  language: Language;
  isAuthenticated: boolean;
  token: string | null;
  toggleTheme: () => void;
  toggleLanguage: () => void;
  login: (token: string) => void;
  logout: () => void;
  t: (key: string) => string;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

const translations: Record<Language, Record<string, string>> = {
  fa: {
    'app.title': 'نرخ‌بان',
    'nav.dashboard': 'داشبورد',
    'nav.alerts': 'هشدارها',
    'nav.notifications': 'اعلان‌ها',
    'nav.settings': 'تنظیمات',
    'nav.logout': 'خروج',
    
    'dash.quick_alert': 'هشدار سریع',
    'dash.current_price': 'قیمت فعلی',
    'dash.change': 'تغییرات',
    
    'asset.gold': 'طلا (گرم ۱۸ عیار)',
    'asset.silver': 'نقره',
    'asset.usd': 'دلار (تتر)',
    'asset.btc': 'بیت‌کوین',
    
    'alerts.title': 'هشدارهای من',
    'alerts.create': 'ایجاد هشدار جدید',
    'alerts.empty': 'هیچ هشداری تنظیم نشده است.',
    'alerts.target': 'هدف',
    'alerts.condition': 'شرط',
    'alerts.status': 'وضعیت',
    
    'create_alert.title': 'ایجاد هشدار',
    'create_alert.asset': 'دارایی',
    'create_alert.type': 'نوع هشدار',
    'create_alert.type.price': 'قیمت دقیق',
    'create_alert.type.percent': 'درصد تغییر',
    'create_alert.value': 'مقدار هدف',
    'create_alert.condition': 'شرط فعال‌سازی',
    'create_alert.condition.above': 'بیشتر از',
    'create_alert.condition.below': 'کمتر از',
    'create_alert.notify_via': 'نحوه اطلاع‌رسانی',
    'create_alert.submit': 'ذخیره هشدار',
    
    'notif.title': 'تاریخچه اعلان‌ها',
    'notif.empty': 'اعلانی وجود ندارد.',
    'notif.dismiss': 'بستن',
    'notif.snooze': 'تکرار مجدد',
    
    'settings.title': 'تنظیمات',
    'settings.general': 'عمومی',
    'settings.theme': 'حالت تاریک',
    'settings.language': 'تغییر زبان به انگلیسی',
    'settings.notifications': 'اطلاع‌رسانی',
    'settings.behavior': 'رفتار سیستم',
    'settings.support': 'پشتیبانی',
    'settings.save': 'ذخیره تغییرات',
    
    'auth.welcome': 'به نرخ‌بان خوش آمدید',
    'auth.subtitle': 'سیستم هوشمند مانیتورینگ قیمت‌ها',
    'auth.phone': 'شماره موبایل',
    'auth.password': 'رمز عبور',
    'auth.login': 'ورود به حساب',
  },
  en: {
    'app.title': 'Rateban',
    'nav.dashboard': 'Dashboard',
    'nav.alerts': 'Alerts',
    'nav.notifications': 'Notifications',
    'nav.settings': 'Settings',
    'nav.logout': 'Logout',
    
    'dash.quick_alert': 'Quick Alert',
    'dash.current_price': 'Current Price',
    'dash.change': 'Change',
    
    'asset.gold': 'Gold (18k)',
    'asset.silver': 'Silver',
    'asset.usd': 'USD (Tether)',
    'asset.btc': 'Bitcoin',
    
    'alerts.title': 'My Alerts',
    'alerts.create': 'Create New Alert',
    'alerts.empty': 'No alerts set up.',
    'alerts.target': 'Target',
    'alerts.condition': 'Condition',
    'alerts.status': 'Status',
    
    'create_alert.title': 'Create Alert',
    'create_alert.asset': 'Asset',
    'create_alert.type': 'Alert Type',
    'create_alert.type.price': 'Exact Price',
    'create_alert.type.percent': 'Percentage',
    'create_alert.value': 'Target Value',
    'create_alert.condition': 'Trigger Condition',
    'create_alert.condition.above': 'Above',
    'create_alert.condition.below': 'Below',
    'create_alert.notify_via': 'Notify Via',
    'create_alert.submit': 'Save Alert',
    
    'notif.title': 'Notification History',
    'notif.empty': 'No notifications.',
    'notif.dismiss': 'Dismiss',
    'notif.snooze': 'Snooze',
    
    'settings.title': 'Settings',
    'settings.general': 'General',
    'settings.theme': 'Dark Mode',
    'settings.language': 'Switch to Persian',
    'settings.notifications': 'Notifications',
    'settings.behavior': 'System Behavior',
    'settings.support': 'Support',
    'settings.save': 'Save Changes',
    
    'auth.welcome': 'Welcome to Rateban',
    'auth.subtitle': 'Smart Price Monitoring System',
    'auth.phone': 'Phone Number',
    'auth.password': 'Password',
    'auth.login': 'Login',
  }
};

export const AppProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [theme, setTheme] = useState<Theme>('dark');
  const [language, setLanguage] = useState<Language>('fa');
  const [token, setToken] = useState<string | null>(() => 
    localStorage.getItem('authToken')
  );
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(() => 
    !!localStorage.getItem('authToken')
  );

  const toggleTheme = () => {
    setTheme((prev) => (prev === 'light' ? 'dark' : 'light'));
  };

  const toggleLanguage = () => {
    setLanguage((prev) => (prev === 'fa' ? 'en' : 'fa'));
  };

  const login = (newToken: string) => {
    localStorage.setItem('authToken', newToken);
    setToken(newToken);
    setIsAuthenticated(true);
  };

  const logout = () => {
    localStorage.removeItem('authToken');
    setToken(null);
    setIsAuthenticated(false);
  };

  const t = (key: string): string => {
    return translations[language][key] || key;
  };

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    if (theme === 'dark') {
      document.body.classList.add('dark');
    } else {
      document.body.classList.remove('dark');
    }
  }, [theme]);

  useEffect(() => {
    document.documentElement.setAttribute('lang', language);
    document.documentElement.setAttribute('dir', language === 'fa' ? 'rtl' : 'ltr');
  }, [language]);

  return (
    <AppContext.Provider
      value={{
        theme,
        language,
        isAuthenticated,
        token,
        toggleTheme,
        toggleLanguage,
        login,
        logout,
        t,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useAppContext must be used within an AppProvider');
  }
  return context;
};
