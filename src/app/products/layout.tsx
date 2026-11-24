import { ReactNode } from "react";

export default function ProductsLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  return (
    <div className="min-h-screen">
      {/* Optional breadcrumb navigation area */}
      <nav
        aria-label="Breadcrumb"
        className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8 pt-6"
      >
        <ol className="flex items-center gap-2 text-sm text-text-muted">
          <li>
            <a href="/" className="hover:text-text-primary transition-colors">
              Home
            </a>
          </li>
          <li aria-hidden="true" className="text-text-muted">
            /
          </li>
          <li>
            <span className="text-text-secondary">Products</span>
          </li>
        </ol>
      </nav>

      {/* Page content container */}
      <main
        id="main-content"
        className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8 py-8"
      >
        {children}
      </main>
    </div>
  );
}
