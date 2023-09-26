import {
  Modal,
  Group,
  Button,
  TextInput,
  NumberInput,
  FileInput,
  Checkbox,
  Select,
  Textarea,
  Title,
  Stack,
} from "@mantine/core";
import { useForm, yupResolver } from "@mantine/form";
import { useToggle } from "@mantine/hooks";
import { supabase } from "../../config";

import { useState, useEffect } from "react";
import { REGISTER_SCHEMA } from "../schema";

export default function EditProduct({
  isOpened,
  onClose,
  productId,
  title,
  description,
  quantity,
  is_sale,
  sale_price,
  price,
  category,
}) {
  const [isOnSale, toggle] = useState(false); /* 
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [quantity, setQuantity] = useState(0);
    const [is_sale, setIs_sale] = useState(false);
    const [sale_price, setSale_price] = useState(0);
    const [price, setPrice] = useState(0);
    const [category, setCategory] = useState("");
  
    useEffect(() => {
      const fetchProduct = async () => {
        const { data } = await supabase
          .from("products")
          .select()
          .eq("id", productId)
          .single();
        console.log("WAA", data.id);
        setTitle(data.title);
        setDescription(data.description);
        setQuantity(data.quantity);
        setIs_sale(data.is_sale);
        setSale_price(data.sale_price);
        setPrice(data.price);
        setCategory(data.category);
        console.log(data);
      };
      fetchProduct();
    }, []);
   */

  const form = useForm({
    initialValues: {
      title: title,
      description: description,
      quantity: quantity,
      is_sale: is_sale,
      sale_price: sale_price,
      price: price,
      category: category,
    },

    validate: yupResolver(REGISTER_SCHEMA),
  });

  async function updateProduct() {
    const { error } = await supabase
      .from("products")
      .update({
        title: form.values.title,
        description: form.values.description,
        quantity: form.values.quantity,
        is_sale: form.values.is_sale,
        sale_price: form.values.sale_price,
        price: form.values.price,
        //category: form.values.category,
      })
      .eq("id", productId);
    onClose();
  }

  /* const { data, error } = await supabase
        .from("products")
        .insert([
          {
            title: form.values.title,
            description: form.values.description,
            quantity: form.values.quantity,
            is_sale: form.values.is_sale,
            sale_price: form.values.sale_price,
            price: form.values.price,
          },
        ])
        .select();
      if (error) {
        console.log(error);
      }
      if (data) {
        console.log(data);
      }
      console.log("Turbo top", form[1]);
      form.reset();
      onClose();
      toggle(); */

  return (
    <>
      <Modal opened={isOpened} onClose={onClose} centered>
        <Title order={1} color="#FF8A65">
          Edit product named {title}
        </Title>
        <Stack justify="space-between">
          <form onSubmit={form.onSubmit((values) => console.log(values))}>
            <TextInput
              {...form.getInputProps("title")}
              value={form?.values.title}
              placeholder="Your product name"
              label="Product name"
            />
            <Textarea
              {...form.getInputProps("description")}
              label="Product description"
              placeholder="Describe your product in a few words."
              value={form?.values.description}
            />
            <NumberInput
              type="number"
              label="Product quantity"
              value={form?.values.quantity}
              {...form.getInputProps("quantity")}
            />
            {is_sale ? (
              <Checkbox
                checked
                label="Is item on sale?"
                onClick={toggle}
                {...form.getInputProps("is_sale")}
              />
            ) : (
              <Checkbox
                label="Is item on sale?"
                onClick={toggle}
                {...form.getInputProps("is_sale")}
              />
            )}
            {is_sale && (
              <NumberInput
                placeholder="0"
                label="Price on sale"
                value={form?.values.sale_price}
                {...form.getInputProps("sale_price")}
              />
            )}
            <NumberInput
              {...form.getInputProps("price")}
              value={form?.values.price}
              label="Product price"
              placeholder="0"
              required
            />

            <Select
              creatable
              label="Select one category"
              placeholder="Fruit"
              required
              data={["React", "Angular", "Vue", "Svelte"]}
              value={form?.values.category}
              {...form.getInputProps("category")}
            />
            <Button type="button" onClick={updateProduct}>
              Edit product
            </Button>
          </form>
        </Stack>
      </Modal>
    </>
  );
}
