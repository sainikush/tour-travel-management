import Subtitle from "../shared/Subtitle";
import SearchBar from "../shared/SearchBar";
import ServiceList from "../services/ServiceList";
import FeaturedTourList from "../Components/Featured-tours/FeaturedTourList";
import MasonryImagesGallery from "../Components/Image-gallery/MasonryImagesGallery";
import Testimonial from "../Components/Testimonial/Testimonial";
import Newsletter from "../shared/Newsletter";

import heroImg01 from "../assets/images/hero-img01.jpg";
import heroImg02 from "../assets/images/hero-img02.jpg";
import heroVideo from "../assets/images/hero-video.mp4";
import worldImg from "../assets/images/world.png";
import experienceImg from "../assets/images/experience.png";

const Home = () => {
  return (
    <>
      {/* ============ HERO ============ */}
      <section className="bg-bg py-12 md:py-16 lg:py-20">
        <div className="container-x">
          <div className="grid grid-cols-12 gap-8 lg:gap-10 items-center">

            <div className="col-span-12 lg:col-span-5">
              <div className="flex items-center gap-3 mb-4">
                <Subtitle subtitle="Know Before You Go" />
                <img src={worldImg} alt="" className="h-5 w-auto opacity-80" />
              </div>

              <h1 className="mb-5 max-w-lg">
                Travelling opens the door to create{" "}
                <span className="text-accent">memories</span>
              </h1>

              <p className="max-w-prose">
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
                Necessitatibus iure velit similique, corrupti rem aperiam quam
                fugiat amet illo excepturi magnam accusamus id maiores est
                voluptas nobis obcaecati veritatis.
              </p>
            </div>

            <div className="col-span-12 lg:col-span-7">
              <div className="grid grid-cols-12 gap-4">
                <div className="col-span-5">
                  <div className="aspect-[3/4] rounded-lg overflow-hidden shadow-sm">
                    <img
                      src={heroImg01}
                      alt="Destination 1"
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>
                <div className="col-span-4">
                  {/* sage backing behind video */}
                  <div className="aspect-[3/4] rounded-lg overflow-hidden shadow-sm bg-secondary-soft">
                    <video
                      src={heroVideo}
                      controls
                      playsInline
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>
                <div className="col-span-3">
                  <div className="aspect-[3/4] rounded-lg overflow-hidden shadow-sm mt-8">
                    <img
                      src={heroImg02}
                      alt="Destination 2"
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>
              </div>
            </div>

            <div className="col-span-12">
              <SearchBar />
            </div>
          </div>
        </div>
      </section>

      {/* ============ SERVICES ============ */}
      <section className="section bg-surface border-y border-border">
        <div className="container-x">
          <div className="grid grid-cols-12 gap-8 items-start">
            <header className="col-span-12 lg:col-span-3">
              <p className="eyebrow mb-3">What We Serve</p>
              <h2>We offer our best services</h2>
            </header>
            <div className="col-span-12 lg:col-span-9">
              <ServiceList />
            </div>
          </div>
        </div>
      </section>

      {/* ============ FEATURED TOURS ============ */}
      <section className="section bg-bg">
        <div className="container-x">
          <header className="max-w-prose mb-8 md:mb-10">
            <p className="eyebrow mb-3">Explore</p>
            <h2>Our featured tours</h2>
          </header>
          <FeaturedTourList />
        </div>
      </section>

      {/* ============ EXPERIENCE ============ */}
      <section className="section bg-surface border-y border-border">
        <div className="container-x">
          <div className="grid grid-cols-12 gap-8 lg:gap-12 items-center">

            <div className="col-span-12 lg:col-span-6">
              <p className="eyebrow mb-3">Experience</p>
              <h2 className="mb-5">
                With all our experience, <br className="hidden md:block" />
                we will serve you
              </h2>
              <p className="max-w-prose mb-8">
                Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                Fugit nobis vero, hic laborum at ipsa alias soluta aliquid
                repellendus aut explicabo animi labore odio.
              </p>

              <div className="flex flex-wrap gap-8">
                {[
                  { value: "12k+", label: "Successful Trips" },
                  { value: "2k+",  label: "Regular Clients"  },
                  { value: "15",   label: "Years Experience" },
                ].map((stat) => (
                  <div key={stat.label}>
                    <p className="text-2xl md:text-3xl font-display font-semibold text-primary mb-1">
                      {stat.value}
                    </p>
                    <p className="text-sm text-text-muted">{stat.label}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="col-span-12 lg:col-span-6">
              <div className="aspect-[4/3] rounded-lg overflow-hidden shadow-sm">
                <img
                  src={experienceImg}
                  alt="Experience"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ============ GALLERY ============ */}
      <section className="section bg-secondary-soft">
        <div className="container-x">
          <header className="max-w-prose mb-8 md:mb-10">
            <p className="eyebrow mb-3">Gallery</p>
            <h2>Visit our customers' tour gallery</h2>
          </header>
          <MasonryImagesGallery />
        </div>
      </section>

      {/* ============ TESTIMONIALS ============ */}
      <section className="section bg-bg">
        <div className="container-x">
          <header className="max-w-prose mb-8 md:mb-10">
            <p className="eyebrow mb-3">Fans Love</p>
            <h2>What our fans say about us</h2>
          </header>
          <Testimonial />
        </div>
      </section>

      {/* ============ NEWSLETTER ============ */}
      <Newsletter />
    </>
  );
};

export default Home;