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
  export const Route = createFileRoute('/2fa')({
    component: OTPVerificationPage,
  })

  export default function OTPVerificationPage() {
    const form = useForm({
      initialValues: {
        otp: '',
      },
  
      validate: {
        otp: (value: string) =>
          /^\d{6}$/.test(value) ? null : 'Enter a valid 6-digit code',
      },
    });
  
    const handleSubmit = (values: typeof form.values) => {
      console.log('OTP submitted:', values);
      // TODO: Call API to verify OTP
    };
  
    return (
      <Card shadow="md" p="xl" radius="md" withBorder maw={400} mx="auto" mt="lg">
        <Title order={2} ta="center" mb="md">Two-Factor Authentication</Title>
        <Text ta="center" size="sm" mb="md" c="dimmed">
          Enter the 6-digit code sent to your email or phone
        </Text>
        <form onSubmit={form.onSubmit(handleSubmit)}>
          <Stack>
            <TextInput
              label="Verification Code"
              placeholder="123456"
              maxLength={6}
              {...form.getInputProps('otp')}
            />
            <Button type="submit" fullWidth mt="md">Verify</Button>
          </Stack>
        </form>
  
        <Group justify="center" mt="md">
          <Text size="sm" c="dimmed">Didn’t get the code?</Text>
          <Button variant="subtle" size="sm" onClick={() => alert("Resend OTP")}>
            Resend
          </Button>
        </Group>
      </Card>
    );
  }
  