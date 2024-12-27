import { Button } from "@/components/ui/button"

export default function HeroSection() {
  return (
    <section className="relative py-20 overflow-hidden">
      {/* Background with gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-background to-background/50" />
      
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          {/* Main Title with gradient animation */}
          <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl md:text-6xl lg:text-7xl">
            <span className="block">Discover the Best SaaS Tools</span>
            <span className="block mt-2 animate-gradient-text">to Boost Your Projects!</span>
          </h1>
          
          {/* Subtitle */}
          <p className="mt-6 max-w-2xl mx-auto text-xl text-muted-foreground animate-fade-in-up delay-200">
            Ranking of the most powerful software created by indie developers. 
            Find the perfect tool for your business or needs.
          </p>
          
          {/* CTA Buttons */}
          <div className="mt-10 flex justify-center gap-4 animate-fade-in-up delay-500">
            <Button size="lg" className="px-8">
              Explore Tools
              <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 ml-2 animate-bounce-x" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </Button>
            <Button size="lg" variant="outline" className="px-8">
              Submit Product
              <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
              </svg>
            </Button>
          </div>
          
          {/* Stats */}
          <div className="mt-20 grid grid-cols-2 gap-8 md:grid-cols-4 lg:gap-12">
            {[
              { value: "500+", label: "Products Listed" },
              { value: "$2M+", label: "Monthly Revenue" },
              { value: "50K+", label: "Active Users" },
              { value: "100+", label: "Success Stories" }
            ].map((stat, index) => (
              <div 
                key={index} 
                className="animate-fade-in-up"
                style={{ animationDelay: `${(index + 4) * 200}ms` }}
              >
                <p className="text-4xl font-bold animate-count-up">{stat.value}</p>
                <p className="mt-2 text-muted-foreground">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
