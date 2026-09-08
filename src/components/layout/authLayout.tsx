import { Link } from "@tanstack/react-router";

interface Props {
  title: string;
  subtitle: string;
  tagline: string;
  taglineDetail: string;
  footer: React.ReactNode;
  children: React.ReactNode;
}

export default function AuthLayout({
  title,
  subtitle,
  tagline,
  taglineDetail,
  footer,
  children,
}: Props) {
  return (
    <div className="flex min-h-screen">
      <div className="relative hidden w-1/2 shrink-0 overflow-hidden bg-white md:flex md:flex-col md:justify-between lg:w-3/5">
        <div
          className="absolute inset-0 opacity-[0.05]"
          style={{
            backgroundImage:
              "radial-gradient(circle, #000000 1px, transparent 1px)",
            backgroundSize: "28px 28px",
          }}
        />
        <div className="absolute -left-24 -top-24 h-96 w-96 rounded-full bg-primary/20 blur-[120px]" />
        <div className="absolute -bottom-32 right-0 h-96 w-96 rounded-full bg-primary/15 blur-[120px]" />

        <Link
          to="/"
          className="relative flex items-center gap-2 px-8 pt-8 lg:px-12 lg:pt-10"
        >
          <img src="/logo.png" alt="" className="h-10 w-10 object-contain" />
          <span className="text-lg font-bold text-foreground">
            Samer <span className="text-primary">Shop</span>
          </span>
        </Link>

        <div className="relative px-8 pb-12 lg:px-12 lg:pb-16">
          <span className="mb-4 block h-1 w-12 rounded-full bg-primary" />
          <h2 className="max-w-sm text-4xl font-bold leading-[1.1] text-foreground lg:text-5xl">
            {tagline}
          </h2>
          <p className="mt-4 max-w-xs text-sm leading-6 text-muted-foreground">
            {taglineDetail}
          </p>
        </div>
      </div>

      <div className="flex w-full flex-col justify-center px-6 py-12 sm:px-12 md:w-1/2 lg:w-2/5 lg:px-16">
        <Link to="/" className="mb-10 flex items-center gap-2 md:hidden">
          <img src="/logo.png" alt="" className="h-9 w-9 object-contain" />
          <span className="text-lg font-bold">
            <span className="text-foreground">Samer</span>{" "}
            <span className="text-primary">Shop</span>
          </span>
        </Link>

        <div className="mx-auto w-full max-w-sm animate-in fade-in slide-in-from-bottom-2 duration-500">
          <h1 className="text-2xl font-bold">{title}</h1>
          <p className="mt-1 text-sm text-muted-foreground">{subtitle}</p>

          <div className="mt-8">{children}</div>

          <div className="mt-6">{footer}</div>
        </div>
      </div>
    </div>
  );
}
