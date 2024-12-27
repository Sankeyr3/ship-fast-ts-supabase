import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"

export default function NewsletterSection() {
  return (
    <section className="py-20 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <Card className="overflow-hidden">
          <CardContent className="p-8 sm:p-12">
            <div className="grid gap-12 lg:grid-cols-2">
              {/* Left Column - Content */}
              <div className="space-y-6">
                <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
                  Stay Updated with Top SaaS Tools
                </h2>
                <p className="text-lg text-muted-foreground">
                  Get monthly insights about the best performing SaaS tools, 
                  exclusive founder interviews, and early access to new listings.
                </p>
                <div className="space-y-4">
                  {/* Benefits */}
                  {[
                    "Monthly roundup of top performing tools",
                    "Exclusive interviews with successful founders",
                    "Early access to new product launches",
                    "Industry insights and trend analysis"
                  ].map((benefit, index) => (
                    <div 
                      key={index} 
                      className="flex items-center gap-3 animate-fade-in-up"
                      style={{ animationDelay: `${index * 100}ms` }}
                    >
                      <svg 
                        xmlns="http://www.w3.org/2000/svg" 
                        className="h-5 w-5 text-primary" 
                        fill="none" 
                        viewBox="0 0 24 24" 
                        stroke="currentColor"
                      >
                        <path 
                          strokeLinecap="round" 
                          strokeLinejoin="round" 
                          strokeWidth={2} 
                          d="M5 13l4 4L19 7" 
                        />
                      </svg>
                      <span>{benefit}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Right Column - Form */}
              <div className="lg:flex lg:items-center">
                <div className="space-y-6 w-full">
                  <div className="space-y-4">
                    <Input
                      type="email"
                      placeholder="Enter your email"
                      className="w-full"
                    />
                    <Button className="w-full" size="lg">
                      Subscribe to Newsletter
                      <svg 
                        xmlns="http://www.w3.org/2000/svg" 
                        className="w-5 h-5 ml-2" 
                        fill="none" 
                        viewBox="0 0 24 24" 
                        stroke="currentColor"
                      >
                        <path 
                          strokeLinecap="round" 
                          strokeLinejoin="round" 
                          strokeWidth={2} 
                          d="M13 7l5 5m0 0l-5 5m5-5H6" 
                        />
                      </svg>
                    </Button>
                  </div>
                  <p className="text-sm text-muted-foreground text-center">
                    Join 5,000+ subscribers. No spam, unsubscribe anytime.
                  </p>
                  {/* Social Proof */}
                  <div className="pt-6 border-t">
                    <div className="flex items-center justify-center gap-6">
                      <div className="text-center">
                        <p className="text-2xl font-bold">5K+</p>
                        <p className="text-sm text-muted-foreground">Subscribers</p>
                      </div>
                      <div className="text-center">
                        <p className="text-2xl font-bold">98%</p>
                        <p className="text-sm text-muted-foreground">Open Rate</p>
                      </div>
                      <div className="text-center">
                        <p className="text-2xl font-bold">4.9/5</p>
                        <p className="text-sm text-muted-foreground">Rating</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  )
}
