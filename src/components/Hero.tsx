import { ArrowRight, Sparkles, Award, TrendingUp, Users, Zap } from 'lucide-react';
import { useEffect, useRef } from 'react';

const Hero = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Set canvas size
    const setCanvasSize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    setCanvasSize();
    window.addEventListener('resize', setCanvasSize);

    // Particle system for 3D effect
    class Particle {
      x: number;
      y: number;
      z: number;
      size: number;
      speedX: number;
      speedY: number;
      speedZ: number;
      color: string;

      constructor() {
        this.x = Math.random() * canvas!.width;
        this.y = Math.random() * canvas!.height;
        this.z = Math.random() * 1000;
        this.size = Math.random() * 2 + 1;
        this.speedX = (Math.random() - 0.5) * 0.5;
        this.speedY = (Math.random() - 0.5) * 0.5;
        this.speedZ = Math.random() * 2 + 1;
        
        const colors = ['rgba(59, 130, 246, 0.4)', 'rgba(251, 191, 36, 0.4)', 'rgba(147, 51, 234, 0.3)'];
        this.color = colors[Math.floor(Math.random() * colors.length)];
      }

      update() {
        this.x += this.speedX;
        this.y += this.speedY;
        this.z -= this.speedZ;

        if (this.z <= 0) {
          this.z = 1000;
          this.x = Math.random() * canvas!.width;
          this.y = Math.random() * canvas!.height;
        }

        if (this.x < 0 || this.x > canvas!.width) this.speedX *= -1;
        if (this.y < 0 || this.y > canvas!.height) this.speedY *= -1;
      }

      draw() {
        if (!ctx) return;
        
        const scale = 1000 / (1000 + this.z);
        const x = (this.x - canvas!.width / 2) * scale + canvas!.width / 2;
        const y = (this.y - canvas!.height / 2) * scale + canvas!.height / 2;
        const size = this.size * scale;

        ctx.fillStyle = this.color;
        ctx.beginPath();
        ctx.arc(x, y, size, 0, Math.PI * 2);
        ctx.fill();
      }
    }

    // Create particles
    const particles: Particle[] = [];
    for (let i = 0; i < 80; i++) {
      particles.push(new Particle());
    }

    // Animation loop
    let animationFrameId: number;
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Draw gradient background
      const gradient = ctx.createRadialGradient(
        canvas.width / 2, canvas.height / 2, 0,
        canvas.width / 2, canvas.height / 2, canvas.width / 2
      );
      gradient.addColorStop(0, 'rgba(59, 130, 246, 0.03)');
      gradient.addColorStop(0.5, 'rgba(147, 51, 234, 0.02)');
      gradient.addColorStop(1, 'rgba(251, 191, 36, 0.03)');
      
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Update and draw particles
      particles.forEach(particle => {
        particle.update();
        particle.draw();
      });

      // Draw connections
      particles.forEach((p1, i) => {
        particles.slice(i + 1).forEach(p2 => {
          const dx = p1.x - p2.x;
          const dy = p1.y - p2.y;
          const distance = Math.sqrt(dx * dx + dy * dy);

          if (distance < 150) {
            ctx.strokeStyle = `rgba(59, 130, 246, ${0.15 * (1 - distance / 150)})`;
            ctx.lineWidth = 1;
            ctx.beginPath();
            ctx.moveTo(p1.x, p1.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.stroke();
          }
        });
      });

      animationFrameId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener('resize', setCanvasSize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  const scrollToSection = (href: string) => {
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-slate-50 via-blue-50/40 to-amber-50/30">
      {/* 3D Canvas Background */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full"
        style={{ mixBlendMode: 'normal' }}
      />

      {/* Sophisticated background patterns */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:4rem_4rem]"></div>
        <div className="absolute inset-0 bg-gradient-to-br from-white/60 via-transparent to-white/60"></div>
      </div>

      {/* Enhanced 3D floating orbs */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-400/20 rounded-full filter blur-[100px] animate-float-3d"></div>
      <div className="absolute bottom-0 right-1/4 w-[500px] h-[500px] bg-amber-400/20 rounded-full filter blur-[120px] animate-float-3d-delayed"></div>
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-to-r from-purple-300/10 to-pink-300/10 rounded-full filter blur-[150px] animate-pulse-slow"></div>
      
      {/* Additional floating shapes for depth */}
      <div className="absolute top-1/4 right-1/3 w-64 h-64 bg-gradient-to-br from-blue-300/15 to-purple-300/15 rounded-full filter blur-[80px] animate-float-reverse"></div>
      <div className="absolute bottom-1/3 left-1/3 w-80 h-80 bg-gradient-to-tr from-amber-300/15 to-orange-300/15 rounded-full filter blur-[90px] animate-spin-slow"></div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-32 text-center z-10">
        {/* Premium badge */}
        <div className="inline-flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-white/90 to-blue-50/60 backdrop-blur-xl border border-blue-200/50 rounded-full mb-8 shadow-lg shadow-blue-100/50 animate-fade-in hover:shadow-xl hover:scale-105 transition-all duration-300">
          <Sparkles className="w-4 h-4 text-amber-500 animate-pulse" />
          <span className="text-sm font-semibold bg-gradient-to-r from-blue-900 to-blue-700 bg-clip-text text-transparent">
            Premium IT Solutions & Digital Excellence
          </span>
        </div>

        {/* Main headline with enhanced typography */}
        <h1 className="text-5xl sm:text-6xl lg:text-7xl xl:text-8xl font-bold mb-8 animate-fade-in-up tracking-tight">
          <span className="block text-slate-900 mb-2 leading-tight animate-text-shimmer">
            Transform Your Business
          </span>
          <span className="block bg-gradient-to-r from-blue-900 via-blue-600 to-amber-500 bg-clip-text text-transparent leading-tight">
            With Elite Technology
          </span>
        </h1>

        {/* Enhanced description */}
        <p className="text-lg sm:text-xl text-slate-600 mb-12 max-w-3xl mx-auto leading-relaxed animate-fade-in-up delay-200 font-light">
          Starme Solutions delivers world-class IT and technology solutions tailored for enterprise excellence.
          <span className="block mt-2 text-slate-500">
            Empower your business with innovative digital transformation and cutting-edge solutions.
          </span>
        </p>

        {/* Enhanced CTA buttons */}
        <div className="flex flex-col sm:flex-row gap-5 justify-center items-center animate-fade-in-up delay-400 mb-20">
          <button
            onClick={() => scrollToSection('#contact')}
            className="group relative px-10 py-5 bg-gradient-to-r from-blue-900 via-blue-800 to-blue-900 text-white rounded-2xl font-semibold shadow-2xl shadow-blue-900/30 hover:shadow-3xl hover:shadow-blue-900/40 transform hover:-translate-y-1 transition-all duration-300 flex items-center gap-3 overflow-hidden"
          >
            <span className="absolute inset-0 bg-gradient-to-r from-blue-800 to-blue-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
            <span className="relative">Start Your Journey</span>
            <ArrowRight className="relative w-5 h-5 group-hover:translate-x-2 transition-transform duration-300" />
            
            {/* Animated shine effect */}
            <span className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 bg-gradient-to-r from-transparent via-white/20 to-transparent"></span>
          </button>
          <button
            onClick={() => scrollToSection('#services')}
            className="group px-10 py-5 bg-white/90 backdrop-blur-sm text-blue-900 border-2 border-blue-900/20 rounded-2xl font-semibold hover:bg-blue-900 hover:text-white hover:border-blue-900 transition-all duration-300 shadow-lg shadow-slate-200/50 hover:shadow-xl hover:-translate-y-1"
          >
            <span className="flex items-center gap-2">
              Explore Services
              <Sparkles className="w-4 h-4 group-hover:rotate-12 transition-transform duration-300" />
            </span>
          </button>
        </div>

        {/* Enhanced stats grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-5xl mx-auto animate-fade-in-up delay-600">
          {[
            { value: '500+', label: 'Projects Delivered', icon: Award, color: 'from-blue-600 to-blue-800' },
            { value: '150+', label: 'Global Clients', icon: Users, color: 'from-amber-500 to-amber-700' },
            { value: '15+', label: 'Years Experience', icon: TrendingUp, color: 'from-purple-600 to-purple-800' },
            { value: '98%', label: 'Client Satisfaction', icon: Zap, color: 'from-green-600 to-green-800' },
          ].map((stat, index) => {
            const Icon = stat.icon;
            return (
              <div 
                key={index} 
                className="group relative bg-white/90 backdrop-blur-xl rounded-3xl p-8 shadow-xl shadow-slate-200/50 border border-slate-100 hover:shadow-2xl hover:shadow-slate-300/50 transition-all duration-500 hover:-translate-y-2 cursor-pointer animate-float-card"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                {/* Subtle gradient overlay on hover */}
                <div className={`absolute inset-0 bg-gradient-to-br ${stat.color} opacity-0 group-hover:opacity-5 rounded-3xl transition-opacity duration-500`}></div>
                
                {/* Icon */}
                <div className={`inline-flex p-3 rounded-2xl bg-gradient-to-br ${stat.color} mb-4 shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                  <Icon className="w-6 h-6 text-white" />
                </div>
                
                {/* Value */}
                <div className={`text-4xl font-bold bg-gradient-to-r ${stat.color} bg-clip-text text-transparent mb-3 group-hover:scale-105 transition-transform duration-300`}>
                  {stat.value}
                </div>
                
                {/* Label */}
                <div className="text-sm text-slate-600 font-medium tracking-wide">
                  {stat.label}
                </div>

                {/* Decorative corner accent */}
                <div className="absolute top-4 right-4 w-2 h-2 bg-gradient-to-br from-blue-400 to-amber-400 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 animate-ping-slow"></div>
              </div>
            );
          })}
        </div>

        {/* Trust indicators */}
        <div className="mt-16 flex flex-wrap justify-center items-center gap-8 opacity-60 animate-fade-in-up delay-800">
          <div className="text-sm text-slate-500 font-medium">Trusted by leading enterprises worldwide</div>
        </div>
      </div>

      <style>{`
        @keyframes fade-in {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }

        @keyframes fade-in-up {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes float-3d {
          0%, 100% {
            transform: translate3d(0px, 0px, 0px) scale(1);
          }
          25% {
            transform: translate3d(-20px, -30px, 20px) scale(1.05);
          }
          50% {
            transform: translate3d(15px, -20px, -10px) scale(0.95);
          }
          75% {
            transform: translate3d(-10px, 15px, 15px) scale(1.02);
          }
        }

        @keyframes float-3d-delayed {
          0%, 100% {
            transform: translate3d(0px, 0px, 0px) scale(1) rotate(0deg);
          }
          33% {
            transform: translate3d(25px, -25px, -20px) scale(1.08) rotate(2deg);
          }
          66% {
            transform: translate3d(-15px, 20px, 10px) scale(0.92) rotate(-2deg);
          }
        }

        @keyframes float-reverse {
          0%, 100% {
            transform: translate3d(0px, 0px, 0px);
          }
          50% {
            transform: translate3d(-30px, 20px, 15px);
          }
        }

        @keyframes spin-slow {
          from {
            transform: rotate(0deg) scale(1);
          }
          to {
            transform: rotate(360deg) scale(1.1);
          }
        }

        @keyframes pulse-slow {
          0%, 100% {
            opacity: 0.6;
            transform: scale(1);
          }
          50% {
            opacity: 0.8;
            transform: scale(1.05);
          }
        }

        @keyframes float-card {
          0%, 100% {
            transform: translateY(0px);
          }
          50% {
            transform: translateY(-8px);
          }
        }

        @keyframes text-shimmer {
          0% {
            background-position: -1000px 0;
          }
          100% {
            background-position: 1000px 0;
          }
        }

        @keyframes ping-slow {
          75%, 100% {
            transform: scale(2);
            opacity: 0;
          }
        }

        .animate-fade-in {
          animation: fade-in 0.8s ease-out;
        }

        .animate-fade-in-up {
          animation: fade-in-up 0.8s ease-out;
        }

        .animate-float-3d {
          animation: float-3d 12s ease-in-out infinite;
        }

        .animate-float-3d-delayed {
          animation: float-3d-delayed 15s ease-in-out infinite;
        }

        .animate-float-reverse {
          animation: float-reverse 10s ease-in-out infinite;
        }

        .animate-spin-slow {
          animation: spin-slow 40s linear infinite;
        }

        .animate-pulse-slow {
          animation: pulse-slow 8s ease-in-out infinite;
        }

        .animate-float-card {
          animation: float-card 6s ease-in-out infinite;
        }

        .animate-text-shimmer {
          background: linear-gradient(90deg, #0f172a 0%, #1e293b 40%, #334155 50%, #1e293b 60%, #0f172a 100%);
          background-size: 2000px 100%;
          -webkit-background-clip: text;
          background-clip: text;
          animation: text-shimmer 3s linear infinite;
        }

        .animate-ping-slow {
          animation: ping-slow 2s cubic-bezier(0, 0, 0.2, 1) infinite;
        }

        .delay-200 {
          animation-delay: 0.2s;
        }

        .delay-400 {
          animation-delay: 0.4s;
        }

        .delay-600 {
          animation-delay: 0.6s;
        }

        .delay-800 {
          animation-delay: 0.8s;
        }

        .shadow-3xl {
          box-shadow: 0 35px 60px -15px rgba(0, 0, 0, 0.3);
        }
      `}</style>
    </section>
  );
};

export default Hero;