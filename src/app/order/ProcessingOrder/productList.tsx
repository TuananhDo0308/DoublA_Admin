import React from "react";
import Image from "next/image";
import { IMG_URL } from "@/API/LinkAPI";

interface Product {
  str_masp: string;
  str_tensp: string;
  d_don_gia: number;
  strimg: string;
}

interface OrderDetail {
  i_so_luong: number;
  Product: Product;
}

interface ProductListProps {
  orderDetails: OrderDetail[];
}

const ProductList: React.FC<ProductListProps> = ({ orderDetails }) => {
  return (
    <div className="grid grid-cols-3 gap-4">
      {orderDetails.map((detail, index) => (
        <div key={index} className="flex items-center space-x-4">
          <Image
            src={`${IMG_URL}/${detail.Product.strimg}`}
            alt={detail.Product.str_tensp}
            width={80}
            height={80}
            className="rounded"
          />
          <div>
            <p className="text-sm font-medium">{detail.Product.str_tensp}</p>
            <p className="text-sm">Quantity: {detail.i_so_luong}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ProductList;
