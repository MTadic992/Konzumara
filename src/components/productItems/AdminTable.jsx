import { Table, Button, Group } from "@mantine/core";
import { useState } from "react";
import "../modalAddProduct/index";
import AddProduct from "../modalAddProduct/index";

import { AdminTableRow } from "./AdminTableRow";
import AddCategory from "../modalAddCategories";

export default function AdminTable({ data, onDelete }) {
  const [addProduct, setAddProduct] = useState(false);
  const [openCategory, setOpenCategory] = useState(false);

  function addNewProduct() {
    setAddProduct(true);
  }

  function closeNewProduct() {
    setAddProduct(false);
  }

  return (
    <>
      <Group justify="space-between">
        <Button mt={10} onClick={addNewProduct}>
          Add new product
        </Button>
        <Button mt={10} onClick={() => setOpenCategory(true)}>
          Add new category
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
      <AddCategory isOpened={openCategory} onClose={setOpenCategory} />
    </>
  );
}
