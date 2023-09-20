import { useState } from "react";
import {
  AppShell,
  Navbar,
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
      navbar={
        <Navbar
          p="md"
          hiddenBreakpoint="sm"
          hidden={!opened}
          width={{ sm: 100, lg: 200 }}
        >
          <Text>Application navbar</Text>
        </Navbar>
      }
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
            <IconShoppingCart fill="red" />
            <IconShoppingCart fill="white" />
            <IconShoppingCart fill="blue" />

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
        data={PRODUCTS.slice(0, displayedProducts)}
        loadMore={loadMoreProudcts}
        selectedItems={selectedItems}
        setSelectedItems={setSelectedItems}
      />
    </AppShell>
  );
}

export default HomePage;
