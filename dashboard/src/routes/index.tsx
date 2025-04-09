import { createFileRoute } from '@tanstack/react-router'
import axios from 'axios';
import '../index.css'
import { useState, useEffect } from 'react'
import { BsThreeDots } from "react-icons/bs";
import { useInfiniteQuery } from '@tanstack/react-query'
import {
    Table,
    TextInput,
    Skeleton,
    Alert,
    Stack,
    Title,
    Button,
    Menu,
    Group,
} from '@mantine/core'
import { useNavigate } from '@tanstack/react-router'
import { useInView } from 'react-intersection-observer';
import { Forms } from '../components/form';

export const Route = createFileRoute('/')({
    component: HomePage,
})

export const axiosInstance = axios.create({
    baseURL: 'https://jsonplaceholder.typicode.com',
    headers: {
        'Content-Type': 'application/json',
    },
});

axiosInstance.interceptors.request.use(
    (config) => {
        localStorage.setItem('access_token', "tyty")
        const token = localStorage.getItem('access_token');
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => Promise.reject(error)
);

function useDebounce(value: string, delay: number) {
    const [debouncedValue, setDebouncedValue] = useState(value)
    useEffect(() => {
        const handler = setTimeout(() => {
            setDebouncedValue(value)
        }, delay)
        return () => clearTimeout(handler)
    }, [value, delay])
    return debouncedValue
}

export const fetchUsers = async () => {
    const { data } = await axiosInstance.get('https://jsonplaceholder.typicode.com/users');
    return data;
};
export const fetchUsersPaginated = async ({ pageParam = 1 }) => {
    const { data } = await axios.get(
        `https://jsonplaceholder.typicode.com/users?_limit=5&_page=${pageParam}`
    );
    return data;
};

const useUsers = () =>
    useInfiniteQuery({
        queryKey: ['users'],
        queryFn: fetchUsersPaginated,
        initialPageParam: 1,
        getNextPageParam: (lastPage, allPages) =>
            lastPage.length < 5 ? undefined : allPages.length + 1,
    });

export default function HomePage() {
    const navigate = useNavigate()
    const [searchTerm, setSearchTerm] = useState('')
    const debouncedSearch = useDebounce(searchTerm, 500)
    const [formOpened, setFormOpened] = useState(false);
    const [formMode, setFormMode] = useState<'add' | 'edit'>('add');
    const [selectedUser, setSelectedUser] = useState<any>(null);

    const {
        data,
        fetchNextPage,
        hasNextPage,
        isFetchingNextPage,
        isLoading,
        isError,
    } = useUsers();

    const { ref, inView } = useInView();

    useEffect(() => {
        if (inView && hasNextPage) {
            fetchNextPage();
        }
    }, [inView, hasNextPage, fetchNextPage]);

    const handleEdit = (user: any) => {
        setSelectedUser(user);
        setFormMode('edit');
        setFormOpened(true);
    };

    const handleAdd = () => {
        setSelectedUser({
            name: '',
            username: '',
            email: '',
            phone: '',
            website: '',
            address: { street: '', city: '' },
            company: { name: '' }
        });
        setFormMode('add');
        setFormOpened(true);
    };

    if (isError) {
        return <Alert color="red">Failed to load users</Alert>
    }

    if (isLoading) {
        return (
            <Stack p="md" m="30px">
                <Skeleton height={20} mb="sm" />
                <Skeleton height={20} mb="sm" />
                <Skeleton height={20} />
            </Stack>
        )
    }

    const filteredUsers =
        data?.pages
            .flat()
            .filter((user) =>
                user.name.toLowerCase().includes(debouncedSearch.toLowerCase())
            ) ?? [];

    return (
        <Stack p="md" m="30px">
            <Title order={1}>Users</Title>
            <TextInput
                placeholder="Search users..."
                value={searchTerm}
                onChange={e => setSearchTerm(e.currentTarget.value)}
            />

            <Table highlightOnHover>
                <Table.Thead>
                    <Table.Tr>
                        <Table.Th>Name</Table.Th>
                        <Table.Th>Email</Table.Th>
                        <Table.Th>Actions</Table.Th>
                    </Table.Tr>
                </Table.Thead>
                <Table.Tbody>
                    {filteredUsers.map((user) => (
                        <Table.Tr
                            key={user.id}
                            onClick={() => {
                                navigate({ to: '/user/$id', params: { id: `${user.id}` } })
                            }}
                            style={{ cursor: 'pointer' }}
                        >
                            <Table.Td>{user.name}</Table.Td>
                            <Table.Td>{user.email}</Table.Td>
                            <Table.Td>
                                <Menu>
                                    <Menu.Target>
                                        <Button onClick={(e) => e.stopPropagation()}>
                                            <BsThreeDots />
                                        </Button>
                                    </Menu.Target>
                                    <Menu.Dropdown>
                                        <Menu.Item
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                handleEdit(user);
                                            }}
                                        >
                                            Edit
                                        </Menu.Item>
                                    </Menu.Dropdown>
                                </Menu>
                            </Table.Td>
                        </Table.Tr>
                    ))}
                </Table.Tbody>
            </Table>

            {/* Infinite Scroll Trigger Element */}
            <div ref={ref} />
            {isFetchingNextPage && <Skeleton height={30} mt="md" />}

            <Group>
                <Button onClick={handleAdd} variant="light" size="md" ml={580} radius="md">
                    Add User
                </Button>
            </Group>

            <Forms
                initialValues={selectedUser}
                mode={formMode}
                opened={formOpened}
                onClose={() => setFormOpened(false)}
                onSubmit={(data) => {
                    console.log('Submitted:', data);
                    setFormOpened(false);
                }}
            />
        </Stack>
    )
}
