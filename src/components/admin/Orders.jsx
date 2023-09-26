import { useState } from "react";
import {
  AppShell,
  Navbar,
  Header,
  Footer,
  MediaQuery,
  Burger,
  useMantineTheme,
  Title,
  Stack,
  Button,
} from "@mantine/core";

import AdminTable from "../productItems/AdminTable";
import { Link } from "react-router-dom";

export default function AdminOrders() {
  const theme = useMantineTheme();
  const [opened, setOpened] = useState(false);
  return <p>orders</p>;
}
