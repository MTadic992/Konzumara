import { Drawer, Button, Stack, Text, Group } from "@mantine/core";
import ProductCard from "../productCard/ProductCard";
import { useEffect, useState } from "react";
import { supabase } from "../../config";
import { Fragment } from "react";

function CartDrawer({
  data,
  opened,
  setOpened,
  selectedItems,
  setSelectedItems,
}) {
  const [cartItems, setCartItems] = useState(selectedItems);
  const [availableProducts, setAvailableProducts] = useState();

  useEffect(() => {
    const fetch = async () => {
      const { data } = await supabase.from("products").select();

      if (data) {
        setAvailableProducts(data);
      }
    };

    fetch();
  }, []);

  let products = JSON.parse(localStorage.getItem("cartItem")) || [];

  function calculateTotalPrice() {
    const list = selectedItems.map((item) =>
      item.is_sale ? item.sale_price * item.inCart : item.price * item.inCart,
    );
    return list.reduce((prev, curr) => prev + curr, 0).toFixed(2);
    // return selectedItems
    //   ?.reduce((prev, curr) => prev + curr.price * curr.inCart, 0)
    //   .toFixed(2);
  }

  const handleDelete = (id) => {
    const newItems = selectedItems.filter((item) => item.id !== id);
    console.log(newItems, "novi");
    setSelectedItems(newItems);
    localStorage.setItem("cart", JSON.stringify(newItems));
  };

  const handleDeleteAll = () => {
    localStorage.clear();
    setSelectedItems([]);
  };

  const handleAddOne = (data) => {
    const find = selectedItems.find((item) => item.id === data.id);

    if (find.inCart === find.quantity) return;

    const newItems = selectedItems.map((item) =>
      item.id === data.id ? { ...item, inCart: item.inCart + 1 } : item,
    );

    setSelectedItems(newItems);
    console.log(newItems);
    localStorage.setItem("cart", JSON.stringify(newItems));
  };

  const handleRemoveOne = (id) => {
    const item = selectedItems.find((item) => item.id === id);

    if (item.inCart === 1) {
      const newItems = selectedItems.filter((item) => item.id !== id);
      setSelectedItems(newItems);
      localStorage.setItem("cart", JSON.stringify(newItems));
      return;
    }
    const newItems = selectedItems.map((item) =>
      item.id === id ? { ...item, inCart: item.inCart - 1 } : item,
    );
    setSelectedItems(newItems);
    localStorage.setItem("cart", JSON.stringify(newItems));
  };

  const addToDb = async () => {
    const {
      data: {
        session: { user },
      },
      error,
    } = await supabase.auth.getSession();

    if (error) return;

    const item = selectedItems[0];
    const data = {
      user_id: user.id,
      product_id: item.id,
      quantity: 2,
    };

    for (let index = 0; index < selectedItems.length; index++) {
      const item = selectedItems[index];
      const data = {
        user_id: user.id,
        product_id: item.id,
        quantity: item.inCart,
      };
      await supabase.from("orders").insert(data);
    }

    localStorage.setItem("cart", JSON.stringify([]));
    setSelectedItems([]);

    // selectedItems.forEach((item) => {
    //   const data = {
    //     user_id: user.id,
    //     product_id: item.id,
    //     quantity: item.inCart,
    //   };
    //   await supabase.from("orders").insert(data);
    // });
    // console.log(selectedItems);
  };

  useEffect(() => {
    const products = JSON.parse(localStorage.getItem("cart")) || [];
    console.log(products);
    setSelectedItems(Object.values(products));
  }, [opened]);
  console.log(selectedItems, "selected");
  return (
    <>
      <Drawer
        opened={opened}
        onClose={() => setOpened(false)}
        title="Cart"
        overlayProps={{ opacity: 0.5, blur: 3 }}
      >
        <Stack>
          {selectedItems?.map((item, i) => {
            return (
              <Fragment key={i}>
                <ProductCard data={item} onHandleAdd={handleAddOne} isDrawer />

                <Group>
                  <Text>{`Cart: ${item.inCart}`}</Text>
                  <Button
                    color="blue"
                    variant="outline"
                    onClick={() => handleAddOne(item)}
                  >
                    +
                  </Button>
                  <Button
                    color="blue"
                    variant="outline"
                    onClick={() => handleRemoveOne(item.id)}
                  >
                    -
                  </Button>
                </Group>
                <Button
                  color="red"
                  variant="filled"
                  onClick={() => handleDelete(item.id)}
                >
                  Delete
                </Button>
              </Fragment>
            );
          })}

          <Button onClick={handleDeleteAll}>Delete all</Button>

          <Button fullWidth onClick={addToDb}>
            <Text>{`Total: ${calculateTotalPrice()}`}</Text>
          </Button>
        </Stack>
      </Drawer>
    </>
  );
}

export default CartDrawer;
