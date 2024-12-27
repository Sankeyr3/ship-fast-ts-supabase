import Link from "next/link";
import Image from "next/image";

const Footer = () => {
  const links = {
    product: [
      { href: "/products", label: "All Products" },
      { href: "/submit", label: "Submit Product" },
      { href: "/categories", label: "Categories" },
    ],
    company: [
      { href: "/about", label: "About" },
      { href: "/blog", label: "Blog" },
      { href: "/contact", label: "Contact" },
    ],
    legal: [
      { href: "/privacy", label: "Privacy" },
      { href: "/terms", label: "Terms" },
    ],
  };

  return (
    <footer className="bg-background border-t">
      <div className="max-w-7xl mx-auto px-6 py-12 md:py-24">
        <div className="grid grid-cols-2 gap-8 md:grid-cols-4">
          {/* Logo + Description */}
          <div className="col-span-2 md:col-span-1">
            <Link href="/" className="flex items-center space-x-2">
              <div className="relative w-8 h-8 text-primary">
                <Image 
                  src="/logo.svg" 
                  alt="Top ShipFast Logo" 
                  width={32} 
                  height={32}
                  className="dark:invert"
                />
              </div>
              <span className="text-lg font-bold">Top ShipFast</span>
            </Link>
            <p className="mt-4 text-sm text-muted-foreground">
              Discover and compare the best SaaS tools for developers and businesses.
            </p>
          </div>

          {/* Links */}
          <div>
            <h3 className="text-sm font-semibold mb-3">Product</h3>
            <ul className="space-y-2">
              {links.product.map((link) => (
                <li key={link.href}>
                  <Link 
                    href={link.href}
                    className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold mb-3">Company</h3>
            <ul className="space-y-2">
              {links.company.map((link) => (
                <li key={link.href}>
                  <Link 
                    href={link.href}
                    className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold mb-3">Legal</h3>
            <ul className="space-y-2">
              {links.legal.map((link) => (
                <li key={link.href}>
                  <Link 
                    href={link.href}
                    className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Copyright */}
        <div className="mt-12 pt-8 border-t">
          <p className="text-sm text-muted-foreground text-center">
            {new Date().getFullYear()} Top ShipFast. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
