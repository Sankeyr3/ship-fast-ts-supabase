import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";
import { Product } from "@/types";

export function createClient() {
  const cookieStore = cookies();

  return createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return cookieStore.getAll();
        },
        setAll(cookiesToSet) {
          try {
            cookiesToSet.forEach(({ name, value, options }) =>
              cookieStore.set(name, value, options)
            );
          } catch {
            // The `setAll` method was called from a Server Component.
            // This can be ignored if you have middleware refreshing
            // user sessions.
          }
        },
      },
    }
  );
}

function slugify(text: string): string {
  return text
    .toString()
    .toLowerCase()
    .trim()
    .replace(/\s+/g, '-')     // Replace spaces with -
    .replace(/[^\w\-]+/g, '') // Remove all non-word chars
    .replace(/\-\-+/g, '-')   // Replace multiple - with single -
    .replace(/^-+/, '')       // Trim - from start of text
    .replace(/-+$/, '');      // Trim - from end of text
}

export async function getProducts() {
  const supabase = createClient();
  
  const { data: products, error } = await supabase
    .from("products")
    .select("*");

  if (error) {
    console.error("Error fetching products:", error);
    return [];
  }

  return products as Product[];
}

export async function getProductById(id: string) {
  const supabase = createClient();
  
  const { data: product, error } = await supabase
    .from("products")
    .select("*")
    .eq("id", id)
    .single();

  if (error) {
    console.error("Error fetching product:", error);
    return null;
  }

  return product as Product;
}

export async function getProductBySlug(slug: string) {
  const supabase = createClient();
  const slugifiedText = slugify(slug, { lower: true, strict: true });
  
  // Try to find by slug first
  let { data: product } = await supabase
    .from("products")
    .select("*")
    .ilike('name', slug)
    .single();

  if (!product) {
    // Try with the original case
    const { data: productByExactName } = await supabase
      .from("products")
      .select("*")
      .eq('name', slug)
      .single();
    
    product = productByExactName;
  }

  return product;
}
