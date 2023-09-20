import React, { useState } from "react";
import { Button, Badge, Group } from "@mantine/core";

import CartDrawer from "../drawer/Drawer";
import LoginModal from "../loginModal/LoginModal";
import RegisterModal from "../registerModal/RegisterModal";

function ShoppingCart({ data, selectedItems, setSelectedItems }) {
  const [loginOpened, setLoginOpened] = useState(false);
  const [registereOpened, setRegisterOpened] = useState(false);
  const [opened, setOpened] = useState(false);

  function openLogin() {
    setLoginOpened(true);
  }

  function closeLogin() {
    setLoginOpened(false);
  }

  function openRegister() {
    setRegisterOpened(true);
  }

  function closeRegister() {
    setRegisterOpened(false);
  }

  const open = () => {
    console.log(opened);
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
          <Badge color="red" size="sm" style={{ marginRight: "0.5rem" }} />
          Košarica
        </Button>
        <Button size="sm" style={{ marginRight: "1rem" }} onClick={openLogin}>
          Prijavi se
        </Button>
        <Button size="sm" onClick={openRegister}>
          Registriraj se
        </Button>
      </Group>
      <CartDrawer
        opened={opened}
        setOpened={setOpened}
        data={data}
        selectedItems={selectedItems}
        setSelectedItems={setSelectedItems}
      />
      <LoginModal opened={loginOpened} close={closeLogin} />
      <RegisterModal opened={registereOpened} close={closeRegister} />
    </div>
  );
}

export default ShoppingCart;
