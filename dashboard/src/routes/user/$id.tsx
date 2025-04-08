import { createFileRoute } from '@tanstack/react-router'
export const Route = createFileRoute('/user/$id')({
  component: UserDetails,
})
import { useParams } from '@tanstack/react-router';
import { useQuery } from '@tanstack/react-query';
import { Card, Loader, Text } from '@mantine/core';
import { fetchUsers } from '..';

// const fetch = async () => {
//   const { data } = await axios.get('https://jsonplaceholder.typicode.com/users');
//   return data;
// };

export default function UserDetails() {
  const { id } = useParams({ strict: false });
  const { data, isLoading, isError } = useQuery({
    queryKey: ['users'],
    queryFn: fetchUsers,
  });

  const user = data?.find((u: any) => u.id === Number(id));

  if (isLoading) return <Loader my="lg" />;
  if (isError || !user) return <Text c="red">User not found.</Text>;

  return (
    <Card shadow="sm" padding="lg" radius="md" withBorder m="200px">
      <Text >Name : {user.name}</Text>
      <Text>Email: {user.email}</Text>
      <Text>Phone: {user.phone}</Text>
      <Text>Website: {user.website}</Text>
      <Text>Company: {user.company?.name}</Text>
      <Text>Address: {user.address?.street}, {user.address?.city}</Text>
    </Card>
  );
}
