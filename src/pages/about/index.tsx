import Design from "@/components/layout/design";

const About = () => {
  return (
    <Design>
      <div className="mx-auto max-w-2xl px-2 py-10 text-left sm:py-16">
        <h1 className="mb-4 text-3xl font-bold sm:text-4xl">About Us</h1>
        <p className="leading-relaxed text-muted-foreground">
          We connect shoppers with trusted stores in one place. Browse
          products, discover new stores, and find what you're looking for —
          all in one simple platform.
        </p>

        <h2 className="mb-3 mt-10 text-xl font-semibold sm:mt-12">
          Our mission
        </h2>
        <p className="leading-relaxed text-muted-foreground">
          We built this platform to make shopping simple — one place to
          explore every store, compare products, and shop with confidence.
        </p>
      </div>
    </Design>
  );
};

export default About;
