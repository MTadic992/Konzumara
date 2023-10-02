import { Grid } from "@mantine/core";
import ProductCard from "../productCard/ProductCard";

export default function ProductList({ data, setSelectedItems }) {
  const handleAddToCart = (product) => {
    let products = JSON.parse(localStorage.getItem(`cart`)) || [];

    products.map((item) => ({ ...item, inCart: 0 }));

    // const productExists = products.find((p) => p.id === product.id);

    // if (productExists?.quantity >= product.quantity) {
    //   alert("nema vise");
    //   return;
    // }

    // if (productExists) {
    //   // ako postoji u kosarici dodaj quantity
    //   const index = products.findIndex((p) => p.id === productExists.id);
    //   products[index].quantity = productExists.quantity + 1;
    // } else {
    //   products.push({
    //     ...product,
    //     quantity: 1,
    //   });
    // }

    const prod = products.find((item) => item.id === product.id);

    if (prod) {
      if (prod.inCart === prod.quantity) return;

      const newItems = products.map((item) =>
        item.id === product.id ? { ...item, inCart: item.inCart + 1 } : item,
      );
      setSelectedItems(newItems);
      localStorage.setItem("cart", JSON.stringify(newItems));
      return;
    }

    console.log(products);

    const newItems = [...products, { ...product, inCart: 1 }];
    setSelectedItems(newItems);
    localStorage.setItem("cart", JSON.stringify(newItems));

    // if (products[product.id]) {
    //   localStorage.setItem(
    //     `cart`,
    //     JSON.stringify({
    //       ...products,
    //       [product.id]: {
    //         ...products[product.id],
    //         quantity: products[product.id].quantity + 1,
    //       },
    //     }),
    //   );
    //   return;
    // }

    // localStorage.setItem(
    //   `cart`,
    //   JSON.stringify({
    //     ...products,
    //     [product.id]: { ...product, quantity: 1 },
    //   }),
    // );
  };

  return (
    <div>
      <Grid columns={4} gutter="xl" m={10}>
        {data?.map((product) => {
          return (
            <Grid.Col key={product.id} span={1}>
              <ProductCard data={product} onHandleAdd={handleAddToCart} />
            </Grid.Col>
          );
        })}
      </Grid>
    </div>
  );
}
