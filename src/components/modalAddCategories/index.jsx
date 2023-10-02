import { Modal, Button, TextInput, Select, Title, Stack } from "@mantine/core";
import { useForm, yupResolver } from "@mantine/form";

import { supabase } from "../../config";
import { ADD_CATEGORY } from "../schema";
import { useEffect, useState } from "react";

export default function AddCategory({ isOpened, onClose }) {
  const [category, setCategory] = useState([]);
  const form = useForm({
    initialValues: {
      name: "",
    },

    validate: yupResolver(ADD_CATEGORY),
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { data } = await supabase
      .from("categories")
      .select()
      .insert([
        {
          name: form.values.name,
        },
      ]);

    form.reset();
    onClose(false);
  };

  const getCategories = async () => {
    const { data } = await supabase.from("categories").select("*");
    setCategory(data);
  };
  useEffect(() => {
    getCategories();
  }, []);
  const data = category?.map((item) => item.name);

  return (
    <>
      <Modal opened={isOpened} onClose={() => onClose(false)} centered>
        <Title order={1}>Add new category</Title>
        <Stack justify="space-between">
          <form onSubmit={form.onSubmit((values) => console.log(values))}>
            <TextInput
              {...form.getInputProps("name")}
              value={form?.values.name}
              placeholder="Category name"
              label="Category name"
            />

            <Select
              creatable
              label="Find a category"
              placeholder="Piće"
              required
              data={data}
              value={form?.values.category}
              {...form.getInputProps("category")}
            />
            <Button mt={10} type="submit" onClick={handleSubmit}>
              Add a category
            </Button>
          </form>
        </Stack>
      </Modal>
    </>
  );
}
