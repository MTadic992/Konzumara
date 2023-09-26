import {
  Modal,
  Button,
  Stack,
  TextInput,
  PasswordInput,
  Divider,
  Checkbox,
  Group,
} from "@mantine/core";
import { useForm, yupResolver } from "@mantine/form";
import { supabase } from "../../config";
import { REGISTER_SCHEMA } from "../schema";

function RegisterModal({ opened, close, loginOpened }) {
  const form = useForm({
    initialValues: {
      full_name: "",
      email: "",
      password: "",
      confirm_password: "",
      is_admin: false,
    },
    validate: yupResolver(REGISTER_SCHEMA),
  });

  const handleRegister = async () => {
    console.log(form.values);
    const { email, password } = form.values;
    let { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          full_name: form.values.full_name,
          is_admin: form.values.is_admin,
        },
      },
    });
    close();
    loginOpened(true);
  };

  return (
    <>
      <Modal opened={opened} onClose={close} title="Registriraj se">
        <Stack spacing="xl">
          <form onSubmit={form.onSubmit((values) => console.log(values))}>
            <TextInput
              radius="lg"
              label="Upišite Vaše ime i prezime:"
              placeholder="Vaše ime i prezime"
              required
              {...form.getInputProps("full_name")}
            />

            <TextInput
              radius="lg"
              value={form?.values.email}
              placeholder="Upišite email:"
              label="Upišite Vaš email:"
              required
              {...form.getInputProps("email")}
            />
            <PasswordInput
              radius="lg"
              value={form?.values.password}
              placeholder="Vaša lozinka"
              label="Upišite Vašu lozinku:"
              required
              {...form.getInputProps("password")}
            />
            <PasswordInput
              radius="lg"
              value={form?.values.password}
              placeholder="Vaša lozinka"
              label="Potvrdite Vašu lozinku:"
              required
              {...form.getInputProps("confirm_password")}
            />
            <Divider my="sm" />
            <Group>
              <Button type="submit" onClick={handleRegister} radius="lg">
                Registriraj se
              </Button>
              <Checkbox
                label="Admin"
                color="red"
                radius="xs"
                size="xs"
                value={form?.values.is_admin}
                {...form.getInputProps("is_admin")}
              />
            </Group>
          </form>
        </Stack>
      </Modal>
    </>
  );
}

export default RegisterModal;
