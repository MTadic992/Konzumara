import { useState, useEffect } from "react";
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
import { supabase } from "../../config";

export default function AdminProducts() {
  const theme = useMantineTheme();
  const [opened, setOpened] = useState(false);

  const [products, setProducts] = useState(null);

  return <p>products</p>;
}
