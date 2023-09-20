import { Drawer, Button, Stack, Text } from "@mantine/core";
import ProductCard from "../productCard/ProductCard";

function CartDrawer({
  opened,
  setOpened,
  data,
  selectedItems,
  setSelectedItems,
}) {
  function calculateTotalPrice(data) {
    return data?.reduce((prev, curr) => prev + curr.price, 0).toFixed(2);
  }

  const handleDelete = (id) => {
    console.log("klik");
    setSelectedItems((prevItems) => prevItems.filter((item) => item.id !== id));
  };

  console.log(data);

  return (
    <>
      <Drawer
        opened={opened}
        onClose={() => setOpened(false)}
        title="Košarica"
        overlayProps={{ opacity: 0.5, blur: 4 }}
      >
        <Stack>
          {selectedItems?.map((item) => (
            <>
              <ProductCard data={item} />
              <Button variant="filled" onClick={() => handleDelete(item.id)}>
                Izbriši
              </Button>
            </>
          ))}
          <Text>{`Ukupno: ${calculateTotalPrice(data)}`}</Text>
          <Button fullWidth>Kupi</Button>
        </Stack>
      </Drawer>
    </>
  );
}

export default CartDrawer;
