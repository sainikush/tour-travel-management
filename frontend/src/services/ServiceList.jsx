import ServiceCard from "./ServiceCard";

import weatherImg   from "../assets/images/weather.png";
import guideImg     from "../assets/images/guide.png";
import customization from "../assets/images/customization.png";

const serviceData = [
  {
    imgUrl: weatherImg,
    title: "Calculate Weather",
    desc: "Unplug and unwind in this cozy log cabin surrounded by the natural beauty of Montana.",
  },
  {
    imgUrl: guideImg,
    title: "Best Tour Guide",
    desc: "Stay in an eco-friendly treehouse nestled in the forest. It's the perfect escape for nature lovers.",
  },
  {
    imgUrl: customization,
    title: "Customization",
    desc: "Explore the vibrant city of Tokyo from this modern and centrally located apartment.",
  },
];

const ServiceList = () => (
  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
    {serviceData.map((item, index) => (
      <ServiceCard key={index} item={item} />
    ))}
  </div>
);

export default ServiceList;