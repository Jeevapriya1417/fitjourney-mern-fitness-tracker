"use client";

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/contexts/AuthContext';
import { Dumbbell, Menu, X } from 'lucide-react';
import { useState } from 'react';

export default function Navbar() {
  const pathname = usePathname();
  const { isAuthenticated, logout, user } = useAuth();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { href: '/', label: 'Home' },
    { href: '/about', label: 'About Us' },
    { href: '/plans', label: 'Plans' },
    { href: '/set-goals', label: 'Set Goals' },
    { href: '/goal-track', label: 'Goal Track' },
    { href: '/settings', label: 'Settings' },
  ];

  return (
    <nav className="bg-white border-b border-gray-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2 group">
            <Dumbbell className="h-8 w-8 text-[#5F9EA0] transition-all duration-300 group-hover:rotate-45 group-hover:scale-110" />
            <span className="text-2xl font-bold bg-gradient-to-r from-[#5F9EA0] to-[#4A8A8D] bg-clip-text text-transparent">FITJOURNEY</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`text-base font-medium transition-all duration-300 ${
                  pathname === link.href
                    ? 'text-transparent bg-gradient-to-r from-[#5F9EA0] to-[#4A8A8D] bg-clip-text font-bold'
                    : 'text-black hover:text-[#5F9EA0]'
                }`}
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* Auth Buttons */}
          <div className="hidden md:flex items-center space-x-4">
            {isAuthenticated ? (
              <>
                <span className="text-sm text-gray-600">Hello, {user?.name}</span>
                <Button
                  onClick={logout}
                  variant="outline"
                  className="border-2 border-[#5F9EA0] text-[#5F9EA0] hover:bg-gradient-to-r hover:from-[#5F9EA0] hover:to-[#4A8A8D] hover:text-white hover:border-transparent transition-all duration-300"
                >
                  Logout
                </Button>
              </>
            ) : (
              <>
                <Link href="/login">
                  <Button
                    variant="outline"
                    className="border-2 border-[#5F9EA0] text-[#5F9EA0] hover:bg-gradient-to-r hover:from-[#5F9EA0] hover:to-[#4A8A8D] hover:text-white hover:border-transparent transition-all duration-300"
                  >
                    Login
                  </Button>
                </Link>
                <Link href="/register">
                  <Button className="bg-gradient-to-r from-[#5F9EA0] to-[#4A8A8D] text-white hover:from-[#4A8A8D] hover:to-[#3D7A7D] hover:shadow-lg transition-all duration-300">
                    Sign Up
                  </Button>
                </Link>
              </>
            )}
          </div>

          {/* Mobile menu button */}
          <button
            className="md:hidden text-black"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <div className="md:hidden py-4 space-y-4">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`block text-base font-medium ${
                  pathname === link.href ? 'text-[#5F9EA0] font-bold' : 'text-black'
                }`}
                onClick={() => setMobileMenuOpen(false)}
              >
                {link.label}
              </Link>
            ))}
            <div className="pt-4 space-y-2">
              {isAuthenticated ? (
                <>
                  <p className="text-sm text-gray-600">Hello, {user?.name}</p>
                  <Button
                    onClick={() => {
                      logout();
                      setMobileMenuOpen(false);
                    }}
                    variant="outline"
                    className="w-full border-2 border-[#5F9EA0] text-[#5F9EA0]"
                  >
                    Logout
                  </Button>
                </>
              ) : (
                <>
                  <Link href="/login" className="block">
                    <Button
                      variant="outline"
                      className="w-full border-2 border-[#5F9EA0] text-[#5F9EA0]"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      Login
                    </Button>
                  </Link>
                  <Link href="/register" className="block">
                    <Button
                      className="w-full bg-gradient-to-r from-[#5F9EA0] to-[#4A8A8D] text-white"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      Sign Up
                    </Button>
                  </Link>
                </>
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}