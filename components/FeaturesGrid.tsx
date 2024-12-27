import React from "react";
import Link from "next/link";
import type { Product } from "@/types";

interface FeaturesGridProps {
  products: Product[];
}

const FeaturesGrid = ({ products }: FeaturesGridProps) => {
  return (
    <section className="flex justify-center items-center w-full bg-base-200/50 text-base-content py-20 lg:py-32">
      <div className="flex flex-col max-w-[82rem] gap-16 md:gap-20 px-4">
        <h2 className="max-w-3xl font-black text-4xl md:text-6xl tracking-[-0.01em]">
          Ship features <br /> users{" "}
          <span className="underline decoration-dashed underline-offset-8 decoration-base-300">
            really want
          </span>
        </h2>
        <div className="flex flex-col w-full h-fit gap-4 lg:gap-10 text-text-default max-w-[82rem]">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 lg:gap-10">
            {products.map((product) => (
              <Link
                href={`/product/${product.id}`}
                key={product.id}
                className="group"
              >
                <div className="card bg-base-100 shadow-xl hover:shadow-2xl transition-all duration-200 rounded-3xl flex flex-col gap-6 w-full h-[22rem] lg:h-[25rem] pt-6 overflow-hidden">
                  <div className="px-6 space-y-2">
                    <h3 className="font-bold text-xl lg:text-3xl tracking-tight group-hover:text-primary transition-colors">
                      {product.name}
                    </h3>
                    <p className="opacity-80 group-hover:text-base-content transition-colors">
                      {product.introduction.subheading}
                    </p>
                  </div>
                  <div className="space-y-4 p-6">
                    <div>
                      <h4 className="font-semibold mb-2">Key Features</h4>
                      <ul className="list-disc list-inside space-y-1">
                        {product.key_features.slice(0, 3).map((feature, index) => (
                          <li key={index} className="text-sm">
                            <span className="font-medium">{feature.feature_name}</span>: {feature.description}
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="pt-4">
                      <div className="flex justify-between items-center">
                        <div className="badge badge-primary">
                          {product.pricing_value.pricing_tiers[0].price}
                        </div>
                        <span className="btn btn-primary btn-sm">
                          Learn More
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default FeaturesGrid;
