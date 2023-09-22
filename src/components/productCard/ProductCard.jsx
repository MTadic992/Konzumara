import { Card, Image, Text, Badge, Button, Group } from "@mantine/core";

function ProductCard({ data, selectedItems, setSelectedItems }) {
  const handleClick = () => {
    const existingItem = selectedItems.find((item) => item.id === data.id);

    if (existingItem) {
      // Ako je proizvod već u košarici, povećaj količinu
      setSelectedItems((prevItems) =>
        prevItems.map((item) => {
          if (item.id === data.id) {
            return { ...item, quantity: item.quantity + 1 };
          }
          return item;
        }),
      );
    } else {
      // Ako proizvod nije u košarici, dodaj ga
      setSelectedItems((prevValues) => [
        ...prevValues,
        { ...data, quantity: 1 },
      ]);
      localStorage.setItem(`cartItems${data.id}`, JSON.stringify(data));
    }
  };

  console.log(selectedItems);
  return (
    <Card>
      <Card.Section>
        <Image src={data.productImg} height={150} alt="voće" />
      </Card.Section>

      <Group position="apart" mt="md" mb="xs">
        <Text weight={500}>{data.Name}</Text>
        <Badge color="pink" variant="light">
          Sniženje
        </Badge>
      </Group>

      <Text size="sm" color="dimmed">
        {data.price}
      </Text>

      <Button
        variant="light"
        color="blue"
        fullWidth
        mt="md"
        radius="md"
        onClick={handleClick}
      >
        Košarica
      </Button>
    </Card>
  );
}

export default ProductCard;
