import { Card, CardContent } from "@/components/ui/card"
import Image from "next/image"

const testimonials = [
  {
    quote: "Top ShipFast helped us reach $50k MRR in just 3 months. The exposure and credibility we got from being featured here was incredible.",
    author: "Sarah Chen",
    role: "Founder of DataSync Pro",
    avatar: "/avatars/sarah.png",
    company: {
      logo: "/companies/datasync.png",
      name: "DataSync Pro"
    },
    metrics: {
      value: "$50K",
      label: "MRR"
    }
  },
  {
    quote: "Being listed on Top ShipFast was a game-changer. We got featured in the monthly ranking and saw a 300% increase in signups that month.",
    author: "Michael Torres",
    role: "CEO of CloudManager",
    avatar: "/avatars/michael.png",
    company: {
      logo: "/companies/cloudmanager.png",
      name: "CloudManager"
    },
    metrics: {
      value: "300%",
      label: "Growth"
    }
  },
  {
    quote: "The quality of leads we get from Top ShipFast is outstanding. These are people who are serious about using SaaS tools and understand their value.",
    author: "Emily Watson",
    role: "Founder of SecureVault",
    avatar: "/avatars/emily.png",
    company: {
      logo: "/companies/securevault.png",
      name: "SecureVault"
    },
    metrics: {
      value: "95%",
      label: "Conversion"
    }
  }
]

export default function TestimonialsSection() {
  return (
    <section className="py-20 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
            What Creators Say
          </h2>
          <p className="mt-4 text-lg text-muted-foreground">
            Success stories from SaaS founders who listed their products
          </p>
        </div>

        {/* Testimonials Grid */}
        <div className="grid gap-8 md:grid-cols-3">
          {testimonials.map((testimonial, index) => (
            <Card 
              key={index}
              className="animate-fade-in-up"
              style={{ animationDelay: `${index * 200}ms` }}
            >
              <CardContent className="pt-6">
                {/* Quote */}
                <div className="mb-6">
                  <svg 
                    className="h-8 w-8 text-primary/20" 
                    fill="currentColor" 
                    viewBox="0 0 24 24"
                  >
                    <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
                  </svg>
                </div>

                {/* Testimonial Text */}
                <p className="text-muted-foreground mb-6">
                  {testimonial.quote}
                </p>

                {/* Author Info */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className="relative w-10 h-10">
                      <Image
                        src={testimonial.avatar}
                        alt={testimonial.author}
                        fill
                        className="rounded-full object-cover"
                      />
                    </div>
                    <div>
                      <p className="font-semibold">{testimonial.author}</p>
                      <p className="text-sm text-muted-foreground">{testimonial.role}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-bold text-primary">{testimonial.metrics.value}</p>
                    <p className="text-sm text-muted-foreground">{testimonial.metrics.label}</p>
                  </div>
                </div>

                {/* Company Logo */}
                <div className="mt-6 pt-6 border-t">
                  <div className="flex items-center gap-3">
                    <div className="relative w-8 h-8">
                      <Image
                        src={testimonial.company.logo}
                        alt={testimonial.company.name}
                        fill
                        className="rounded object-contain"
                      />
                    </div>
                    <p className="text-sm text-muted-foreground">
                      {testimonial.company.name}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
