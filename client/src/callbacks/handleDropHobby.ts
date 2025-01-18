import { useCallback } from "react";
import toast from "react-hot-toast";
import axios from "axios";
import { Node, Edge } from "react-flow-renderer";

interface User {
  _id: string;
  username: string;
  age: number;
  hobbies: string[];
}

export const useHandleDropHobby = (
  users: User[],
  setUsers: React.Dispatch<React.SetStateAction<User[]>>,
  nodes: Node[],
  setNodes: React.Dispatch<React.SetStateAction<Node[]>>,
  setEdges: React.Dispatch<React.SetStateAction<Edge[]>>
) => {
  return useCallback(
    async (userId: string, hobby: string) => {
      const user = users.find((user) => user._id === userId);
      if (user && user.hobbies.includes(hobby)) {
        toast.error(`${hobby} is already added to the user!`);
        return;
      }
      try {
        const response = await axios.patch(`/users/${userId}/hobbies`, {
          hobby,
        });

        if (response.status === 200) {
          const updatedUser = await response.data;
          setUsers((prevUsers) =>
            prevUsers.map((user) => (user._id === userId ? updatedUser : user))
          );
          toast.success(`${hobby} added to the user!`);

          const userIndex = users.findIndex((user) => user._id === userId);
          const hobbyCount = nodes.filter((node) =>
            node.id.startsWith(`hobby-${userId}`)
          ).length;

          const hobbyNodeId = `hobby-${userId}-${hobby}-${Date.now()}`;
          const edgeId = `edge-${userId}-${hobby}-${Date.now()}`;

          const newHobbyNode = {
            id: hobbyNodeId,
            data: { label: hobby },
            position: {
              x: 400 + hobbyCount * 200,
              y: 100 + userIndex * 200,
            },
          };

          const newEdge = {
            id: edgeId,
            source: `user-${userId}`,
            target: hobbyNodeId,
            type: "smoothstep",
          };

          setNodes((prevNodes) => [...prevNodes, newHobbyNode]);
          setEdges((prevEdges) => [...prevEdges, newEdge]);
        } else {
          console.error("Failed to add hobby:", response.statusText);
        }
      } catch (error) {
        console.error("Error adding hobby:", error);
      }
    },
    [users, nodes, setUsers, setNodes, setEdges]
  );
};
