import { Metadata } from "next";
import Image from "next/image";
import { getProductBySlug } from "@/libs/supabase/server";
import { getSEOTags } from "@/libs/seo";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { notFound } from "next/navigation";
import Link from "next/link";
import { ComparisonTable } from "@/components/product/ComparisonTable";

interface Props {
  params: {
    slug: string;
  };
}

const STYLES = {
  section: "py-16",
  container: "px-4 mx-auto max-w-7xl sm:px-6 lg:px-8",
  headerContainer: "max-w-3xl mx-auto text-center",
  h1: "text-4xl font-extrabold tracking-tight text-foreground sm:text-5xl md:text-6xl animate-fade-in",
  h2: "text-3xl font-extrabold text-foreground sm:text-4xl animate-fade-in",
  subtitle: "mt-6 text-xl text-muted-foreground animate-fade-in-up delay-200",
  paragraph: "mt-4 text-lg text-muted-foreground animate-fade-in-up delay-200",
  gridContainer: "grid grid-cols-1 gap-8 mt-12",
  stats: {
    container: "bg-primary text-primary-foreground",
    inner: "px-4 py-12 mx-auto max-w-7xl sm:px-6 lg:px-8",
    grid: "grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4",
    item: "flex flex-col items-center transform transition-all duration-500 hover:scale-105",
    iconContainer: "p-3 bg-primary/20 rounded-lg transition-all duration-300 hover:rotate-12",
    icon: "w-6 h-6",
    value: "mt-4 text-3xl font-extrabold animate-count-up",
    label: "text-base opacity-80",
  },
};

// Generate metadata for SEO
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const product = await getProductBySlug(params.slug);

  if (!product) {
    return getSEOTags({
      title: "Product Not Found",
      description: "The requested product could not be found.",
    });
  }

  return getSEOTags({
    title: product.introduction.headline,
    description: product.introduction.subheading,
    openGraph: {
      title: product.introduction.headline,
      description: product.introduction.subheading,
    },
  });
}

