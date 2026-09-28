const ServiceCard = ({ item }) => {
  const { imgUrl, title, desc } = item;

  return (
    <div className="h-full bg-surface border border-border rounded-lg p-4
                    hover:border-accent transition-colors duration-150">
      {/* Icon in a soft circle */}
      <div className="w-12 h-12 mb-4 rounded-full bg-secondary-soft
                      flex items-center justify-center">
        <img src={imgUrl} alt="" className="w-6 h-6 object-contain" />
      </div>

      <h5 className="text-lg font-medium text-text mb-2">{title}</h5>
      <p className="text-sm text-text-muted leading-relaxed">{desc}</p>
    </div>
  );
};

export default ServiceCard;