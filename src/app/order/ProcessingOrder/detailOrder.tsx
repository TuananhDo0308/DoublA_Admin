import React, { useEffect, useState } from "react";
import ProductList from "./productList";
import { getOrderDetail } from "@/API/orderAPI"; // Import your API function

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

interface Order {
  str_mahd: string;
  str_ho_ten: string;
  d_tong: number;
  OrderDetails: OrderDetail[];
}

interface OrderDetailModalProps {
  orderId: Order | null; // Use orderId instead of passing the whole order
  onClose: () => void;
}

const OrderDetailModal: React.FC<OrderDetailModalProps> = ({ orderId, onClose }) => {
  const [order, setOrder] = useState<Order | null>(null);

  useEffect(() => {
    if (orderId) {
      // Fetch the order details when the modal opens
      fetchOrderDetail(orderId.str_mahd);
    }
  }, [orderId]);

  const fetchOrderDetail = async (id: string) => {
    try {
      const data = await getOrderDetail(id);
      setOrder(data.orderDetail); // Assuming your API response contains the order details under "orderDetail"
    } catch (error) {
      console.error("Error fetching order details:", error);
    }
  };

  if (!order || !orderId) return null;

  return (
    <div className="fixed ml-[290px] inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="relative w-full max-w-4xl bg-white p-6 rounded-lg shadow-lg">
        <h2 className="text-2xl font-bold mb-4">Order Details</h2>
        <p className="mb-4"><strong>Order ID:</strong> {order.str_mahd}</p>
        <p className="mb-4"><strong>Customer Name:</strong> {orderId.str_ho_ten}</p>
        <p className="mb-4"><strong>Total Amount:</strong> ${order.d_tong}</p>
        <h3 className="text-xl font-semibold mb-2">Products:</h3>
        <ProductList orderDetails={order.OrderDetails} />
        <button
          className="mt-6 rounded-full bg-primary px-4 py-2 text-white hover:bg-opacity-90"
          onClick={onClose}
        >
          Close
        </button>
      </div>
    </div>
  );
};

export default OrderDetailModal;
