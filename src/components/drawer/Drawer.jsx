import { Drawer, Button, Stack, Text, Group } from "@mantine/core";
import ProductCard from "../productCard/ProductCard";

function CartDrawer({
  data,
  opened,
  setOpened,
  selectedItems,
  setSelectedItems,
}) {
  function calculateTotalPrice() {
    return selectedItems
      ?.reduce((prev, curr) => prev + curr.price * curr.quantity, 0)
      .toFixed(2);
  }

  const handleDelete = (id) => {
    setSelectedItems((prevItems) => prevItems.filter((item) => item.id !== id));
    localStorage.removeItem(`cartItems${id}`);
  };

  const handleDeleteAll = () => {
    setSelectedItems([]);
    localStorage.clear();
  };

  const handleAddOne = (id) => {
    setSelectedItems((prevItems) =>
      prevItems.map((item) => {
        if (item.id === id) {
          return { ...item, quantity: item.quantity + 1 };
        }
        return item;
      }),
    );
    const updatedItem = selectedItems.find((item) => item.id === id);

    localStorage.setItem(
      `cartItems${id}`,
      JSON.stringify({ ...updatedItem, quantity: updatedItem.quantity + 1 }),
    );
  };

  const handleRemoveOne = (id) => {
    setSelectedItems((prevItems) =>
      prevItems.map((item) => {
        if (item.id === id && item.quantity) {
          return { ...item, quantity: item.quantity - 1 };
        }
        return item;
      }),
    );
    const updatedItem = selectedItems.find((item) => item.id === id);

    localStorage.setItem(
      `cartItems${id}`,
      JSON.stringify({ ...updatedItem, quantity: updatedItem.quantity - 1 }),
    );
  };

  const getStorageData = () => {
    const items = [];
    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i);
      if (key.includes("cartItems")) {
        items.push(JSON.parse(localStorage.getItem(key)));
      }
    }
    return items;
  };

  return (
    <>
      <Drawer
        opened={opened}
        onClose={() => setOpened(false)}
        title="Košarica"
        overlayProps={{ opacity: 0.5, blur: 3 }}
      >
        <Stack>
          {selectedItems?.map((item) => (
            <>
              <ProductCard data={item} />

              <Group>
                <Text>{`Količina: ${item.quantity}`}</Text>
                <Button
                  color="blue"
                  variant="outline"
                  onClick={() => handleAddOne(item.id)}
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
                Izbriši
              </Button>
            </>
          ))}

          <Button onClick={handleDeleteAll}>Izbriši sve</Button>

          <Button fullWidth>
            <Text>{`Ukupno: ${calculateTotalPrice()} (za ${selectedItems.reduce(
              (total, item) => total + item.quantity,
              0,
            )} proizvoda)`}</Text>
          </Button>
        </Stack>
      </Drawer>
    </>
  );
}

export default CartDrawer;
