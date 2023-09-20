import { Button, Group } from "@mantine/core";
import React from "react";

function LoadMoreButton({ onClick }) {
  return (
    <Group position="center">
      <Button variant="filled" color="blue" size="sm" onClick={onClick}>
        Učitaj više
      </Button>
    </Group>
  );
}

export default LoadMoreButton;
