import Link from "next/link";

export function Footer() {
  return (
    <footer className="border-t mt-16">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <Link href="/" className="text-lg font-semibold">
              ScentScape
            </Link>
            <p className="text-sm text-gray-500 mt-2">
              Discover your signature fragrance through personalized
              recommendations.
            </p>
          </div>

          <div>
            <h3 className="font-medium mb-3">Discover</h3>
            <ul className="space-y-2 text-sm text-gray-600">
              <li>
                <Link href="/quiz" className="hover:text-black transition-colors">
                  Find Your Scent
                </Link>
              </li>
              <li>
                <Link href="/products" className="hover:text-black transition-colors">
                  All Fragrances
                </Link>
              </li>
              <li>
                <Link href="/collections" className="hover:text-black transition-colors">
                  Collections
                </Link>
              </li>
              <li>
                <Link href="/search" className="hover:text-black transition-colors">
                  Search
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-medium mb-3">Account</h3>
            <ul className="space-y-2 text-sm text-gray-600">
              <li>
                <Link href="/login" className="hover:text-black transition-colors">
                  Sign In
                </Link>
              </li>
              <li>
                <Link href="/register" className="hover:text-black transition-colors">
                  Create Account
                </Link>
              </li>
              <li>
                <Link href="/account/orders" className="hover:text-black transition-colors">
                  Order History
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-medium mb-3">Legal</h3>
            <ul className="space-y-2 text-sm text-gray-600">
              <li>
                <span className="text-gray-400">Privacy Policy</span>
              </li>
              <li>
                <span className="text-gray-400">Terms of Service</span>
              </li>
              <li>
                <span className="text-gray-400">Cookie Policy</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t mt-8 pt-8 text-center text-sm text-gray-400">
          <p>&copy; {new Date().getFullYear()} ScentScape. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
