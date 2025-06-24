"use client";

import Image from "next/image";
import { Rubik } from "next/font/google"
import Link from "next/link";
import { useState } from "react";

const rubik = Rubik({
    subsets: ['latin'],
})

export default function Home() {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    const toggleMobileMenu = () => {
        setIsMobileMenuOpen(!isMobileMenuOpen);
    };

    const date = new Date();
    const currentYear = date.getFullYear();

  return (
   <main className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 overflow-hidden">
        {/* Navigation with glassmorphism effect */}
        <nav className={`${rubik.className} fixed top-0 w-full z-50 bg-white/80 backdrop-blur-lg border-b border-white/20 shadow-lg`}>
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center py-4">
                    {/* Logo */}
                    <div className="flex items-center">
                        <Link href="/" className="flex items-center space-x-3 group cursor-pointer">
                            <div className="relative">
                                <Image
                                    src="/DentaNovaLogo.png"
                                    width={45}
                                    height={45}
                                    alt="DentaNova Logo"
                                    className="transition-transform duration-300 group-hover:scale-110"
                                />
                            </div>
                            <h1 className="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-cyan-600 to-blue-600 bg-clip-text text-transparent">
                                DentaNova
                            </h1>
                        </Link>
                    </div>
                    
                    {/* Desktop Navigation */}
                    <div className="hidden lg:flex items-center space-x-8">
                        <ul className="flex space-x-8">
                            <li><Link href="/" className="text-gray-700 hover:text-cyan-600 transition-colors duration-300 font-medium relative group">
                                Inicio
                                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-cyan-600 transition-all duration-300 group-hover:w-full"></span>
                            </Link></li>
                            <li><Link href="/about" className="text-gray-700 hover:text-cyan-600 transition-colors duration-300 font-medium relative group">
                                Sobre Nosotros
                                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-cyan-600 transition-all duration-300 group-hover:w-full"></span>
                            </Link></li>
                            <li><Link href="/services" className="text-gray-700 hover:text-cyan-600 transition-colors duration-300 font-medium relative group">
                                Servicios
                                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-cyan-600 transition-all duration-300 group-hover:w-full"></span>
                            </Link></li>
                            <li><Link href="/how-it-works" className="text-gray-700 hover:text-cyan-600 transition-colors duration-300 font-medium relative group">
                                ¿Cómo funciona?
                                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-cyan-600 transition-all duration-300 group-hover:w-full"></span>
                            </Link></li>
                        </ul>
                    </div>
                    
                    {/* Desktop Auth Buttons */}
                    <div className="hidden md:flex items-center space-x-4">
                        <Link href="/login" className="text-gray-700 hover:text-cyan-600 transition-colors duration-300 font-medium">
                            Iniciar Sesión
                        </Link>
                        <Link href="/register" className="bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-700 hover:to-blue-700 text-white font-semibold px-6 py-2.5 rounded-full transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl">
                            Registro
                        </Link>
                    </div>

                    {/* Mobile menu button */}
                    <div className="md:hidden">
                        <button
                            onClick={toggleMobileMenu}
                            className="text-gray-700 hover:text-cyan-600 focus:outline-none focus:text-cyan-600 transition-colors duration-300"
                            aria-label="Toggle mobile menu"
                        >
                            <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                {isMobileMenuOpen ? (
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                ) : (
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                                )}
                            </svg>
                        </button>
                    </div>
                </div>

                {/* Mobile Navigation Menu */}
                <div className={`md:hidden transition-all duration-300 ease-in-out ${isMobileMenuOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0 overflow-hidden'}`}>
                    <div className="px-2 pt-2 pb-3 space-y-1 bg-white/90 backdrop-blur-sm rounded-lg mt-2 border border-white/20 shadow-lg">
                        <Link href="/" className="block px-3 py-2 text-gray-700 hover:text-cyan-600 hover:bg-cyan-50 rounded-md transition-colors duration-300 font-medium">
                            Inicio
                        </Link>
                        <Link href="/about" className="block px-3 py-2 text-gray-700 hover:text-cyan-600 hover:bg-cyan-50 rounded-md transition-colors duration-300 font-medium">
                            Sobre Nosotros
                        </Link>
                        <Link href="/services" className="block px-3 py-2 text-gray-700 hover:text-cyan-600 hover:bg-cyan-50 rounded-md transition-colors duration-300 font-medium">
                            Servicios
                        </Link>
                        <Link href="/how-it-works" className="block px-3 py-2 text-gray-700 hover:text-cyan-600 hover:bg-cyan-50 rounded-md transition-colors duration-300 font-medium">
                            ¿Cómo funciona?
                        </Link>
                        <div className="border-t border-gray-200 pt-3 mt-3">
                            <Link href="/login" className="block px-3 py-2 text-gray-700 hover:text-cyan-600 hover:bg-cyan-50 rounded-md transition-colors duration-300 font-medium">
                                Iniciar Sesión
                            </Link>
                            <Link href="/register" className="block mx-3 mt-2 bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-700 hover:to-blue-700 text-white font-semibold px-4 py-2 rounded-full transition-all duration-300 text-center">
                                Registro
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </nav>

        {/* Hero Section with enhanced visuals */}
        <section className="pt-32 pb-20 px-6 lg:px-8">
            <div className="max-w-7xl mx-auto">
                <div className="grid lg:grid-cols-2 gap-12 items-center">
                    <div className="space-y-8">
                        <div className="space-y-4">
                            <h1 className="text-5xl lg:text-7xl font-bold leading-tight">
                                <span className="block text-gray-900">Sistema para</span>
                                <span className="block">
                                    consultorios{' '}
                                    <span className="bg-gradient-to-r from-cyan-600 to-blue-600 bg-clip-text text-transparent font-extrabold">
                                        dentales
                                    </span>
                                </span>
                            </h1>
                            <p className="text-xl text-gray-600 max-w-2xl leading-relaxed">
                                Revoluciona la gestión de tu clínica dental con nuestra plataforma integral diseñada para optimizar cada aspecto de tu práctica profesional.
                            </p>
                        </div>
                        
                        <div className="flex flex-col sm:flex-row gap-4">
                            <Link href="/how-it-works" className="group bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-700 hover:to-blue-700 text-white font-bold text-lg px-8 py-4 rounded-full transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl inline-flex items-center justify-center">
                                ¿Cómo funciona?
                                <svg className="ml-2 w-5 h-5 transition-transform duration-300 group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                                </svg>
                            </Link>
                            <Link href="/demo" className="group border-2 border-cyan-600 text-cyan-600 hover:bg-cyan-600 hover:text-white font-bold text-lg px-8 py-4 rounded-full transition-all duration-300 inline-flex items-center justify-center">
                                Ver Demo
                                <svg className="ml-2 w-5 h-5 transition-transform duration-300 group-hover:scale-110" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.828 14.828a4 4 0 01-5.656 0M9 10h1m4 0h1m-6 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                            </Link>
                        </div>

                        {/* Stats section */}
                        <div className="grid grid-cols-3 gap-8 pt-8 border-t border-gray-200">
                            <div className="text-center">
                                <div className="text-3xl font-bold text-cyan-600">500+</div>
                                <div className="text-sm text-gray-600">Clínicas activas</div>
                            </div>
                            <div className="text-center">
                                <div className="text-3xl font-bold text-cyan-600">99.9%</div>
                                <div className="text-sm text-gray-600">Tiempo activo</div>
                            </div>
                            <div className="text-center">
                                <div className="text-3xl font-bold text-cyan-600">24/7</div>
                                <div className="text-sm text-gray-600">Soporte técnico</div>
                            </div>
                        </div>
                    </div>
                    
                    <div className="relative">
                        {/* Decorative elements */}
                        <div className="absolute -top-10 -right-10 w-72 h-72 bg-gradient-to-br from-cyan-200 to-blue-200 rounded-full opacity-20 animate-pulse"></div>
                        <div className="absolute -bottom-10 -left-10 w-56 h-56 bg-gradient-to-br from-blue-200 to-purple-200 rounded-full opacity-20 animate-pulse" style={{animationDelay: '1s'}}></div>
                        
                        <div className="relative z-10 flex justify-center">
                            <div className="bg-white rounded-3xl shadow-2xl p-8 transform hover:scale-105 transition-transform duration-300">
                                <Image 
                                    src="/hero.png"
                                    width={350}
                                    height={350}
                                    alt="Sistema dental DentaNova"
                                    className="rounded-2xl"
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>

        {/* Features section */}
        <section className="py-20 bg-white">
            <div className="max-w-7xl mx-auto px-6 lg:px-8">
                <div className="text-center mb-16">
                    <h2 className="text-4xl font-bold text-gray-900 mb-4">¿Por qué elegir DentaNova?</h2>
                    <p className="text-xl text-gray-600 max-w-3xl mx-auto">Descubre las características que hacen de DentaNova la mejor opción para tu clínica dental</p>
                </div>
                
                <div className="grid md:grid-cols-3 gap-8">
                    <div className="bg-gradient-to-br from-cyan-50 to-blue-50 rounded-2xl p-8 hover:shadow-lg transition-shadow duration-300">
                        <div className="w-12 h-12 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-xl flex items-center justify-center mb-6">
                            <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                            </svg>
                        </div>
                        <h3 className="text-xl font-semibold mb-3">Gestión de Pacientes</h3>
                        <p className="text-gray-600">Administra expedientes, historiales médicos y citas de manera eficiente y segura.</p>
                    </div>
                    
                    <div className="bg-gradient-to-br from-blue-50 to-purple-50 rounded-2xl p-8 hover:shadow-lg transition-shadow duration-300">
                        <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-500 rounded-xl flex items-center justify-center mb-6">
                            <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3a2 2 0 012-2h4a2 2 0 012 2v4m-6 4h6m-6 4h6" />
                            </svg>
                        </div>
                        <h3 className="text-xl font-semibold mb-3">Agenda Inteligente</h3>
                        <p className="text-gray-600">Optimiza tu tiempo con un sistema de citas avanzado y recordatorios automáticos.</p>
                    </div>
                    
                    <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-2xl p-8 hover:shadow-lg transition-shadow duration-300">
                        <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl flex items-center justify-center mb-6">
                            <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                            </svg>
                        </div>
                        <h3 className="text-xl font-semibold mb-3">Reportes y Analytics</h3>
                        <p className="text-gray-600">Obtén insights valiosos sobre el rendimiento de tu clínica con reportes detallados.</p>
                    </div>
                </div>
            </div>
        </section>

        {/* Enhanced Footer */}
        <footer className="bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white">
            <div className="max-w-7xl mx-auto px-6 lg:px-8 py-16">
                <div className="grid md:grid-cols-3 gap-12">
                    <div className="space-y-6">
                        <div className="flex items-center space-x-3">
                            <Image
                                src="/DentaNovaLogo.png"
                                width={50}
                                height={50}
                                alt="DentaNova Logo"
                                className="brightness-0 invert"
                            />
                            <h1 className="text-2xl font-bold bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">
                                DentaNova
                            </h1>
                        </div>
                        <p className="text-gray-300 text-lg leading-relaxed">
                            Transformando la gestión de clínicas dentales con tecnología de vanguardia y soluciones innovadoras.
                        </p>
                        <div className="flex space-x-4">
                            <div className="w-2 h-2 bg-cyan-400 rounded-full animate-pulse"></div>
                            <div className="w-2 h-2 bg-blue-400 rounded-full animate-pulse" style={{animationDelay: '0.5s'}}></div>
                            <div className="w-2 h-2 bg-purple-400 rounded-full animate-pulse" style={{animationDelay: '1s'}}></div>
                        </div>
                    </div>
                    
                    <div>
                        <h3 className="text-xl font-semibold mb-6 text-cyan-400">Navegación</h3>
                        <ul className="space-y-4">
                            <li><Link href="/" className="text-gray-300 hover:text-cyan-400 transition-colors duration-300 flex items-center group">
                                <div className="w-1 h-6 bg-cyan-400 mr-3 transition-all duration-300 group-hover:h-8"></div>
                                Inicio
                            </Link></li>
                            <li><Link href="/about" className="text-gray-300 hover:text-cyan-400 transition-colors duration-300 flex items-center group">
                                <div className="w-1 h-6 bg-cyan-400 mr-3 transition-all duration-300 group-hover:h-8"></div>
                                Sobre Nosotros
                            </Link></li>
                            <li><Link href="/services" className="text-gray-300 hover:text-cyan-400 transition-colors duration-300 flex items-center group">
                                <div className="w-1 h-6 bg-cyan-400 mr-3 transition-all duration-300 group-hover:h-8"></div>
                                Servicios
                            </Link></li>
                            <li><Link href="/how-it-works" className="text-gray-300 hover:text-cyan-400 transition-colors duration-300 flex items-center group">
                                <div className="w-1 h-6 bg-cyan-400 mr-3 transition-all duration-300 group-hover:h-8"></div>
                                ¿Cómo funciona?
                            </Link></li>
                        </ul>
                    </div>
                    
                    <div>
                        <div className="bg-gradient-to-r from-cyan-600/20 to-blue-600/20 rounded-2xl p-6 backdrop-blur-sm border border-cyan-500/20">
                            <Image
                                src="/neurovix.png"
                                width={200}
                                height={160}
                                alt="Neurovix Logo"
                                className="mb-4"
                            />
                            <p className="text-gray-300 mb-4">
                                Sistema desarrollado por{' '}
                                <Link className="text-cyan-400 hover:text-cyan-300 transition-colors duration-300 font-semibold" href="https://neurovix.com.mx" target="_blank">
                                    Neurovix S.A de C.V
                                </Link>
                            </p>
                            <div className="flex space-x-3">
                                <Link className="group" target="_blank" href="https://facebook.com/neurovix.nv">
                                    <div className="w-10 h-10 bg-gradient-to-r from-blue-600 to-blue-700 rounded-full flex items-center justify-center hover:from-blue-500 hover:to-blue-600 transition-all duration-300 transform group-hover:scale-110">
                                        <Image src="/facebook.png" alt="Facebook" width={20} height={20} />
                                    </div>
                                </Link>
                                <Link className="group" target="_blank" href="https://instagram.com/neurovix.nv">
                                    <div className="w-10 h-10 bg-gradient-to-r from-pink-600 to-purple-600 rounded-full flex items-center justify-center hover:from-pink-500 hover:to-purple-500 transition-all duration-300 transform group-hover:scale-110">
                                        <Image src="/instagram.png" alt="Instagram" width={20} height={20} />
                                    </div>
                                </Link>
                                <Link className="group" target="_blank" href="#">
                                    <div className="w-10 h-10 bg-gradient-to-r from-gray-600 to-gray-700 rounded-full flex items-center justify-center hover:from-gray-500 hover:to-gray-600 transition-all duration-300 transform group-hover:scale-110">
                                        <Image src="/x.png" alt="X (Twitter)" width={20} height={20} />
                                    </div>
                                </Link>
                                <Link className="group" target="_blank" href="#">
                                    <div className="w-10 h-10 bg-gradient-to-r from-red-600 to-red-700 rounded-full flex items-center justify-center hover:from-red-500 hover:to-red-600 transition-all duration-300 transform group-hover:scale-110">
                                        <Image src="/youtube.png" alt="YouTube" width={20} height={20} />
                                    </div>
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
                
                <div className="border-t border-gray-700 mt-12 pt-8 text-center">
                    <p className="text-gray-400">
                        © {currentYear} DentaNova. Todos los derechos reservados. Desarrollado por Neurovix
                    </p>
                </div>
            </div>
        </footer>
    </main>
  );
}