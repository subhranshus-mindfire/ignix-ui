import React, { useState } from 'react';
import { LiveProvider, LiveEditor, LiveError, LivePreview } from 'react-live';
import { Navbar } from '.';
import { Heart, Home, Plus, Settings, User } from "lucide-react";



const demo1 = `
  <Navbar
    variant="dark"
    direction="horizontal"
    animationType="spotlight"
  >
    <a href="#"><Home /></a>
    <a href="#"><Heart /></a>
    <a href="#"><Plus /></a>
    <a href="#"><User /></a>
    <a href="#"><Settings /></a>
  </Navbar>
`;

const demo2 = `
    <Navbar variant="primary" animationType="glow">
        <div className="flex items-center justify-between w-full px-4 py-2">
            <div><a href="">Home</a></div>
            <div>
                <a href="">About</a>
            </div>
            <div>
                <input type="text" placeholder=" Search Here..." />
            </div>
            <div>
                <a href="">Contact</a>
            </div>
        </div>
    </Navbar> `;
const demo3 = ` 
<Navbar
    animationType="clickSubmenu"
    variant="dark"
    header="Click Submenu"
    submenuContent={
    <div className="grid grid-cols-3 gap-8 text-sm text-gray-700">
        <div className="flex flex-col space-y-2">
        <span className="font-semibold text-lg">Benefits</span>
        <span className="font-semibold text-lg">Marketplace</span>
        <span className="font-semibold text-lg">Partners</span>
        <span className="font-semibold text-lg">Community</span>
        </div>
        <div className="flex flex-col space-y-1">
        <span className="text-gray-400 text-sm">Company</span>
        <span className="hover:text-black cursor-pointer">Mission</span>
        <span className="hover:text-black cursor-pointer">Pricing</span>
        <span className="hover:text-black cursor-pointer">
            Business
        </span>
        <span className="hover:text-black cursor-pointer">
            Partnership
        </span>
        </div>
        <div className="flex flex-col space-y-1">
        <span className="text-gray-400 text-sm">Follow us</span>
        <span className="hover:text-black cursor-pointer">
            Instagram
        </span>
        <span className="hover:text-black cursor-pointer">
            Facebook
        </span>
        <span className="hover:text-black cursor-pointer">
            LinkedIn
        </span>
        <span className="hover:text-black cursor-pointer">TikTok</span>
        </div>
    </div>
    }
/>`

const demo4 = ` <Navbar
          animationType="hoverSubmenu"
          variant="primary"
          header="Hover Submenu"
          submenuContent={
            <div className="flex items-center justify-between w-full px-4 py-2">
              <div className="text-lg font-semibold">NavBar Demo</div>
              <div className="flex gap-6">
                <div><a href="">Home</a></div>
            <div>
                <a href="">About</a>
            </div>
            <div>
                <input type="text" placeholder=" Search Here..." />
            </div>
            <div>
                <a href="">Contact</a>
            </div>
              </div>
            </div>
          }
        />`

        
