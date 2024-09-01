import React from "react";

interface ProductCardProps {
  product: {
    id: number;
    title: string;
    description: string;
    image: string;
  };
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  return (
    <div className="border rounded-lg shadow-lg overflow-hidden bg-white w-[30%] p-4 flex flex-col items-center">
      <img
        src={product.image}
        alt={product.title}
        className="w-[300px] h-80 object-cover mb-4 rounded"
      />
      <div className="flex flex-col items-center text-center">
        <h1 className="text-lg font-semibold mb-2">{product.title}</h1>
        <p className="text-gray-600 text-sm">{product.description}</p>
      </div>
    </div>
  );
};

export default ProductCard;
