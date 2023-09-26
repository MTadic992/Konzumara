import { Button, Grid } from "@mantine/core";
import ProductCard from "../productCard/ProductCard";

import React, { useEffect, useState } from "react";
import { supabase } from "../../config";

export default function ProductList({ selectedItems, setSelectedItems }) {
  const [fetchError, setFetchError] = useState(null);
  const [products, setProducts] = useState([]);
  const [loadMoreProudcts, setLoadMoreProducts] = useState(7);
  const fetchProducts = async () => {
    const { data, error } = await supabase
      .from("products")
      .select()
      .range(0, loadMoreProudcts);
    setProducts(data);
  };
  useEffect(() => {
    fetchProducts();
  }, [loadMoreProudcts]);

  console.log(products);

  function LoadMore() {
    setLoadMoreProducts(loadMoreProudcts + 8);
  }

  return (
    <div>
      <Grid columns={4} gutter="xl" m={10}>
        {products?.map((product) => {
          return (
            <Grid.Col key={product.id} span={1}>
              <ProductCard
                data={product}
                setSelectedItems={setSelectedItems}
                selectedItems={selectedItems}
              />
            </Grid.Col>
          );
        })}
      </Grid>
      <Button variant="filled" color="blue" size="sm" onClick={LoadMore}>
        Učitaj više
      </Button>
    </div>
  );
}
