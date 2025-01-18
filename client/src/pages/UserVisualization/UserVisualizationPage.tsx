import React from 'react';
import ReactFlow, { MiniMap, Controls, Background } from 'react-flow-renderer';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import Sidebar from '../../components/SideBar';
import DroppableNode from '../../components/DroppableNode';
import { Toaster } from 'react-hot-toast';
import { useUsers } from '../../hooks/useUsers';
import { useHandleDropHobby } from '../../callbacks/handleDropHobby';
import './UserVisualizationPage.css';

const UserVisualization: React.FC = () => {
    const { users, nodes, edges, hobbies, loading ,setUsers, setNodes, setEdges} = useUsers();
    const handleDropHobby = useHandleDropHobby(users, setUsers, nodes, setNodes, setEdges);

    if (loading) return <div>Loading...</div>;

    return (
        <div className="user-visualization-container">
            <DndProvider backend={HTML5Backend}>
                <div className="main-content">
                    <Sidebar hobbies={hobbies} />
                    <div className="react-flow-container">
                        <ReactFlow
                            nodes={nodes.map((node) => {
                                if (node.id.startsWith('user-')) {
                                    return {
                                        ...node,
                                        data: {
                                            ...node.data,
                                            label: (
                                                <DroppableNode
                                                    node={node}
                                                    onDropHobby={handleDropHobby}
                                                />
                                            ),
                                        },
                                    };
                                }
                                return node;
                            })}
                            edges={edges}
                            fitView
                        >
                            <Controls />
                            <Background />
                            <MiniMap />
                        </ReactFlow>
                    </div>
                </div>
            </DndProvider>
            <Toaster position="top-right" />
        </div>
    );
};

export default UserVisualization;
