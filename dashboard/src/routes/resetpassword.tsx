import { createFileRoute } from '@tanstack/react-router'
import {
    Card,
    PasswordInput,
    Button,
    Title,
    Stack,
    Group,
    Text,
  } from '@mantine/core';
  import { useForm } from '@mantine/form';
  
  export const Route = createFileRoute('/resetpassword')({
    component: ResetPasswordPage,
  })
  export default function ResetPasswordPage() {
    const form = useForm({
      initialValues: {
        password: '',
        confirmPassword: '',
      },
  
      validate: {
        password: (value: string | any[]) =>
          value.length >= 6 ? null : 'Password must be at least 6 characters',
        confirmPassword: (value: any, values: { password: any; }) =>
          value === values.password ? null : 'Passwords do not match',
      },
    });
  
    const handleSubmit = (values: typeof form.values) => {
      console.log('Resetting password:', values);
      // TODO: Send to API with token/OTP context
    };
  
    return (
      <Card shadow="md" p="xl" radius="md" withBorder maw={400} mx="auto" mt="lg">
        <Title order={2} ta="center" mb="md">Reset Password</Title>
        <form onSubmit={form.onSubmit(handleSubmit)}>
          <Stack>
            <PasswordInput
              label="New Password"
              placeholder="••••••••"
              {...form.getInputProps('password')}
            />
            <PasswordInput
              label="Confirm Password"
              placeholder="••••••••"
              {...form.getInputProps('confirmPassword')}
            />
            <Button type="submit" fullWidth mt="md">Reset Password</Button>
          </Stack>
        </form>
  
        <Group justify="center" mt="md">
          <Text size="sm">Back to</Text>
          <Button variant="subtle" size="sm" component="a" href="/signin">
            Sign In
          </Button>
        </Group>
      </Card>
    );
  }
  
