import { Card, Image, Text, Badge, Button, Group } from "@mantine/core";

function ProductCard({ data, selectedItems, setSelectedItems }) {
  const handleClick = () => {
    console.log("click");
    setSelectedItems((prevValues) => [...prevValues, data]);
  };

  // const getSizeCard = (size) => {
  //   return { padding: "sm", radius: "sm", shadow: "sm" };
  // };

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
