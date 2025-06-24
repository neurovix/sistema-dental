"use client";

import Image from "next/image";
import React, { useState } from "react";
import { Rubik } from "next/font/google";

const rubik = Rubik({
    subsets: ['latin'],
    weight: ['400', '500', '600']
});

export const Navbar: React.FC = () => {
    const [activeItem, setActiveItem] = useState('Agenda');
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    const menuItems = [
        { name: 'Inicio', href: '/home' },
        { name: 'Agenda', href: '/agenda' },
        { name: 'Configuración', href: '/configuracion' }
    ];

    return (
        <nav className="w-full bg-white shadow-lg border-b border-gray-100 sticky top-0 z-50 transition-all duration-300">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center h-16 lg:h-20">
                    {/* Logo */}
                    <div className="flex-shrink-0 flex items-center">
                        <div className="relative group cursor-pointer">
                            <Image
                                src="/DentaNovaLogo.png"
                                alt="DentaNova Logo"
                                width={45}
                                height={45}
                                className="transition-transform duration-300 group-hover:scale-110"
                            />
                        </div>
                        <div className={`${rubik.className} ml-3 hidden sm:block`}>
                            <h1 className="text-xl lg:text-2xl font-semibold text-gray-800 tracking-tight">
                                DentaNova
                            </h1>
                        </div>
                    </div>

                    {/* Desktop Navigation */}
                    <div className={`${rubik.className} hidden md:block`}>
                        <ul className="flex items-center space-x-1">
                            {menuItems.map((item) => (
                                <li key={item.name}>
                                    <a
                                        href={item.href}
                                        onClick={() => setActiveItem(item.name)}
                                        className={`
                                            relative px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300
                                            hover:bg-blue-50 hover:text-white hover:shadow-sm
                                            ${activeItem === item.name 
                                                ? 'bg-blue-600 text-white shadow-md' 
                                                : 'text-gray-700'
                                            }
                                            group overflow-hidden
                                        `}
                                    >
                                        <span className="relative z-10">{item.name}</span>
                                        <div className={`
                                            absolute inset-0 bg-gradient-to-r from-blue-600 to-blue-700 
                                            transform scale-x-0 group-hover:scale-x-100 transition-transform 
                                            duration-300 origin-left rounded-lg
                                            ${activeItem === item.name ? 'scale-x-100' : ''}
                                        `}></div>
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Mobile menu button */}
                    <div className="md:hidden">
                        <button
                            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                            className="inline-flex items-center justify-center p-2 rounded-lg text-gray-700 hover:text-blue-600 hover:bg-gray-100 transition-colors duration-200"
                            aria-expanded="false"
                        >
                            <span className="sr-only">Abrir menú principal</span>
                            <div className="w-6 h-6 relative">
                                <span className={`absolute h-0.5 w-6 bg-current transform transition-all duration-300 ${isMobileMenuOpen ? 'rotate-45 top-3' : 'top-1'}`}></span>
                                <span className={`absolute h-0.5 w-6 bg-current transform transition-all duration-300 top-3 ${isMobileMenuOpen ? 'opacity-0' : 'opacity-100'}`}></span>
                                <span className={`absolute h-0.5 w-6 bg-current transform transition-all duration-300 ${isMobileMenuOpen ? '-rotate-45 top-3' : 'top-5'}`}></span>
                            </div>
                        </button>
                    </div>
                </div>

                {/* Mobile Navigation */}
                <div className={`md:hidden transition-all duration-300 ease-in-out ${isMobileMenuOpen ? 'max-h-64 opacity-100' : 'max-h-0 opacity-0'} overflow-hidden`}>
                    <div className="pb-4 pt-2 space-y-1 bg-white border-t border-gray-100">
                        {menuItems.map((item) => (
                            <a
                                key={item.name}
                                href={item.href}
                                onClick={() => {
                                    setActiveItem(item.name);
                                    setIsMobileMenuOpen(false);
                                }}
                                className={`
                                    block px-4 py-3 text-base font-medium rounded-lg mx-2 transition-all duration-200
                                    ${activeItem === item.name 
                                        ? 'bg-blue-600 text-white shadow-md' 
                                        : 'text-gray-700 hover:bg-blue-50 hover:text-blue-700'
                                    }
                                `}
                            >
                                {item.name}
                            </a>
                        ))}
                    </div>
                </div>
            </div>
        </nav>
    );
};