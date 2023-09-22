import {
  Modal,
  Button,
  Stack,
  TextInput,
  PasswordInput,
  Divider,
} from "@mantine/core";
import { useForm } from "@mantine/form";
import { supabase } from "../../config";

function LoginModal({ opened, close }) {
  const form = useForm({
    initialValues: {
      email: "",
      password: "",
    },
    validate: {
      email: (value) => (/^\S+@\S+$/.test(value) ? null : "Invalid email"),
    },
  });

  const handleLogin = async (event) => {
    event.preventDefault();
    const { email, password } = form.values;
    try {
      let { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });
      if (error) {
        console.error("Greška pri prijavi:", error.message);
      } else {
        console.log("Uspješno prijavljeni:", data.user);
      }
    } catch (error) {
      console.error("Greška pri prijavi:", error.message);
    }
  };

  return (
    <>
      <Modal opened={opened} onClose={close} title="Prijavite se">
        <Stack spacing="xl">
          <form onSubmit={form.onSubmit((values) => console.log(values))}>
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
            <Divider my="sm" />
            <Button onClick={handleLogin} type="submit" radius="lg">
              Prijavite se
            </Button>
          </form>
        </Stack>
      </Modal>
    </>
  );
}

export default LoginModal;
