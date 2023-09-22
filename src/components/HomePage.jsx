import { useState, useEffect } from "react";
import {
  AppShell,
  Header,
  Footer,
  Text,
  MediaQuery,
  Burger,
  useMantineTheme,
  Select,
  Group,
} from "@mantine/core";
import ShoppingCart from "./header/ShoppingCart";
import { PRODUCTS } from "../data";
import ProductList from "../components/productList/ProductList";
import { IconShoppingCart } from "@tabler/icons-react";

function HomePage() {
  const theme = useMantineTheme();
  const [opened, setOpened] = useState(false);
  const [displayedProducts, setDisplayedProducts] = useState(8);
  const [selectedItems, setSelectedItems] = useState([]);

  const loadMoreProudcts = () => {
    setDisplayedProducts((prev) => prev + 8);
  };

  const [selectedOption, setSelectedOption] = useState(null);

  const [cartItems, setCartItems] = useState(selectedItems);

  useEffect(() => {
    const savedCartItems = JSON.parse(localStorage.getItem("cartItems"));
    if (savedCartItems) {
      setCartItems(savedCartItems);
    }
  }, []);
  console.log(cartItems);

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
            <MediaQuery largerThan="sm" styles={{ display: "none" }}>
              <Burger
                opened={opened}
                onClick={() => setOpened((o) => !o)}
                size="sm"
                color={theme.colors.gray[6]}
                mr="xl"
              />
            </MediaQuery>

            <IconShoppingCart fill="white" />

            {/* <div style={{ position: "relative" }}>
              <IconShoppingCart fill="blue" />
              {selectedItems.length > 0 && (
                <div
                  style={{
                    position: "absolute",
                    top: "-8px",
                    right: "-8px",
                    background: "red",
                    color: "white",
                    borderRadius: "50%",
                    padding: "4px 8px",
                    fontSize: "12px",
                    fontWeight: "bold",
                  }}
                >
                  {selectedItems.length}
                </div>
              )}
            </div> */}

            <ShoppingCart
              selectedItems={selectedItems}
              setSelectedItems={setSelectedItems}
            />
          </div>
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
