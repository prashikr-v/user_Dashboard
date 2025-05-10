import { createFileRoute } from '@tanstack/react-router'
import {
  Card,
  TextInput,
  Button,
  Title,
  Stack,
  Group,
  Text,
} from '@mantine/core';
import { useForm } from '@mantine/form';

export const Route = createFileRoute('/forgotpassword')({
  component: ForgotPasswordPage,
})
export default function ForgotPasswordPage() {
  const form = useForm({
    initialValues: {
      email: '',
    },

    validate: {
      email: (value: string) =>
        /^\S+@\S+$/.test(value) ? null : 'Enter a valid email address',
    },
  });

  const handleSubmit = (values: typeof form.values) => {
    console.log('Forgot password request:', values);
    // TODO: Call API to send reset email or OTP
  };

  return (
    <Card shadow="md" p="xl" radius="md" withBorder maw={400} mx="auto" mt="lg">
      <Title order={2} ta="center" mb="md">Forgot Password</Title>
      <form onSubmit={form.onSubmit(handleSubmit)}>
        <Stack>
          <TextInput
            label="Email"
            placeholder="you@example.com"
            {...form.getInputProps('email')}
          />
          <Button type="submit" fullWidth mt="md">Send Reset Link</Button>
        </Stack>
      </form>

      <Group justify="center" mt="md">
        <Text size="sm">Remember your password?</Text>
        <Button variant="subtle" size="sm" component="a" href="/signin">
          Sign In
        </Button>
      </Group>
    </Card>
  );
}

