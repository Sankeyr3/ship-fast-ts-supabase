import { Suspense } from 'react'
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import Problem from "@/components/Problem";
import FeaturesAccordion from "@/components/FeaturesAccordion";
import Pricing from "@/components/Pricing";
import FAQ from "@/components/FAQ";
import CTA from "@/components/CTA";
import Footer from "@/components/Footer";
import CatApi from '@/components/CatApi';
import Landing from '@/components/Landing';
export default function Home() {




  return (
    <>
      <main className='container mx-auto mt-10'>
        <CatApi/>
      </main>
    
    </>
  );
}