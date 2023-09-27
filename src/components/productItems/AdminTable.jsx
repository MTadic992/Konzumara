import { Table, Button, Group } from "@mantine/core";
import { useState } from "react";
import "../modalAddProduct/index";
import AddProduct from "../modalAddProduct/index";

import { AdminTableRow } from "./AdminTableRow";

export default function AdminTable({ data, onDelete }) {
  const [addProduct, setAddProduct] = useState(false);

  function addNewProduct() {
    console.log(addProduct);
    setAddProduct(true);
    console.log(addProduct);
  }

  function closeNewProduct() {
    setAddProduct(false);
    console.log(addProduct);
  }

  return (
    <>
      <Group justify="space-between">
        <Button mt={10} onClick={addNewProduct}>
          Dodaj novi proizvod
        </Button>
      </Group>
      <Table highlightOnHover striped>
        <thead>
          <tr>
            <th>Title</th>
            <th>Description</th>
            <th>Quantity</th>
            <th>On sale?</th>
            <th>Sale price</th>
            <th>Regular price</th>
            <th></th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {data.map((product) => {
            return (
              <AdminTableRow
                onDelete={onDelete}
                key={product.id}
                product={product}
              />
            );
          })}
        </tbody>
      </Table>
      <AddProduct isOpened={addProduct} onClose={closeNewProduct} />
    </>
  );
}
