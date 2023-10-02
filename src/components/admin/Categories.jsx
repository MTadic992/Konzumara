import {
  AppShell,
  Navbar,
  Header,
  Footer,
  Title,
  Stack,
  Button,
  Group,
  useMantineTheme,
} from "@mantine/core";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { supabase } from "../../config";

export default function AdminCategories() {
  const theme = useMantineTheme();
  const navigate = useNavigate();
  const [category, setCategory] = useState([]);

  const handleClick = () => {
    navigate("/admin");
  };
  const getCategories = async () => {
    const { data } = await supabase.from("categories").select("*");
    setCategory(data);
  };

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
        <Navbar p="md" hiddenBreakpoint="sm" width={{ sm: 200, lg: 300 }}>
          <Title color="red">Categories</Title>
          <Stack spacing={20}>
            <Link to="/admin/products">
              <Button color="yellow">Products</Button>
            </Link>

            <Link to="/admin/categories">
              <Button color="yellow">Categories</Button>
            </Link>

            <Link to="/admin/orders">
              <Button color="yellow">Orders</Button>
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
              <Title color="red">Admin categories</Title>

              <Button color="red" radius="lg" size="xs" onClick={handleClick}>
                Back
              </Button>
            </Group>
          </div>
        </Header>
      }
    >
      
    </AppShell>
  );
}
