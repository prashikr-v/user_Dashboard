import { createFileRoute } from '@tanstack/react-router'
import axios from 'axios';
import '../index.css'
import { useState, useEffect, Key, } from 'react'
import { BsThreeDots } from "react-icons/bs";
import { useQuery } from '@tanstack/react-query'
import {
    Table,
    TextInput,
    Pagination,
    Skeleton,
    Alert,
    Stack,
    Title,
    Button,
    Menu,
    Group,
} from '@mantine/core'
import { useNavigate } from '@tanstack/react-router'
import { Forms } from '../components/form';
export const Route = createFileRoute('/')({
    component: HomePage,
})
export const fetchUsers = async () => {
    const { data } = await axios.get('https://jsonplaceholder.typicode.com/users');
    return data;
};


function useDebounce(value: string, delay: number) {
    const [debouncedValue, setDebouncedValue] = useState(value)

    useEffect(() => {
        const handler = setTimeout(() => {
            setDebouncedValue(value)
        }, delay)

        return () => {
            clearTimeout(handler)
        }
    }, [value, delay])

    return debouncedValue
}

export default function HomePage() {
    const navigate = useNavigate()
    const [searchTerm, setSearchTerm] = useState('')
    const debouncedSearch = useDebounce(searchTerm, 500)
    const [activePage, setActivePage] = useState(1)
    const itemsPerPage = 5
    const [formOpened, setFormOpened] = useState(false);
    const [formMode, setFormMode] = useState<'add' | 'edit'>('add');
    const [selectedUser, setSelectedUser] = useState<any>(null);

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


    const { data, isLoading, isError } = useQuery({
        queryKey: ['users'],
        queryFn: fetchUsers,
    })

    const filteredUsers = data?.filter((user: { name: string; }) =>
        user.name.toLowerCase().includes(debouncedSearch.toLowerCase())
    ) || []

    const paginatedUsers = filteredUsers.slice(
        (activePage - 1) * itemsPerPage,
        activePage * itemsPerPage
    )

    if (isError) {
        return <Alert color="red">Failed to load users</Alert>
    }
    if (isLoading) {
        return (
            <> <div>
                <Skeleton height={20} m="20px" />
                <Skeleton height={20} /><Skeleton height={20} />

            </div> </>
        )
    }
    return (

        <Stack p="md"m="30px" >
            <>
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

                        </Table.Tr>
                    </Table.Thead>
                    <Table.Tbody>
                        {paginatedUsers.map((user: { id: Key; name: string; email: string; }) => (
                            <Table.Tr
                                key={user.id}
                                onClick={() => { navigate({ to: '/user/$id', params: { id: `${user.id}` } }) }}
                                style={{ cursor: 'pointer' }}
                            >

                                <Table.Td>{user.name}</Table.Td>
                                <Table.Td>{user.email}</Table.Td>
                                <Table.Td> <Menu >
                                    <Menu.Target>
                                        <Button onClick={(e) => e.stopPropagation()}><BsThreeDots /></Button>
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
                                </Menu></Table.Td>
                            </Table.Tr>
                        ))}
                    </Table.Tbody>
                </Table>

                <Pagination
                    value={activePage}
                    onChange={setActivePage}
                    total={Math.ceil(filteredUsers.length / itemsPerPage)}
                    mt="md"
                    ml="550px"
                />
                <Group>
                <Button onClick={handleAdd}  variant="light" size="md" ml={580} radius="md" >Add User</Button>
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

            </>

        </Stack>
    )
}