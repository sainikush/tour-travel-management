import maleTourist from "../assets/images/male-tourist.png";

const Newsletter = () => {
  const handleSubmit = (e) => {
    e.preventDefault();
    const email = e.target.email.value.trim();
    if (!email) return;
    // TODO: wire up to your API
    console.log("Subscribe:", email);
    e.target.reset();
  };

  return (
    <section className="bg-secondary-soft">
      <div className="container-x py-12 md:py-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">

          {/* ---- Left: copy + form ---- */}
          <div className="lg:col-span-6">
            <p className="eyebrow mb-3">Newsletter</p>

            <h2 className="mb-5 max-w-lg">
              Subscribe now to get useful travelling information
            </h2>

            <form
              onSubmit={handleSubmit}
              className="flex flex-col sm:flex-row gap-3
                         bg-surface border border-border rounded-md p-2
                         max-w-md mb-5"
            >
              <input
                type="email"
                name="email"
                required
                placeholder="Enter your email"
                className="flex-1 bg-transparent px-4 py-3 text-sm text-text
                           placeholder:text-text-muted/70 outline-none"
              />
              <button type="submit" className="btn-primary shrink-0">
                Subscribe
              </button>
            </form>

            <p className="max-w-prose text-sm">
              One email a month. Real destinations, honest pricing, no spam.
              Unsubscribe anytime.
            </p>
          </div>

          {/* ---- Right: illustration ---- */}
          <div className="lg:col-span-6">
            <div className="aspect-[4/3] rounded-lg overflow-hidden">
              <img
                src={maleTourist}
                alt="Traveller"
                className="w-full h-full object-cover"
              />
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default Newsletter;