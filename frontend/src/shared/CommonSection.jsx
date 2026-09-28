import tourImg from "../assets/images/tour.jpg";

const CommonSection = ({ title }) => {
  return (
    <section
      className="relative h-[280px] md:h-[320px]
                 flex items-center justify-center text-center
                 bg-cover bg-center"
      style={{
        backgroundImage: `linear-gradient(rgba(15,61,62,0.55), rgba(15,61,62,0.55)), url(${tourImg})`,
      }}
    >
      <div className="container-x">
        <h1 className="text-white text-3xl md:text-4xl lg:text-5xl tracking-tight">
          {title}
        </h1>
      </div>
    </section>
  );
};

export default CommonSection;