export default function NavbarDemo() {
    const [tab, setTab] = useState<'preview' | 'code'>('preview');
    const [tab2, setTab2] = useState<'preview2' | 'code2'>('preview2');
    const [tab3, setTab3] = useState<'preview3' | 'code3'>('preview3');
    const [tab4, setTab4] = useState<'preview4' | 'code4'>('preview4');

    return (
    <div className="w-full max-w-4xl mx-auto rounded-xl border border-gray-200 shadow-sm text-black dark:bg-gray-900 dark:text-white ">

        {/* === Section 1: Spotlight === */}
        <div className="flex items-center border-t border-b bg-gray-50 px-4">
        <button
            onClick={() => setTab2('preview2')}
            className={`px-4 py-2 text-sm font-medium ${
            tab2 === 'preview2' ? '' : ''
            }`}
        >
            Preview
        </button>
        <button
            onClick={() => setTab2('code2')}
            className={`px-4 py-2 text-sm font-medium ${
            tab2 === 'code2' ? '' : ''
            }`}
        >
            Code
        </button>
        <p className="ml-auto px-4 py-2 text-sm font-medium text-gray-600">
            Animation Type: Spotlight
        </p>
        </div>

        <LiveProvider code={demo1} scope={{ Navbar, Home, Heart, Plus, User, Settings, React }}>
        <div className="p-4">
            {tab2 === 'preview2' ? (
            <div className="p-4 bg-white rounded-lg shadow-inner">
                <LivePreview />
            </div>
            ) : (
            <div className="mt-4">
                <LiveEditor className="rounded-md border border-gray-300 bg-gray-50 p-4 text-sm font-mono" />
            </div>
            )}
            <LiveError className="mt-2 text-sm text-red-600" />
        </div>
        </LiveProvider>

        {/* === Section 2: Glow === */}
        <div className="flex items-center border-t border-b bg-gray-50 px-4">
        <button
            onClick={() => setTab('preview')}
            className={`px-4 py-2 text-sm font-medium ${
            tab === 'preview' ? 'border-b-2 border-black' : 'text-gray-500'
            }`}
        >
            Preview
        </button>
        <button
            onClick={() => setTab('code')}
            className={`px-4 py-2 text-sm font-medium ${
            tab === 'code' ? 'border-b-2 border-black' : 'text-gray-500'
            }`}
        >
            Code
        </button>
        <p className="ml-auto px-4 py-2 text-sm font-medium text-gray-600">
            Animation Type: Glow
        </p>
        </div>

        <LiveProvider code={demo2} scope={{ Navbar, React }}>
        <div className="p-4">
            {tab === 'preview' ? (
            <div className="p-4 bg-white rounded-lg shadow-inner">
                <LivePreview />
            </div>
            ) : (
            <div className="mt-4">
                <LiveEditor className="rounded-md border border-gray-300 bg-gray-50 p-4 text-sm font-mono" />
            </div>
            )}
            <LiveError className="mt-2 text-sm text-red-600" />
        </div>
        </LiveProvider>

        {/* === Section 3: clickSubmenu === */}
        <div className="flex items-center border-t border-b bg-gray-50 px-4">
        <button
            onClick={() => setTab3('preview3')}
            className={`px-4 py-2 text-sm font-medium ${
            tab3 === 'preview3' ? 'border-b-2 border-black' : 'text-gray-500'
            }`}
        >
            Preview
        </button>
        <button
            onClick={() => setTab3('code3')}
            className={`px-4 py-2 text-sm font-medium ${
            tab3 === 'code3' ? 'border-b-2 border-black' : 'text-gray-500'
            }`}
        >
            Code
        </button>
        <p className="ml-auto px-4 py-2 text-sm font-medium text-gray-600">
            Animation Type: clickSubmenu
        </p>
        </div>

        <LiveProvider code={demo3} scope={{ Navbar, React }}>
        <div className="p-4">
            {tab3 === 'preview3' ? (
            <div className="p-4 bg-white rounded-lg shadow-inner">
                <LivePreview />
            </div>
            ) : (
            <div className="mt-4">
                <LiveEditor className="rounded-md border border-gray-300 bg-gray-50 p-4 text-sm font-mono" />
            </div>
            )}
            <LiveError className="mt-2 text-sm text-red-600" />
        </div>
        </LiveProvider>

        {/* === Section 4: hoverSubmenu === */}
        <div className="flex items-center border-t border-b bg-gray-50 px-4">
        <button
            onClick={() => setTab4('preview4')}
            className={`px-4 py-2 text-sm font-medium ${
            tab4 === 'preview4' ? 'border-b-2 border-black' : 'text-gray-500'
            }`}
        >
            Preview
        </button>
        <button
            onClick={() => setTab4('code4')}
            className={`px-4 py-2 text-sm font-medium ${
            tab4 === 'code4' ? 'border-b-2 border-black' : 'text-gray-500'
            }`}
        >
            Code
        </button>
        <p className="ml-auto px-4 py-2 text-sm font-medium text-gray-600">
            Animation Type: hoverSubmenu
        </p>
        </div>

        <LiveProvider code={demo4} scope={{ Navbar, React }}>
        <div className="p-4">
            {tab4 === 'preview4' ? (
            <div className="p-4 bg-white rounded-lg shadow-inner">
                <LivePreview />
            </div>
            ) : (
            <div className="mt-4">
                <LiveEditor className="rounded-md border border-gray-300 bg-gray-50 p-4 text-sm font-mono" />
            </div>
            )}
            <LiveError className="mt-2 text-sm text-red-600" />
        </div>
        </LiveProvider>
    </div>
    );
}
        
