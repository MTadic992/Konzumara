import { Text } from "@mantine/core";
import { supabase } from "../../config";
import { useEffect, useState } from "react";
import EditProduct from "../modalEditProduct/index";

export function AdminTableRow({ onDelete, product }) {
  const [openEdit, setOpenEdit] = useState(false);
  function openEditModal() {
    setOpenEdit(true);
  }

  function closeEditModal() {
    setOpenEdit(false);
  }

  return (
    <>
      <tr>
        <td>
          <Text color="Black" size="lg">
            {product.title}
          </Text>
        </td>
        <td>{product.description}</td>
        <td>{product.quantity}</td>
        <td>{product.is_sale}</td>
        <td>{product.sale_price}</td>
        <td>{product.price}</td>
        <td>
          <button onClick={openEditModal}>Edit</button>
        </td>
        <td>
          <button onClick={() => onDelete(product.id)}>Delete</button>
        </td>
      </tr>
      <EditProduct
        isOpened={openEdit}
        onClose={closeEditModal}
        productId={product.id}
        title={product.title}
        description={product.description}
        quantity={product.quantity}
        is_sale={product.is_sale}
        sale_price={product.sale_price}
        price={product.price}
        category={product.category}
      />
    </>
  );
}
