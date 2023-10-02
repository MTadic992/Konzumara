import { useContext, useState } from "react";
import {
  AppShell,
  Navbar,
  Header,
  Footer,
  MediaQuery,
  Burger,
  useMantineTheme,
  Title,
  Button,
  Stack,
  Image,
} from "@mantine/core";

import { Link, Outlet, useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthProvider";

export default function AdminDashboard() {
  const theme = useMantineTheme();
  const [opened, setOpened] = useState(false);
  const { signOut } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleClick = () => {
    navigate("/");
    signOut();
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
        <Navbar
          p="md"
          hiddenBreakpoint="sm"
          hidden={!opened}
          width={{ sm: 200, lg: 300 }}
        >
          <Stack spacing={20}>
            <Link to="products">
              <Button color="yellow">Products</Button>
            </Link>
            <Link to="categories">
              <Button color="yellow">Categories</Button>
            </Link>
            <Link to="orders">
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
            <MediaQuery largerThan="sm" styles={{ display: "none" }}>
              <Burger
                opened={opened}
                onClick={() => setOpened((o) => !o)}
                size="sm"
                color={theme.colors.gray[6]}
                mr="xl"
              />
            </MediaQuery>
            <Title color="red">Admin page</Title>
            <Button color="red" radius="lg" onClick={handleClick}>
              Sign Out
            </Button>
          </div>
        </Header>
      }
    >
      <Image
        radius="md"
        src="https://arhitehnicar.hr/wp-content/uploads/2019/03/IZRADA-I-VODENJE-KALKULACIJA-U-GRADITELJSTVU-ANALIZA-CIJENA-750x440.jpg"
      />
      <Outlet />
    </AppShell>
  );
}
