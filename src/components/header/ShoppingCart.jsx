import React, { useState, useEffect } from "react";
import { Button, Badge, Group } from "@mantine/core";

import CartDrawer from "../drawer/Drawer";

function ShoppingCart({ selectedItems, setSelectedItems }) {
  const [opened, setOpened] = useState(false);
  const [cartItems, setCartItems] = useState();

  const open = () => {
    setOpened(true);
  };

  return (
    <div>
      <Group position="center" spacing="xl">
        <Button
          variant="light"
          size="sm"
          style={{ marginRight: "1rem" }}
          onClick={open}
        >
          <Badge color="red" size="sm" style={{ marginRight: "0.5rem" }}>
            {selectedItems?.length}
          </Badge>
          Shopping Cart
        </Button>
      </Group>
      <CartDrawer
        opened={opened}
        setOpened={setOpened}
        selectedItems={selectedItems}
        setSelectedItems={setSelectedItems}
      />
    </div>
  );
}

export default ShoppingCart;
