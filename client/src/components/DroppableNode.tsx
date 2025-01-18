import { useDrop } from 'react-dnd';
import { Node } from 'react-flow-renderer';

interface DroppableNodeProps {
    node: Node;
    onDropHobby: (userId: string, hobby: string) => void;
}

const DroppableNode: React.FC<DroppableNodeProps> = ({ node, onDropHobby }) => {
    const [{ isOver }, drop] = useDrop(() => ({
        accept: 'HOBBY',
        drop: (item: { hobby: string }) => {
            onDropHobby(node.id.replace('user-', ''), item.hobby);
        },
        collect: (monitor) => ({
            isOver: !!monitor.isOver(),
        }),
    }));

    return (
        <div
            ref={drop}
            style={{
                border: isOver ? '2px dashed #4caf50' : '#ddd',
                padding: '5px',
                borderRadius: '4px',
                backgroundColor: isOver ? '#f0fff4' : 'white',
                cursor: 'pointer',
            }}
        >
            {node.data.label}
        </div>
    );
};

export default DroppableNode;