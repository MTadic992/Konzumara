import { Grid } from "@mantine/core";
import ProductCard from "../productCard/ProductCard";
import LoadMoreButton from "../loadMore/LoadMore";
import React from "react";

export default function ProductList({
  data,
  loadMore,
  selectedItems,
  setSelectedItems,
}) {
  return (
    <div>
      <Grid columns={4} gutter="xl" m={10}>
        {data?.map((product) => {
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
      <LoadMoreButton onClick={loadMore} />
    </div>
  );
}
