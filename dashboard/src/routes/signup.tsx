import { createFileRoute } from '@tanstack/react-router'
import {
    Card,
    TextInput,
    PasswordInput,
    Button,
    Title,
    Stack,
    Group,
    Text,
  } from '@mantine/core';
  import { useForm } from '@mantine/form';
  
  export const Route = createFileRoute('/signup')({
    component: SignUpPage,
  })
  export default function SignUpPage() {
    const form = useForm({
      initialValues: {
        name: '',
        email: '',
        password: '',
        confirmPassword: '',
      },
  
      validate: {
        name: (value: string | any[]) => (value.length < 2 ? 'Name must be at least 2 characters' : null),
        email: (value: string) => (/^\S+@\S+$/.test(value) ? null : 'Invalid email'),
        password: (value: string | any[]) =>
          value.length < 6 ? 'Password must be at least 6 characters' : null,
        confirmPassword: (value: any, values: { password: any; }) =>
          value !== values.password ? 'Passwords do not match' : null,
      },
    });
  
    const handleSubmit = (values: typeof form.values) => {
      console.log('Form submitted:', values);
      // TODO: Call API or mock a success flow
    };
  
    return (
      <Card shadow="md" p="xl" radius="md" withBorder maw={400} mx="auto" mt="lg">
        <Title order={2} ta="center" mb="md">Create Account</Title>
        <form onSubmit={form.onSubmit(handleSubmit)}>
          <Stack>
            <TextInput
              label="Name"
              placeholder="Your name"
              {...form.getInputProps('name')}
            />
            <TextInput
              label="Email"
              placeholder="you@example.com"
              {...form.getInputProps('email')}
            />
            <PasswordInput
              label="Password"
              placeholder="Your password"
              {...form.getInputProps('password')}
            />
            <PasswordInput
              label="Confirm Password"
              placeholder="Confirm your password"
              {...form.getInputProps('confirmPassword')}
            />
            <Button type="submit" fullWidth mt="md">Sign Up</Button>
          </Stack>
        </form>
        <Group justify="center" mt="md">
          <Text size="sm">Already have an account?</Text>
          <Button variant="subtle" size="sm" component="a" href="/signin">
            Sign In
          </Button>
        </Group>
      </Card>
    );
  }
  
