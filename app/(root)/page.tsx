"use client";
import { AppBar } from '@/components/AppBar';
import Hero from '@/components/Hero';
import { Upload } from '@/components/Upload';

import Image from "next/image";

export default function Home() {
    return (
        <main>
            <AppBar />
            {/* <div className="min-h-screen bg-gray-100"> */}
            <Hero />
            <Upload />
            {/* </div> */}
        </main>
    )
}