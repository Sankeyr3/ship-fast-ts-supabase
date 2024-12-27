import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import Image from "next/image"

const featuredProducts = [
  {
    id: 1,
    name: "CloudManager",
    image: "/products/cloudmanager.png",
    description: "Simplify your cloud infrastructure management with AI-powered optimization and cost savings. Perfect for startups and enterprises alike.",
    badge: "Featured",
    variant: "default" as const
  },
  {
    id: 2,
    name: "DataSync Pro",
    image: "/products/datasync.png",
    description: "Real-time data synchronization across all your devices. Built for teams who need reliable and secure data access anywhere.",
    badge: "New",
    variant: "secondary" as const
  },
  {
    id: 3,
    name: "SecureVault",
    image: "/products/securevault.png",
    description: "Enterprise-grade password and secrets management. Keep your team's credentials safe with military-grade encryption.",
    badge: "Recommended",
    variant: "outline" as const
  }
]

export default function FeaturedProductsSection() {
  return (
    <section className="py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
            Our Top Picks
          </h2>
          <p className="mt-4 text-lg text-muted-foreground">
            Carefully selected products that stand out for their innovation and impact.
          </p>
        </div>

        {/* Featured Products Grid */}
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {featuredProducts.map((product, index) => (
            <Card 
              key={product.id}
              className="animate-fade-in-up"
              style={{ animationDelay: `${index * 200}ms` }}
            >
              <CardHeader>
                <div className="relative w-full h-48 mb-4">
                  <Image
                    src={product.image}
                    alt={product.name}
                    fill
                    className="rounded-lg object-cover"
                  />
                  <Badge 
                    className="absolute top-4 right-4"
                    variant={product.variant}
                  >
                    {product.badge}
                  </Badge>
                </div>
                <CardTitle>{product.name}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  {product.description}
                </p>
              </CardContent>
              <CardFooter>
                <Button className="w-full" variant="outline">
                  View Details
                  <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                  </svg>
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
