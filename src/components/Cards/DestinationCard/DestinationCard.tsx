import Image from "next/image";

const DestinationCard = ({
  destination,
  image,
}: {
  destination: string;
  image: string;
}) => {
  return (
    <div className="relative w-full h-96 rounded-2xl overflow-hidden shadow-lg group cursor-pointer">
      {/* Background Image */}
      <div className="absolute inset-0">
        <Image
          src={image}
          alt={destination}
          fill
          className="object-cover transition-transform duration-300 group-hover:scale-105"
        />
        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent"></div>
      </div>

      {/* Content */}
      <div className="relative h-full flex flex-col justify-center items-center text-white">
        {/* Destination Name */}
        <h2 className="text-4xl font-medium mb-4 drop-shadow-lg">
          {destination}
        </h2>
      </div>
    </div>
  );
};

export default DestinationCard;
