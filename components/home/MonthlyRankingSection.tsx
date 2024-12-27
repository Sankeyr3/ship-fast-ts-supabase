import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import Image from "next/image"
import { getProducts } from "@/libs/supabase/server"
import Link from "next/link"
import slugify from 'slugify'

export default async function MonthlyRankingSection() {
  const products = await getProducts();

  return (
    <section className="py-16">
      <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl font-extrabold tracking-tight text-foreground sm:text-4xl">
            Monthly Ranking
          </h2>
          <p className="mt-4 text-lg text-muted-foreground">
            Discover the most popular tools of the month
          </p>
        </div>
        <div className="grid grid-cols-1 gap-8 mt-12 sm:grid-cols-2 lg:grid-cols-3">
          {products?.map((product, index) => (
            <Card key={product.id} className="flex flex-col h-full">
              <CardContent className="p-0 flex flex-col h-full">
                <div className="relative aspect-[16/9]">
                  {product.image && (
                    <Image
                      src={product.image}
                      alt={product.name}
                      fill
                      className="object-cover"
                    />
                  )}
                </div>
                <div className="flex flex-col flex-grow p-6">
                  <div className="flex-grow">
                    <h3 className="text-xl font-semibold">
                      {product.introduction.headline}
                    </h3>
                    <p className="mt-2 text-muted-foreground">
                      {product.introduction.subheading}
                    </p>
                  </div>
                  <div className="pt-6">
                    <Button className="w-full" asChild>
                      <Link
                        href={`/${slugify(product.name, { lower: true, strict: true })}`}
                        className="block"
                      >
                        Learn more about {product.name}
                      </Link>
                    </Button>
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
