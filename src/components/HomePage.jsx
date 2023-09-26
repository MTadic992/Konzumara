import { useState, useEffect, useContext } from "react";
import {
  AppShell,
  Header,
  Footer,
  Text,
  useMantineTheme,
  Select,
  Group,
  Button,
} from "@mantine/core";
import ShoppingCart from "./header/ShoppingCart";
import { PRODUCTS } from "../data";
import ProductList from "../components/productList/ProductList";
import { IconShoppingCart } from "@tabler/icons-react";
import LoginModal from "../components/loginModal/LoginModal";
import RegisterModal from "../components/registerModal/RegisterModal";
import { AuthContext } from "../context/AuthProvider";

function HomePage() {
  const theme = useMantineTheme();
  const [opened, setOpened] = useState(false);
  const [displayedProducts, setDisplayedProducts] = useState(8);
  const [selectedItems, setSelectedItems] = useState([]);
  const [loginOpened, setLoginOpened] = useState(false);
  const [registereOpened, setRegisterOpened] = useState(false);
  const { user, signOut } = useContext(AuthContext);

  const loadMoreProudcts = () => {
    setDisplayedProducts((prev) => prev + 8);
  };

  const [selectedOption, setSelectedOption] = useState(null);

  const [cartItems, setCartItems] = useState(selectedItems);

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

  useEffect(() => {
    const savedCartItems = getStorageData();
    if (savedCartItems) {
      setSelectedItems(savedCartItems);
    }
  }, []);

  const sortedProducts = sortProducts(selectedOption, PRODUCTS);

  function sortProducts(option, products) {
    switch (option) {
      case "option1":
        return products.slice().sort((a, b) => a.Name.localeCompare(b.Name));
      case "option2":
        return products.slice().sort((a, b) => b.Name.localeCompare(a.Name));
      case "option3":
        return products.slice().sort((a, b) => b.price - a.price);
      case "option4":
        return products.slice().sort((a, b) => a.price - b.price);
      case "option5":
        return products.slice().sort((a, b) => b.Name.localeCompare(a.Name));
      case "option6":
        return products.slice().sort((a, b) => a.Name.localeCompare(b.Name));
      default:
        return products;
    }
  }

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

  return (
    <AppShell
      styles={{
        main: {
          background:
            theme.colorScheme === "dark"
              ? theme.colors.dark[8]
              : theme.colors.gray[0],
        },
      }}
      navbarOffsetBreakpoint="sm"
      footer={
        <Footer height={60} p="md">
          Konzumara
        </Footer>
      }
      header={
        <Header height={{ base: 50, md: 70 }} p="md">
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              height: "100%",
            }}
          >
            <Group>
              <IconShoppingCart fill="white" />
            </Group>

            <Group>
              <ShoppingCart
                selectedItems={selectedItems}
                setSelectedItems={setSelectedItems}
              />
              {user ? (
                <Button
                  size="sm"
                  style={{ marginRight: "1rem" }}
                  onClick={signOut}
                >
                  Odjavi se
                </Button>
              ) : (
                <Button
                  size="sm"
                  style={{ marginRight: "1rem" }}
                  onClick={openLogin}
                >
                  Prijavi se
                </Button>
              )}

              <Button size="sm" onClick={openRegister}>
                Registriraj se
              </Button>
            </Group>
          </div>
          <LoginModal opened={loginOpened} close={closeLogin} user={user} />
          <RegisterModal
            opened={registereOpened}
            close={closeRegister}
            loginOpened={setLoginOpened}
          />
        </Header>
      }
    >
      <Group>
        <Text size="xl">PROIZVODI</Text>
        <Select
          placeholder="Sortiraj"
          size="sm"
          radius="md"
          data={[
            { value: "option1", label: "NAJSTARIJE -> NAJNOVIJE" },
            { value: "option2", label: "NAJNOVIJE -> NAJSTARIJE" },
            { value: "option3", label: "NAJSKUPLJE -> NAJJEFTINIJE" },
            { value: "option4", label: "NAJJEFTINIJE -> NAJSKUPLJE" },
            { value: "option5", label: "Z -> A" },
            { value: "option6", label: "A -> Z" },
          ]}
          value={selectedOption}
          onChange={(value) => setSelectedOption(value)}
        />
      </Group>
      <ProductList
        data={sortedProducts.slice(0, displayedProducts)}
        loadMore={loadMoreProudcts}
        selectedItems={selectedItems}
        setSelectedItems={setSelectedItems}
        sortOption={selectedOption}
      />
    </AppShell>
  );
}

export default HomePage;
