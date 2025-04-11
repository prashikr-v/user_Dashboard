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

  export const Route = createFileRoute('/signin')({
    component: SignInPage,
  })
  export default function SignInPage() {
    const form = useForm({
      initialValues: {
        email: '',
        password: '',
      },
  
      validate: {
        email: (value: string) => (/^\S+@\S+$/.test(value) ? null : 'Invalid email'),
        password: (value: string | any[]) =>
          value.length < 6 ? 'Password must be at least 6 characters' : null,
      },
    });
  
    const handleSubmit = (values: typeof form.values) => {
      console.log('Sign In submitted:', values);
      // TODO: Authenticate user via API
    };
  
    return (
      <Card shadow="md" p="xl" radius="md" withBorder maw={400} mx="auto" mt="lg">
        <Title order={2} ta="center" mb="md">Sign In</Title>
        <form onSubmit={form.onSubmit(handleSubmit)}>
          <Stack>
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
            <Button type="submit" fullWidth mt="md">Sign In</Button>
          </Stack>
        </form>
        <Group justify="space-between" mt="md">
          <Button variant="subtle" size="sm" component="a" ml="80px" href="/forgotpassword">
            Forgot password?
          </Button>
          <Group gap="xs"ml="60px">
            <Text size="sm">No account?</Text>
            <Button variant="subtle" size="sm" component="a" href="/signup">
              Sign Up
            </Button>
          </Group>
        </Group>
      </Card>
    );
  }
  