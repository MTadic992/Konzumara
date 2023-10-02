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
import ProductList from "../components/productList/ProductList";
import { IconShoppingCart } from "@tabler/icons-react";
import LoginModal from "../components/loginModal/LoginModal";
import RegisterModal from "../components/registerModal/RegisterModal";
import { AuthContext } from "../context/AuthProvider";
import { supabase } from "../config";

function HomePage() {
  const theme = useMantineTheme();

  const [selectedItems, setSelectedItems] = useState([]);
  const [loginOpened, setLoginOpened] = useState(false);
  const [registereOpened, setRegisterOpened] = useState(false);
  const { user, signOut } = useContext(AuthContext);
  const [more, setMore] = useState(7);
  const [sortType, setSortType] = useState("");
  const [countPages, setCountPages] = useState(0);
  const [products, setProducts] = useState([]);

  const getStorageData = () => {
    // const items = [];
    if (!localStorage.cart) return [];

    return Object.values(JSON.parse(localStorage.cart));
    // console.log(typeof JSON.parse(localStorage.cart), "local");
    // for (let i = 0; i < localStorage.length; i++) {
    //   const key = localStorage.key(i);
    //   if (key.includes("cartItem")) {
    //     items.push(JSON.parse(localStorage.getItem(key)));
    //   }
    // }
    // console.log(items, "fetch");
    // return items;
  };

  function handleSetMore() {
    setMore(more + 8);
  }

  useEffect(() => {
    const fetch = async () => {
      let query = supabase.from("products").select("*", { count: "exact" });
      if (sortType === "NAJSTARIJE -> NAJNOVIJE") {
        query = query.order("created_at", { ascending: true });
      }
      if (sortType === "NAJNOVIJE -> NAJSTARIJE") {
        query = query.order("created_at", { ascending: false });
      }
      if (sortType === "A -> Z") {
        query = query.order("title", { ascending: true });
      }
      if (sortType === "Z -> A") {
        query = query.order("title", { ascending: false });
      }
      if (sortType === "NAJSKUPLJE -> NAJJEFTINIJE") {
        query = query.order("price", { ascending: false });
      }
      if (sortType === "NAJJEFTINIJE -> NAJSKUPLJE") {
        query = query.order("price", { ascending: true });
      }
      const { data, error, count } = await query.range(0, more);
      setProducts(data);
      setCountPages(count);
    };
    fetch();
  }, [more, sortType]);

  useEffect(() => {
    const savedCartItems = getStorageData();
    if (savedCartItems) {
      setSelectedItems(savedCartItems);
    }
  }, []);

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
                  Sign out
                </Button>
              ) : (
                <Button
                  size="sm"
                  style={{ marginRight: "1rem" }}
                  onClick={openLogin}
                >
                  Sign in
                </Button>
              )}

              <Button size="sm" onClick={openRegister}>
                {}
                Register
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
        <Text size="xl">PRODUCTS</Text>
        <Select
          placeholder="Sort"
          size="sm"
          radius="md"
          data={[
            "NAJSTARIJE -> NAJNOVIJE",
            "NAJNOVIJE -> NAJSTARIJE",
            "A -> Z",
            "Z -> A",
            "NAJSKUPLJE -> NAJJEFTINIJE",
            "NAJJEFTINIJE -> NAJSKUPLJE",
          ]}
          value={sortType}
          onChange={setSortType}
          clearable
        />
      </Group>
      <ProductList data={products} setSelectedItems={setSelectedItems} />
      <Button
        variant="filled"
        color="blue"
        size="sm"
        onClick={handleSetMore}
        disabled={products.length === countPages}
      >
        Load more
      </Button>
    </AppShell>
  );
}

export default HomePage;