export default async function ProductPage({ params }: Props) {
  const product = await getProductBySlug(params.slug);

  if (!product) {
    return <div>Product not found</div>;
  }

  return (
    <>
      <Header />
      {/* Hero Section */}
      <section className={STYLES.section}>
        <div className={`${STYLES.container} animate-fade-in`}>
          <div className={STYLES.headerContainer}>
            <h1 className={STYLES.h1}>
              <span className="block text-primary animate-gradient-text">{product.introduction.headline}</span>
            </h1>
            <p className={STYLES.subtitle}>{product.introduction.subheading}</p>
            <div className="mt-10 animate-fade-in-up delay-500">
              <Button size="lg" asChild>
                <Link href={`https://capgo.app/`}>
                  {product.introduction.cta}
                  <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 ml-2 animate-bounce-x" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                  </svg>
                </Link>
              </Button>
            </div>

            {/* Product Image */}
            {product.image && (
              <div className="mt-12 rounded-lg overflow-hidden shadow-xl animate-fade-in-up delay-700">
                <Image
                  src={product.image}
                  alt={product.introduction.headline}
                  width={1200}
                  height={675}
                  className="w-full h-auto object-contain"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 1200px"
                  priority
                />
              </div>
            )}
          </div>
        </div>
      </section>

      {/* What Software Does Section */}
      {product.what_software_does && (
        <section className={`${STYLES.section} bg-background`}>
          <div className={STYLES.container}>
            <div className={STYLES.headerContainer}>
              <h2 className={STYLES.h2}>
                {product.what_software_does.title || `What ${product.name} Does`}
              </h2>
              <p className={STYLES.paragraph}>{product.what_software_does.description}</p>
            </div>
          </div>
        </section>
      )}

      {/* Key Features Section */}
      {product.key_features && product.key_features.length > 0 && (
        <section className={`${STYLES.section} bg-background`}>
          <div className={STYLES.container}>
            <div className={STYLES.headerContainer}>
              <h2 className={STYLES.h2}>Key Features</h2>
            </div>
            <div className={`${STYLES.gridContainer} sm:grid-cols-2 lg:grid-cols-3`}>
              {product.key_features.map((feature, index) => (
                <Card key={index} className="animate-fade-in-up" style={{ animationDelay: `${index * 200}ms` }}>
                  <CardHeader>
                    <div className="p-2 bg-primary/10 rounded-lg w-fit transform transition-all duration-300 hover:rotate-12">
                      {feature.icon || (
                        <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                      )}
                    </div>
                    <CardTitle className="mt-4">{feature.feature_name}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <CardDescription>{feature.description}</CardDescription>
                    {feature.benefits && feature.benefits.length > 0 && (
                      <ul className="mt-4 space-y-2">
                        {feature.benefits.map((benefit, idx) => (
                          <li key={idx} className="flex items-center text-sm text-muted-foreground">
                            <span className="w-1.5 h-1.5 mr-2 bg-primary rounded-full"></span>
                            {benefit}
                          </li>
                        ))}
                      </ul>
                    )}
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Stats Section */}
      {product.why_its_the_best?.evidence && (
        <section className={STYLES.stats.container}>
          <div className={STYLES.stats.inner}>
            <div className={`${STYLES.stats.grid} animate-fade-in-up`}>
              <div className={STYLES.stats.item}>
                <div className={STYLES.stats.iconContainer}>
                  <svg xmlns="http://www.w3.org/2000/svg" className={`${STYLES.stats.icon} animate-pulse`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0" />
                  </svg>
                </div>
                <p className={STYLES.stats.value}>20M+</p>
                <p className={STYLES.stats.label}>Users</p>
              </div>

              <div className={STYLES.stats.item}>
                <div className={STYLES.stats.iconContainer}>
                  <svg xmlns="http://www.w3.org/2000/svg" className={`${STYLES.stats.icon} animate-pulse`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z" />
                  </svg>
                </div>
                <p className={STYLES.stats.value}>1.4k+</p>
                <p className={STYLES.stats.label}>Apps in Production</p>
              </div>

              <div className={STYLES.stats.item}>
                <div className={STYLES.stats.iconContainer}>
                  <svg xmlns="http://www.w3.org/2000/svg" className={`${STYLES.stats.icon} animate-pulse`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
                  </svg>
                </div>
                <p className={STYLES.stats.value}>500+</p>
                <p className={STYLES.stats.label}>GitHub Stars</p>
              </div>

              <div className={STYLES.stats.item}>
                <div className={STYLES.stats.iconContainer}>
                  <svg xmlns="http://www.w3.org/2000/svg" className={`${STYLES.stats.icon} animate-pulse`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                  </svg>
                </div>
                <p className={STYLES.stats.value}>947.6M+</p>
                <p className={STYLES.stats.label}>Updates Delivered</p>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Problems Section */}
      {product.problems_it_solves && product.problems_it_solves.length > 0 && (
        <section className={`${STYLES.section} bg-background`}>
          <div className={STYLES.container}>
            <div className={STYLES.headerContainer}>
              <h2 className={STYLES.h2}>Problems {product.name} Solves</h2>
            </div>
            <div className={`${STYLES.gridContainer} sm:grid-cols-2 lg:grid-cols-3`}>
              {product.problems_it_solves.map((problem, index) => (
                <Card key={index} className="animate-fade-in-up" style={{ animationDelay: `${index * 200}ms` }}>
                  <CardHeader>
                    <div className="p-2 bg-primary/10 rounded-lg w-fit transform transition-all duration-300 hover:rotate-12">
                      {problem.icon || (
                        <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" />
                        </svg>
                      )}
                    </div>
                    <CardTitle className="mt-4">{problem.title || problem.problem}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <CardDescription>{problem.description || problem.solution}</CardDescription>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Pricing Section */}
      {product.pricing_value && product.pricing_value.pricing_tiers && (
        <section className={`${STYLES.section} bg-background`}>
          <div className={STYLES.container}>
            <div className={STYLES.headerContainer}>
              <h2 className={STYLES.h2}>
                {product.pricing_value.title || 'Clear Pricing, Exceptional Value'}
              </h2>
              <p className={STYLES.paragraph}>{product.pricing_value.value_proposition}</p>
            </div>
            <div className={`${STYLES.gridContainer} lg:grid-cols-3`}>
              {product.pricing_value.pricing_tiers.map((tier, index) => (
                <Card key={index} className={tier.popular ? "ring-2 ring-primary" : ""} style={{ animationDelay: `${index * 200}ms` }}>
                  <CardHeader>
                    {tier.popular && (
                      <span className="px-3 py-1 text-xs font-medium text-primary bg-primary/10 rounded-full">
                        Most Popular
                      </span>
                    )}
                    <CardTitle>{tier.name}</CardTitle>
                    <CardDescription>{tier.description}</CardDescription>
                    <div className="mt-4 space-y-2">
                      <p>
                        <span className="text-4xl font-extrabold">{tier.price.split('/')[0]}</span>
                        <span className="text-lg text-muted-foreground">/year</span>
                      </p>
                      {product.pricing_value.discount && (
                        <p className="text-sm text-primary">{product.pricing_value.discount}</p>
                      )}
                    </div>
                  </CardHeader>
                  <CardContent>
                    <ul className="mt-8 space-y-4">
                      {tier.features.map((feature, idx) => (
                        <li key={idx} className="flex items-center">
                          <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                          </svg>
                          <span className="ml-3 text-muted-foreground">{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                  <CardFooter>
                    <Button 
                      className="w-full" 
                      variant={tier.popular ? "default" : "outline"}
                    >
                      Get started
                    </Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Why It's Best Section */}
      {product.why_its_the_best && (
        <section className={`${STYLES.section} bg-background`}>
          <div className={STYLES.container}>
            <div className={STYLES.headerContainer}>
              <h2 className={STYLES.h2}>
                Why Capgo is the Best Solution
              </h2>
              <p className={STYLES.paragraph}>
                Compare Capgo with other solutions and see why we're the best choice for your app updates
              </p>
            </div>
            <div className="mt-8 space-y-4 max-w-3xl mx-auto">
              <div className="flex items-start">
                <div className="flex-shrink-0">
                  <svg className="w-6 h-6 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <p className="ml-3 text-lg text-muted-foreground">Open Source: Full access to the core code for customization and peace of mind.</p>
              </div>
              <div className="flex items-start">
                <div className="flex-shrink-0">
                  <svg className="w-6 h-6 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <p className="ml-3 text-lg text-muted-foreground">Fair Pricing: Affordable options for both individual and enterprise customers.</p>
              </div>
              <div className="flex items-start">
                <div className="flex-shrink-0">
                  <svg className="w-6 h-6 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <p className="ml-3 text-lg text-muted-foreground">Complete Control: Manual or auto mode to manage your own servers and set up your build process.</p>
              </div>
              <div className="flex items-start">
                <div className="flex-shrink-0">
                  <svg className="w-6 h-6 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <p className="ml-3 text-lg text-muted-foreground">High Security: End-to-end encryption of updates for maximum protection of your app's source code.</p>
              </div>
            </div>
            <div className="mt-12">
              <ComparisonTable 
                headers={["Features", "Capgo", "Traditional App Store", "Other Solutions"]}
                rows={[
                  {
                    feature: "Live Updates",
                    capgo: true,
                    traditional: false,
                    others: false
                  },
                  {
                    feature: "Update Speed",
                    capgo: "Instant",
                    traditional: "7+ days",
                    others: "Variable"
                  },
                  {
                    feature: "Free Trial",
                    capgo: true,
                    traditional: false,
                    others: true
                  },
                  {
                    feature: "No App Store Review",
                    capgo: true,
                    traditional: false,
                    others: false
                  },
                  {
                    feature: "Rollback Support",
                    capgo: true,
                    traditional: false,
                    others: true
                  },
                  {
                    feature: "Version Control",
                    capgo: true,
                    traditional: true,
                    others: true
                  },
                  {
                    feature: "A/B Testing",
                    capgo: true,
                    traditional: false,
                    others: false
                  }
                ]}
              />
            </div>
          </div>
        </section>
      )}

      {/* Real World Applications */}
      {product.real_world_applications && (
        <section className={`${STYLES.section} bg-background`}>
          <div className={STYLES.container}>
            <div className={STYLES.headerContainer}>
              <h2 className={STYLES.h2}>{product.real_world_applications.title}</h2>
            </div>
            <div className={`${STYLES.gridContainer} sm:grid-cols-2 lg:grid-cols-3`}>
              {product.real_world_applications.use_cases.map((useCase, index) => (
                <Card key={index} className="animate-fade-in-up" style={{ animationDelay: `${index * 200}ms` }}>
                  <CardContent className="pt-6">
                    <div className="p-2 bg-primary/10 rounded-lg w-fit">
                      <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                      </svg>
                    </div>
                    <p className="mt-4 text-muted-foreground">{useCase}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
            {product.real_world_applications.case_studies && (
              <div className={`${STYLES.gridContainer} mt-16 sm:grid-cols-2 lg:grid-cols-3`}>
                {product.real_world_applications.case_studies.map((study, index) => (
                  <Card key={index} className="animate-fade-in-up" style={{ animationDelay: `${index * 200}ms` }}>
                    <CardHeader>
                      <CardTitle>{study.title}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <CardDescription>{study.description}</CardDescription>
                      <p className="mt-4 text-lg font-semibold text-primary">{study.results}</p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </div>
        </section>
      )}

      {/* Social Proof */}
      {product.social_proof && (
        <section className={`${STYLES.section} bg-primary text-primary-foreground`}>
          <div className={STYLES.container}>
            <div className={STYLES.headerContainer}>
              <h2 className="text-3xl font-extrabold sm:text-4xl">
                {product.social_proof.title}
              </h2>
            </div>
            <div className={`${STYLES.gridContainer} sm:grid-cols-2`}>
              {product.social_proof.testimonials.map((testimonial, index) => (
                <Card key={index} className="bg-primary-foreground">
                  <CardContent className="pt-6">
                    <p className="text-foreground">{testimonial.testimonial}</p>
                    <p className="mt-4 font-semibold text-primary">{testimonial.author}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
            <div className="mt-12 grid grid-cols-2 gap-4 sm:grid-cols-4">
              {product.social_proof.trust_elements.map((element, index) => (
                <div key={index} className="text-center">
                  <p className="text-sm opacity-80">{element}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* FAQ Section */}
      {product.faq && product.faq.questions && (
        <section className={`${STYLES.section} bg-background`}>
          <div className={STYLES.container}>
            <div className={STYLES.headerContainer}>
              <h2 className={STYLES.h2}>
                {product.faq.title || 'Frequently Asked Questions'}
              </h2>
            </div>
            <div className="mt-12 space-y-8">
              {product.faq.questions.map((item, index) => (
                <Card key={index}>
                  <CardHeader>
                    <CardTitle>{item.question}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <CardDescription>{item.answer}</CardDescription>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Final CTA */}
      <section className={`${STYLES.section} bg-primary text-primary-foreground`}>
        <div className={STYLES.container}>
          <div className={STYLES.headerContainer}>
            <h2 className="text-3xl font-extrabold sm:text-4xl">
              Transform your workflow today
            </h2>
            <p className="mt-4 text-xl opacity-80">
              Stop waiting for app store reviews and start shipping updates instantly. With {product.name}, 
              you have the power to make changes on the fly and improve user satisfaction.
            </p>
            <div className="mt-8">
              <Button variant="secondary" size="lg" asChild>
                <Link href="#">
                  Start Your Free Trial
                  <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 ml-2 animate-bounce-x" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                  </svg>
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
}
