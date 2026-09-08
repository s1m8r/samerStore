import { Link, useNavigate } from "@tanstack/react-router";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  Loader2,
  LogOutIcon,
  Menu,
  Search,
  ShoppingCart,
  UserIcon,
  X,
} from "lucide-react";
import { useAuthStore } from "@/stores/userStore";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useCartStore } from "@/stores/cartStore";
import { Button } from "@/components/ui/button";
import { useGetStores } from "@/API/stores";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
  InputGroupInput,
} from "@/components/ui/input-group";
import useDebounce from "./searchDelay";
import { useEffect, useRef, useState } from "react";
import { useGetProducts } from "@/API/product";
import { Skeleton } from "@/components/ui/skeleton";

const Header = () => {
  const { items, clearCart } = useCartStore();
  const [query, setQuery] = useState("");
  const [openSearch, setOpenSearch] = useState(false);
  const [openMenu, setOpenMenu] = useState(false);
  const [showResults, setShowResults] = useState(false);
  const desktopSearchRef = useRef<HTMLDivElement>(null);
  const mobileSearchRef = useRef<HTMLDivElement>(null);
  const debounceQuery = useDebounce(query, 400);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as Node;
      if (
        !desktopSearchRef.current?.contains(target) &&
        !mobileSearchRef.current?.contains(target)
      ) {
        setShowResults(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () =>
      document.removeEventListener("mousedown", handleClickOutside);
  }, []);
  const { data: products, isFetching } = useGetProducts(
    100000,
    "",
    1,
    debounceQuery,
  );
  const isSearching = isFetching || query !== debounceQuery;
  const navigator = useNavigate();
  const goToLogin = () => {
    navigator({ to: "/login" });
  };
  const user = useAuthStore.getState().user;
  const logout = useAuthStore.getState().logout;
  const { data: Shop, isLoading: isLoadingShops } = useGetStores();
  const closeMenu = () => {
    setOpenMenu(false);
  };

  return (
    <div className="sticky top-0 z-50 w-full border-b border-border bg-background/80 px-2 backdrop-blur-md md:px-12">
      <div className="mx-auto hidden items-center gap-6 px-4 md:flex">
        <Link to="/" className="flex shrink-0 items-center gap-2">
          <img
            src="/logo.png"
            alt="Logo"
            className="h-12 w-12 object-contain"
          />
          <span className="text-xl font-bold">
            <span className="text-foreground">Samer</span>{" "}
            <span className="text-primary">Shop</span>
          </span>
        </Link>
        <NavigationMenu className="shrink-0">
          <NavigationMenuList>
            <NavigationMenuItem>
              <NavigationMenuTrigger>Shops</NavigationMenuTrigger>
              <NavigationMenuContent>
                <div className="flex max-h-80 flex-col gap-1 overflow-y-auto">
                  {isLoadingShops
                    ? Array.from({ length: 4 }).map((_, i) => (
                        <div key={i} className="px-3 py-2">
                          <Skeleton className="h-4 w-24" />
                        </div>
                      ))
                    : Shop?.data.map((item) => (
                        <NavigationMenuLink key={item.id} asChild>
                          <Link to={`/stores/${item.id}`}>{item.name}</Link>
                        </NavigationMenuLink>
                      ))}
                </div>
              </NavigationMenuContent>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <NavigationMenuLink asChild>
                <Link to="/stores/TopSell">On Sale</Link>
              </NavigationMenuLink>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <NavigationMenuLink asChild>
                <Link to="/stores/newarrivals">New Arrivals</Link>
              </NavigationMenuLink>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <NavigationMenuLink asChild>
                <Link to="/orders">My Orders</Link>
              </NavigationMenuLink>
            </NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenu>
        <div ref={desktopSearchRef} className="relative flex-1 px-6">
          <InputGroup className="w-full bg-transparent">
            <InputGroupInput
              placeholder="Search products..."
              value={query}
              onChange={(e) => {
                setQuery(e.target.value);
                setShowResults(true);
              }}
              onFocus={() => setShowResults(true)}
            />

            <InputGroupAddon>
              {isSearching ? <Loader2 className="animate-spin" /> : <Search />}
            </InputGroupAddon>

            {query && (
              <InputGroupAddon align="inline-end">
                {isSearching
                  ? "Searching..."
                  : `${products?.data.length ?? 0} results`}
                <InputGroupButton
                  size="icon-xs"
                  aria-label="Clear search"
                  onClick={() => setQuery("")}
                >
                  <X />
                </InputGroupButton>
              </InputGroupAddon>
            )}
          </InputGroup>

          {query && showResults && (
            <div className="absolute left-6 right-6 top-full z-50 mt-2 max-h-96 overflow-y-auto rounded-xl border border-border bg-background p-2 shadow-lg">
              {isSearching ? (
                Array.from({ length: 4 }).map((_, i) => (
                  <div key={i} className="flex items-center gap-3 p-3">
                    <Skeleton className="h-12 w-12 shrink-0 rounded-md" />
                    <div className="min-w-0 flex-1 space-y-1.5">
                      <Skeleton className="h-4 w-1/2" />
                      <Skeleton className="h-3 w-1/4" />
                    </div>
                  </div>
                ))
              ) : products?.data.length ? (
                products.data.map((item) => (
                  <Link
                    key={item.id}
                    to={`/stores/product/${item.id}`}
                    onClick={() => setQuery("")}
                    className="flex items-center gap-3 rounded-lg p-3 hover:bg-muted"
                  >
                    <img
                      src={item.image}
                      alt={item.name}
                      className="h-12 w-12 rounded-md object-cover"
                    />
                    <div className="min-w-0 flex-1">
                      <p className="truncate font-medium">{item.name}</p>
                      <p className="text-sm text-muted-foreground">
                        ${item.price.toFixed(2)}
                      </p>
                      {item.discountPercentage > 0 && (
                        <p className="text-sm text-red-500">
                          {item.discountPercentage}%
                        </p>
                      )}
                    </div>
                  </Link>
                ))
              ) : (
                <div className="p-4 text-center text-sm text-muted-foreground">
                  No products found
                </div>
              )}
            </div>
          )}
        </div>

        <div className="flex shrink-0 items-center gap-4">
          <button
            className="relative cursor-pointer"
            onClick={() => navigator({ to: "/mycart" })}
          >
            <ShoppingCart />
            {items.length > 0 && (
              <span className="absolute -right-1 -top-1 flex h-4 min-w-4 items-center justify-center rounded-full bg-orange-500 px-1 text-xs font-bold text-white shadow-md">
                {items.length}
              </span>
            )}
          </button>
        </div>
        <div className="flex shrink-0 items-center gap-4">
          {!user && <Button onClick={goToLogin}>Login</Button>}

          {user && (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  className="flex h-8 w-8 cursor-pointer items-center justify-center rounded-full text-sm"
                  variant="default"
                >
                  {user.firstName.charAt(0).toUpperCase()}
                  {user.lastName.charAt(0).toUpperCase()}
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuItem onClick={() => navigator({ to: "/profile" })}>
                  <UserIcon />
                  Profile
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem
                  variant="destructive"
                  onClick={() => {
                    clearCart();
                    logout();
                    navigator({ to: "/" });
                  }}
                >
                  <LogOutIcon />
                  Log out
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          )}
        </div>
      </div>

      <div className="flex w-full flex-col md:hidden">
        <div className="flex h-16 w-full items-center justify-between px-2">
          <button
            onClick={() => setOpenMenu((prev) => !prev)}
            className="flex h-10 w-10 items-center justify-center rounded-lg hover:bg-muted"
          >
            {openMenu ? <X size={24} /> : <Menu size={24} />}
          </button>
          <Link to="/" className="flex items-center gap-2" onClick={closeMenu}>
            <img
              src="/logo.png"
              alt="Logo"
              className="h-12 w-12 object-contain"
            />
            <span className="text-xl font-bold">
            <span className="text-foreground">Samer</span>{" "}
            <span className="text-primary">Shop</span>
          </span>
          </Link>
          <div className="flex items-center gap-3">
            <button onClick={() => setOpenSearch((prev) => !prev)}>
              <Search />
            </button>
            <button
              className="relative"
              onClick={() => navigator({ to: "/mycart" })}
            >
              <ShoppingCart />
              {items.length > 0 && (
                <span className="absolute -right-1 -top-1 flex h-4 min-w-4 items-center justify-center rounded-full bg-orange-500 px-1 text-xs font-bold text-white">
                  {items.length}
                </span>
              )}
            </button>

            {!user && (
              <Button onClick={goToLogin} className="h-8 px-3">
                Login
              </Button>
            )}

            {user && (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    className="flex h-8 w-8 cursor-pointer items-center justify-center rounded-full text-xs"
                    variant="default"
                  >
                    {user.firstName.charAt(0).toUpperCase()}
                    {user.lastName.charAt(0).toUpperCase()}
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  <DropdownMenuItem
                    onClick={() => navigator({ to: "/profile" })}
                  >
                    <UserIcon />
                    Profile
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem
                    variant="destructive"
                    onClick={() => {
                      clearCart();
                      logout();
                      navigator({ to: "/" });
                    }}
                  >
                    <LogOutIcon />
                    Log out
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            )}
          </div>
        </div>

        {openMenu && (
          <div className="animate-in border-t border-border bg-background py-4 fade-in slide-in-from-top-2 duration-300">
            <div className="flex flex-col gap-1">
              <Link
                to="/"
                onClick={closeMenu}
                className="rounded-lg px-4 py-3 font-medium hover:bg-muted"
              >
                Home
              </Link>
              <Accordion type="multiple" className="w-full">
                <AccordionItem value="shops">
                  <AccordionTrigger className="rounded-lg px-4 py-3 font-medium hover:bg-muted">
                    Shops
                  </AccordionTrigger>
                  {isLoadingShops
                    ? Array.from({ length: 4 }).map((_, i) => (
                        <AccordionContent key={i} className="w-full">
                          <div className="px-4 py-2">
                            <Skeleton className="h-4 w-24" />
                          </div>
                        </AccordionContent>
                      ))
                    : Shop?.data.map((item) => (
                        <AccordionContent key={item.id} className="w-full">
                          <Link
                            to={`/stores/${item.id}`}
                            onClick={closeMenu}
                            className="block rounded-lg px-4 py-2 font-medium hover:bg-muted"
                          >
                            {item.name}
                          </Link>
                        </AccordionContent>
                      ))}
                </AccordionItem>
              </Accordion>
              <Link
                to="/stores/TopSell"
                onClick={closeMenu}
                className="rounded-lg px-4 py-3 font-medium hover:bg-muted"
              >
                On Sale
              </Link>
              <Link
                to="/stores/newarrivals"
                onClick={closeMenu}
                className="rounded-lg px-4 py-3 font-medium hover:bg-muted"
              >
                New Arrivals
              </Link>
              <Link
                to="/orders"
                onClick={closeMenu}
                className="rounded-lg px-4 py-3 font-medium hover:bg-muted"
              >
                My Orders
              </Link>
            </div>
          </div>
        )}

        {openSearch && (
          <div
            ref={mobileSearchRef}
            className="animate-in relative w-full px-2 pb-3 fade-in slide-in-from-top-2 duration-300"
          >
            <InputGroup className="w-full bg-transparent">
              <InputGroupInput
                placeholder="Search products..."
                value={query}
                onChange={(e) => {
                  setQuery(e.target.value);
                  setShowResults(true);
                }}
                onFocus={() => setShowResults(true)}
                autoFocus
              />
              <InputGroupAddon>
                {isSearching ? (
                  <Loader2 className="animate-spin" />
                ) : (
                  <Search />
                )}
              </InputGroupAddon>
              {query && (
                <InputGroupAddon align="inline-end">
                  {isSearching
                    ? "Searching..."
                    : `${products?.data.length ?? 0} results`}
                  <InputGroupButton
                    size="icon-xs"
                    aria-label="Clear search"
                    onClick={() => setQuery("")}
                  >
                    <X />
                  </InputGroupButton>
                </InputGroupAddon>
              )}
            </InputGroup>
            {query && showResults && (
              <div className="absolute left-2 right-2 top-full z-50 mt-2 max-h-96 overflow-y-auto rounded-xl border border-border bg-background p-2 shadow-lg">
                {isSearching ? (
                  Array.from({ length: 4 }).map((_, i) => (
                    <div key={i} className="flex items-center gap-3 p-3">
                      <Skeleton className="h-12 w-12 shrink-0 rounded-md" />
                      <div className="min-w-0 flex-1 space-y-1.5">
                        <Skeleton className="h-4 w-1/2" />
                        <Skeleton className="h-3 w-1/4" />
                      </div>
                    </div>
                  ))
                ) : products?.data.length ? (
                  products.data.map((item) => (
                    <Link
                      key={item.id}
                      to={`/stores/product/${item.id}`}
                      onClick={() => {
                        setQuery("");
                        setOpenSearch(false);
                      }}
                      className="flex items-center gap-3 rounded-lg p-3 hover:bg-muted"
                    >
                      <img
                        src={item.image}
                        alt={item.name}
                        className="h-12 w-12 rounded-md object-cover"
                      />
                      <div className="min-w-0 flex-1">
                        <p className="truncate font-medium">{item.name}</p>
                        <p className="text-sm text-muted-foreground">
                          ${item.price.toFixed(2)}
                        </p>
                        {item.discountPercentage > 0 && (
                          <p className="text-sm text-red-500">
                            {item.discountPercentage}%
                          </p>
                        )}
                      </div>
                    </Link>
                  ))
                ) : (
                  <div className="p-4 text-center text-sm text-muted-foreground">
                    No products found
                  </div>
                )}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Header;
