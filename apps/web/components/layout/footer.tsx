import Link from "next/link";

export function Footer() {
  return (
    <footer className="border-t border-border-default mt-16 bg-surface-subtle">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-8">
          <div>
            <Link href="/" className="font-display text-lg font-semibold text-text-primary">
              ScentScape
            </Link>
            <p className="text-sm text-text-muted mt-2">
              Discover your signature fragrance through personalized
              recommendations.
            </p>
          </div>

          <div>
            <h3 className="font-medium mb-3 text-text-primary">Discover</h3>
            <ul className="space-y-2 text-sm text-text-secondary">
              <li>
                <Link href="/quiz" className="hover:text-text-primary transition-colors">
                  Find Your Scent
                </Link>
              </li>
              <li>
                <Link href="/products" className="hover:text-text-primary transition-colors">
                  All Fragrances
                </Link>
              </li>
              <li>
                <Link href="/collections" className="hover:text-text-primary transition-colors">
                  Collections
                </Link>
              </li>
              <li>
                <Link href="/explore" className="hover:text-text-primary transition-colors">
                  Fragrance Wheel
                </Link>
              </li>
              <li>
                <Link href="/moods" className="hover:text-text-primary transition-colors">
                  Moods
                </Link>
              </li>
              <li>
                <Link href="/samples" className="hover:text-text-primary transition-colors">
                  Sample Box
                </Link>
              </li>
              <li>
                <Link href="/search" className="hover:text-text-primary transition-colors">
                  Search
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-medium mb-3 text-text-primary">Learn</h3>
            <ul className="space-y-2 text-sm text-text-secondary">
              <li>
                <Link href="/learn/fragrance-101" className="hover:text-text-primary transition-colors">
                  Fragrance 101
                </Link>
              </li>
              <li>
                <Link href="/learn/how-to-apply" className="hover:text-text-primary transition-colors">
                  How to Apply
                </Link>
              </li>
              <li>
                <Link href="/learn/signature-scent" className="hover:text-text-primary transition-colors">
                  Find Your Signature
                </Link>
              </li>
              <li>
                <Link href="/learn/families" className="hover:text-text-primary transition-colors">
                  Fragrance Families
                </Link>
              </li>
              <li>
                <Link href="/learn/notes" className="hover:text-text-primary transition-colors">
                  Fragrance Notes
                </Link>
              </li>
              <li>
                <Link href="/learn/seasonal/summer" className="hover:text-text-primary transition-colors">
                  Seasonal Guides
                </Link>
              </li>
              <li>
                <Link href="/learn/glossary" className="hover:text-text-primary transition-colors">
                  Glossary
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-medium mb-3 text-text-primary">Account</h3>
            <ul className="space-y-2 text-sm text-text-secondary">
              <li>
                <Link href="/login" className="hover:text-text-primary transition-colors">
                  Sign In
                </Link>
              </li>
              <li>
                <Link href="/register" className="hover:text-text-primary transition-colors">
                  Create Account
                </Link>
              </li>
              <li>
                <Link href="/account/orders" className="hover:text-text-primary transition-colors">
                  Order History
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-medium mb-3 text-text-primary">Legal</h3>
            <ul className="space-y-2 text-sm text-text-secondary">
              <li>
                <span className="text-text-muted">Privacy Policy</span>
              </li>
              <li>
                <span className="text-text-muted">Terms of Service</span>
              </li>
              <li>
                <span className="text-text-muted">Cookie Policy</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-border-default mt-8 pt-8 text-center text-sm text-text-muted">
          <p>&copy; {new Date().getFullYear()} ScentScape. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
