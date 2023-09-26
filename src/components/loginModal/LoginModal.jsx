import {
  Modal,
  Button,
  Stack,
  TextInput,
  PasswordInput,
  Divider,
} from "@mantine/core";
import { useForm, yupResolver } from "@mantine/form";
import { supabase } from "../../config";
import { LOGIN_SCHEMA } from "../schema";
import { useNavigate } from "react-router-dom";
import React from "react";
import { AuthContext } from "../../context/AuthProvider";

function LoginModal({ opened, close, user }) {
  const navigate = useNavigate();

  const { signIn } = React.useContext(AuthContext);

  const form = useForm({
    initialValues: {
      email: "",
      password: "",
    },
    validate: yupResolver(LOGIN_SCHEMA),
  });

  const handleLogin = async (event) => {
    event.preventDefault();
    const { email, password } = form.values;

    signIn(email, password);
    // try {
    //   let { data, error } = await supabase.auth.signInWithPassword({
    //     email,
    //     password,
    //   });
    //   // console.log(data);
    //   // if (!data.user.user_metadata.is_admin) {
    //   //   navigate("/admin");
    //   // }
    //   if (error) {
    //     console.error("Greška pri prijavi:", error.message);
    //   } else {
    //     console.log("Uspješno prijavljeni:", data.user);
    //   }
    // } catch (error) {
    //   console.error("Greška pri prijavi:", error.message);
    // }

    close();
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
