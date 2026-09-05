import { Link } from "@tanstack/react-router";
import { Globe, Mail, MessageCircle, Send } from "lucide-react";
import { useGetStores } from "@/API/stores";

const Footer = () => {
  const { data: Shop } = useGetStores();

  return (
    <footer className="w-full border-t border-border bg-background px-2 md:px-12">
      <div className="mx-auto grid grid-cols-1 gap-8 px-4 py-10 sm:grid-cols-2 lg:grid-cols-4">
        <div className="flex flex-col gap-3">
          <Link to="/" className="flex items-center gap-2">
            <img
              src="/logo.png"
              alt="Logo"
              className="h-12 w-12 object-contain"
            />
            <span className="text-xl font-bold">Samer Shop</span>
          </Link>
          <p className="text-sm text-muted-foreground">
            Quality fashion for every style, delivered right to your door.
          </p>
          <div className="mt-2 flex items-center gap-3">
            <a
              href="#"
              aria-label="Website"
              className="flex h-9 w-9 items-center justify-center rounded-full border border-border text-muted-foreground transition-colors hover:border-orange-500 hover:text-orange-500"
            >
              <Globe size={16} />
            </a>
            <a
              href="#"
              aria-label="Email"
              className="flex h-9 w-9 items-center justify-center rounded-full border border-border text-muted-foreground transition-colors hover:border-orange-500 hover:text-orange-500"
            >
              <Mail size={16} />
            </a>
            <a
              href="#"
              aria-label="Chat"
              className="flex h-9 w-9 items-center justify-center rounded-full border border-border text-muted-foreground transition-colors hover:border-orange-500 hover:text-orange-500"
            >
              <MessageCircle size={16} />
            </a>
            <a
              href="#"
              aria-label="Send message"
              className="flex h-9 w-9 items-center justify-center rounded-full border border-border text-muted-foreground transition-colors hover:border-orange-500 hover:text-orange-500"
            >
              <Send size={16} />
            </a>
          </div>
        </div>

        <div className="flex flex-col gap-3">
          <span className="font-bold">Quick Links</span>
          <Link
            to="/"
            className="text-sm text-muted-foreground hover:text-foreground"
          >
            Home
          </Link>
          <Link
            to="/stores/TopSell"
            className="text-sm text-muted-foreground hover:text-foreground"
          >
            On Sale
          </Link>
          <Link
            to="/stores/newarrivals"
            className="text-sm text-muted-foreground hover:text-foreground"
          >
            New Arrivals
          </Link>
          <Link
            to="/orders"
            className="text-sm text-muted-foreground hover:text-foreground"
          >
            My Orders
          </Link>
        </div>

        <div className="flex flex-col gap-3">
          <span className="font-bold">Shops</span>
          {Shop?.data.slice(0, 5).map((item) => (
            <Link
              key={item.id}
              to={`/stores/${item.id}`}
              className="text-sm text-muted-foreground hover:text-foreground"
            >
              {item.name}
            </Link>
          ))}
        </div>

        <div className="flex flex-col gap-3">
          <span className="font-bold">Contact</span>
          <p className="text-sm text-muted-foreground">
            support@samershop.com
          </p>
          <p className="text-sm text-muted-foreground">+1 (555) 123-4567</p>
        </div>
      </div>

      <div className="border-t border-border py-4 text-center text-sm text-muted-foreground">
        © {new Date().getFullYear()} Samer Shop. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
