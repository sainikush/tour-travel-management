import Masonry, { ResponsiveMasonry } from "react-responsive-masonry";
import galleryImages from "./galleryImage";

const MasonryImagesGallery = () => (
  <ResponsiveMasonry columnsCountBreakPoints={{ 350: 1, 768: 3, 992: 4 }}>
    <Masonry gutter="16px">
      {galleryImages.map((item, index) => (
        <img
          key={index}
          src={item}
          alt={`Gallery ${index + 1}`}
          loading="lazy"
          className="w-full block rounded-lg object-cover"
        />
      ))}
    </Masonry>
  </ResponsiveMasonry>
);

export default MasonryImagesGallery;