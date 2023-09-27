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
      localStorage.setItem(
        `cartItems${data.id}`,
        JSON.stringify({
          ...existingItem,
          quantity: existingItem.quantity + 1,
        }),
      );
    } else {
      // Ako proizvod nije u košarici, dodaj ga
      setSelectedItems((prevValues) => [
        ...prevValues,
        { ...data, quantity: 1 },
      ]);

      localStorage.setItem(
        `cartItems${data.id}`,
        JSON.stringify({ ...data, quantity: +1 }),
      );
    }
  };

  return (
    <Card>
      <Card.Section>
        <Image
          src={
            "https://iks-portal.info/media/k2/items/cache/fd751459bb160ddea7151d8faaaa5b2c_L.jpg"
          }
          height={150}
          alt="voće"
        />
      </Card.Section>

      <Text weight={500}>{data.title}</Text>
      <Group position="apart" mt="md" mb="xs">
        {data.is_sale ? (
          <>
            <Text size="sm" color="red">
              {data.price}
            </Text>
            <Text size="sm" color="green">
              {data.sale_price}
            </Text>

            <Badge color="green" variant="light">
              Sniženje
            </Badge>
          </>
        ) : (
          <Text size="sm" color="black">
            {data.price}
          </Text>
        )}
      </Group>
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
