import React, { useState, useEffect } from 'react';

interface AuthProps {
    onLoginSuccess: () => void;
}

const Auth: React.FC<AuthProps> = ({ onLoginSuccess }) => {
    const [isLoginView, setIsLoginView] = useState(true);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [name, setName] = useState(''); // Only for signup
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setError('');
        setIsLoading(true);

        // Simulate network delay
        setTimeout(() => {
            if (!email || !password) {
                setError('Preencha todos os campos.');
                setIsLoading(false);
                return;
            }

            if (isLoginView) {
                // Login Logic
                const storedUser = localStorage.getItem('artifex_user');
                if (storedUser) {
                    const user = JSON.parse(storedUser);
                    if (user.email === email && user.password === password) {
                        onLoginSuccess();
                    } else {
                        setError('Email ou senha incorretos.');
                    }
                } else {
                    // Demo fallback if no user exists
                    if (email === 'demo@artifex.ai' && password === 'demo') {
                        onLoginSuccess();
                    } else {
                         setError('Usuário não encontrado. Crie uma conta.');
                    }
                }
            } else {
                // Signup Logic
                if (!name) {
                     setError('Preencha seu nome.');
                     setIsLoading(false);
                     return;
                }
                const newUser = { name, email, password };
                localStorage.setItem('artifex_user', JSON.stringify(newUser));
                // Auto login after signup
                onLoginSuccess();
            }
            setIsLoading(false);
        }, 1000);
    };

    return (
        <div className="flex flex-col h-full min-h-screen bg-white dark:bg-dark-bg px-6 py-8">
             {/* Background Gradients */}
             <div className="fixed top-[-20%] right-[-20%] w-[80%] h-[50%] bg-primary-400/10 rounded-full blur-3xl pointer-events-none"></div>
             <div className="fixed bottom-[-20%] left-[-20%] w-[80%] h-[50%] bg-secondary-400/10 rounded-full blur-3xl pointer-events-none"></div>

            <div className="flex-1 flex flex-col justify-center relative z-10">
                <div className="mb-8 text-center">
                    <span className="text-3xl font-display font-extrabold tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-primary-600 to-secondary-500 mb-6 block">Artifex</span>
                    <h1 className="text-2xl font-bold text-slate-900 dark:text-white mb-2">
                        {isLoginView ? 'Bem-vindo de volta' : 'Crie sua conta'}
                    </h1>
                    <p className="text-slate-500 dark:text-slate-400 text-sm">
                        {isLoginView ? 'Entre para gerenciar seus roteiros.' : 'Comece a gerar roteiros profissionais.'}
                    </p>
                </div>

                <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                    {!isLoginView && (
                        <div className="space-y-1 animate-in fade-in slide-in-from-bottom-2 duration-300">
                            <label className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 ml-1">Nome</label>
                            <input
                                type="text"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                className="w-full h-14 px-4 rounded-xl bg-slate-50 dark:bg-dark-surface border border-slate-200 dark:border-dark-border text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary-500 focus:bg-white dark:focus:bg-dark-surface transition-all"
                                placeholder="Seu Nome"
                            />
                        </div>
                    )}
                    
                    <div className="space-y-1">
                        <label className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 ml-1">Email</label>
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="w-full h-14 px-4 rounded-xl bg-slate-50 dark:bg-dark-surface border border-slate-200 dark:border-dark-border text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary-500 focus:bg-white dark:focus:bg-dark-surface transition-all"
                            placeholder="seu@email.com"
                        />
                    </div>
                    <div className="space-y-1">
                        <label className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 ml-1">Senha</label>
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="w-full h-14 px-4 rounded-xl bg-slate-50 dark:bg-dark-surface border border-slate-200 dark:border-dark-border text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary-500 focus:bg-white dark:focus:bg-dark-surface transition-all"
                            placeholder="••••••••"
                        />
                    </div>

                    {error && (
                        <div className="p-3 rounded-lg bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 text-sm font-medium text-center animate-pulse">
                            {error}
                        </div>
                    )}

                    {isLoginView && (
                        <div className="flex justify-end">
                            <button type="button" className="text-sm font-medium text-primary-600 hover:text-primary-700 dark:text-primary-400">
                                Esqueceu a senha?
                            </button>
                        </div>
                    )}

                    <button 
                        type="submit"
                        disabled={isLoading}
                        className="w-full h-14 mt-2 bg-primary-600 hover:bg-primary-700 text-white font-bold rounded-xl shadow-lg shadow-primary-500/25 transition-all active:scale-[0.98] disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                    >
                        {isLoading && <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></span>}
                        {isLoginView ? 'Entrar' : 'Cadastrar'}
                    </button>
                </form>

                <div className="relative my-8">
                    <div className="absolute inset-0 flex items-center">
                        <div className="w-full border-t border-slate-200 dark:border-dark-border"></div>
                    </div>
                    <div className="relative flex justify-center text-sm">
                        <span className="px-2 bg-white dark:bg-dark-bg text-slate-500">ou</span>
                    </div>
                </div>

                <div className="text-center">
                    <p className="text-sm text-slate-500 dark:text-slate-400">
                        {isLoginView ? 'Não tem uma conta?' : 'Já tem uma conta?'}
                        <button 
                            onClick={() => {
                                setIsLoginView(!isLoginView);
                                setError('');
                            }}
                            className="font-bold text-primary-600 dark:text-primary-400 ml-1 hover:underline"
                        >
                            {isLoginView ? 'Cadastre-se' : 'Faça Login'}
                        </button>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Auth;