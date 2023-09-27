import { useState, useEffect, useContext } from "react";
import {
  AppShell,
  Navbar,
  Header,
  Footer,
  Text,
  MediaQuery,
  Burger,
  useMantineTheme,
  Title,
  Stack,
  Button,
  Group,
  Pagination,
} from "@mantine/core";

import AdminTable from "../../components/productItems/AdminTable";
import { Link, useNavigate } from "react-router-dom";
import { supabase } from "../../config";
import { AuthContext } from "../../context/AuthProvider";
import { SearchBar } from "../productItems/SearchBar";

export default function AdminProducts() {
  const theme = useMantineTheme();
  const [opened, setOpened] = useState(false);
  const [products, setProducts] = useState(null);
  const navigate = useNavigate();
  const [value, setValue] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [countPages, setCountPages] = useState(0);
  const pageSize = 5;

  const fetchProducts = async () => {
    const range = currentPage ? currentPage - 1 : 0;
    const offset = range * pageSize;
    let query = supabase.from("products").select("*", { count: "exact" });

    if (searchQuery) {
      query = query.ilike("title", `%${searchQuery}%`);
    }
    const { data, error, count } = await query
      .range(offset, offset + pageSize + 1)
      .limit(5);
    setProducts(data);
    setCountPages(count);

    return data;
  };

  const handleSearch = (e) => {
    if (e.key === "Enter") {
      setSearchQuery(value);
    }
  };

  const handleClick = () => {
    navigate("/admin");
  };

  // const fetchProducts = async () => {
  //   const { data, error } = await supabase.from("products").select("*");

  //   setProducts(data);

  //   return data;
  // };

  async function onDelete(id) {
    const { data, error } = await supabase
      .from("products")
      .delete()
      .eq("id", id)
      .select();
    if (error) {
      throw new Error(error.message);
    }
  }
  useEffect(() => {
    fetchProducts();
  }, [currentPage, searchQuery]);

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
      asideOffsetBreakpoint="sm"
      navbar={
        <Navbar
          p="md"
          hiddenBreakpoint="sm"
          hidden={!opened}
          width={{ sm: 200, lg: 300 }}
        >
          <Title color="red">Proizvodi</Title>
          <Stack spacing={20}>
            <Link to="/admin/products">
              <Button>Proizvodi</Button>
            </Link>

            <Link to="/admin/categories">
              <Button>Kategorije</Button>
            </Link>

            <Link to="/admin/orders">
              <Button>Narudžbe</Button>
            </Link>
          </Stack>
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
              alignItems: "center",
              height: "100%",
              justifyContent: "space-between",
            }}
          >
            <Group>
              <Title color="red">Admin Proizvodi</Title>
              <Button radius="lg" size="xs" onClick={handleClick}>
                Povratak
              </Button>
            </Group>
            <MediaQuery largerThan="sm" styles={{ display: "none" }}>
              <Burger
                opened={opened}
                onClick={() => setOpened((o) => !o)}
                size="sm"
                color={theme.colors.gray[6]}
                mr="xl"
              />
            </MediaQuery>
          </div>
        </Header>
      }
    >
      <SearchBar value={value} setValue={setValue} onEnter={handleSearch} />
      {products && (
        <>
          <AdminTable
            getData={fetchProducts}
            data={products}
            onDelete={onDelete}
          />
          <Pagination
            value={currentPage}
            total={Math.ceil(countPages / pageSize)}
            onChange={(value) => {
              setCurrentPage(value);
            }}
          />
        </>
      )}
    </AppShell>
  );
}
