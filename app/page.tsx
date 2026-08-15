import Navbar      from '@/components/Navbar';
import Hero        from '@/components/Hero';
import HowItWorks  from '@/components/HowItWorks';
import Convergence from '@/components/Convergence';
import TheData     from '@/components/TheData';
import Platform    from '@/components/Platform';
import Pricing     from '@/components/Pricing';
import Testimonials from '@/components/Testimonials';
import CTA         from '@/components/CTA';
import Footer      from '@/components/Footer';

export default function Home() {
  return (
    <div className="min-h-screen bg-sand-100 dark:bg-slate-950 transition-colors duration-300">
      <Navbar />
      <div>
        <Hero />
        {/* <HowItWorks /> */}
        <Convergence />
        <TheData />
        <Platform />
        {/* <Pricing /> */}
        <Testimonials />
        {/* rides up over the sticky testimonials — the parallax reveal */}
        <div className="relative z-10">
          <CTA />
        </div>
      </div>
      <div className="relative z-10">
        <Footer />
      </div>
    </div>
  );
}
