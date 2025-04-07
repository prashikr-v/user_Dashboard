import { useEffect } from "react";
import { Button, Modal, Paper, TextInput, Title } from "@mantine/core";

import { useForm } from "@mantine/form";


type FormProps = {
    initialValues: {
      name: string;
      username: string;
      email: string;
      phone: string;
      website: string;
      address: {
        street: string;
        city: string;
      };
      company: {
        name: string;
      };
    };
    mode: "add" | "edit";
    onSubmit: (data: any) => void;
    opened: boolean;
    onClose: () => void;
  };
  
  export const Forms = ({ initialValues, mode, onSubmit, opened, onClose }: FormProps) => {
    const form = useForm({
      initialValues: {
        name: "",
        username: "",
        email: "",
        phone: "",
        website: "",
        address: {
          street: "",
          city: "",
        },
        company: {
          name: "",
        },
      },
      validate: {
        name: (value: string | any[]) => (value.length < 2 ? "Name is too short" : null),
        email: (value: string) => (/^\S+@\S+$/.test(value) ? null : "Invalid email"),
        phone: (value: string | any[]) => (value.length < 10 ? "Invalid phone" : null),
        website: (value: string | any[]) => (value.length < 3 ? "Invalid website" : null),
      },
    });
  
    useEffect(() => {
      if (opened) {
        form.setValues(initialValues);
      } else {
        form.reset();
      }
    }, [opened, initialValues]);
  
    const handleSubmit = (values: typeof form.values) => {
      onSubmit(values);
      form.reset();
      onClose();
    };
  
    return (
      <Modal opened={opened} onClose={onClose} centered>
        <Paper withBorder shadow="md" p="lg" radius="md">
          <Title order={2} mb="md">
            {mode === "edit" ? "Edit User" : "Add User"}
          </Title>
  
          <form onSubmit={form.onSubmit(handleSubmit)}>
            <TextInput label="Name" {...form.getInputProps("name") }   mb="sm" />
            <TextInput label="Username" {...form.getInputProps("username")} mb="sm" />
            <TextInput label="Email" {...form.getInputProps("email")} mb="sm" />
            <TextInput label="Phone" {...form.getInputProps("phone")} mb="sm" />
            <TextInput label="Website" {...form.getInputProps("website")} mb="sm" />
            <TextInput label="Street" {...form.getInputProps("address.street")} mb="sm" />
            <TextInput label="City" {...form.getInputProps("address.city")} mb="sm" />
            <TextInput label="Company Name" {...form.getInputProps("company.name")} mb="sm" />
  
            <Button type="submit" fullWidth>
              {mode === "edit" ? "Update" : "Add"}
            </Button>
          </form>
        </Paper>
      </Modal>
    );
  };
  