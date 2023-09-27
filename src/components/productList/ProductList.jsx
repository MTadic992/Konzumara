import { Grid } from "@mantine/core";
import ProductCard from "../productCard/ProductCard";

export default function ProductList({ data }) {
  return (
    <div>
      <Grid columns={4} gutter="xl" m={10}>
        {data?.map((product) => {
          return (
            <Grid.Col key={product.id} span={1}>
              <ProductCard data={product} />
            </Grid.Col>
          );
        })}
      </Grid>
    </div>
  );
}
