import { useState, useEffect } from 'react';
import { Node, Edge } from 'react-flow-renderer';
import axios from 'axios';

interface User {
    _id: string;
    username: string;
    age: number;
    hobbies: string[];
}

export const useUsers = () => {
    const [users, setUsers] = useState<User[]>([]);
    const [loading, setLoading] = useState(true);
    const [hobbies, setHobbies] = useState<string[]>([]);
    const [nodes, setNodes] = useState<Node[]>([]);
    const [edges, setEdges] = useState<Edge[]>([]);

    useEffect(() => {
        const fetchUsers = async () => {
            setLoading(true);
            try {
                const response = await axios.get(`/users`);
                const fetchedUsers: User[] = await response.data.users;
                setUsers(fetchedUsers);

                const userNodes = fetchedUsers.map((user, index) => ({
                    id: `user-${user._id}`,
                    type: 'default',
                    data: { label: `${user.username} (Age: ${user.age})` },
                    position: { x: 300, y: 200 * index },
                    connectable: true
                }));

                const hobbyNodes: Node[] = [];
                const userHobbyEdges: Edge[] = [];
                const Hobbies: string[] = [];

                fetchedUsers.forEach((user, userIndex) => {
                    user.hobbies.forEach((hobby, hobbyIndex) => {
                        const hobbyId = `hobby-${user._id}-${hobbyIndex}`;

                        Hobbies.push(hobby);

                        hobbyNodes.push({
                            id: hobbyId,
                            data: { label: hobby },
                            position: {
                                x: 400 + hobbyIndex * 200,
                                y: 100 + userIndex * 200,
                            },
                        });

                        userHobbyEdges.push({
                            id: `edge-${user._id}-${hobbyId}`,
                            source: `user-${user._id}`,
                            target: hobbyId,
                            type: 'smoothstep',
                        });
                    });
                });

                setNodes([...userNodes, ...hobbyNodes]);
                setEdges(userHobbyEdges);
                setHobbies(Hobbies);
            } catch (error) {
                console.error('Error fetching users:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchUsers();
    }, []);

    return { users, nodes, edges, hobbies, loading, setUsers, setNodes, setEdges };
};
