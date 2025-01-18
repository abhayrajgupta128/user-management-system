import React, { useState } from 'react';
import { useDrag } from 'react-dnd';
import { Link } from 'react-router-dom';

interface SidebarProps {
    hobbies: string[];
}

const Sidebar: React.FC<SidebarProps> = ({ hobbies }) => {


    const [search, setSearch] = useState('');

    const uniqueHobbies = Array.from(new Set(hobbies));

    const filteredHobbies = uniqueHobbies.filter((hobby) =>
        hobby.toLowerCase().includes(search.toLowerCase())
    );

    return (
        <div style={{ width: '250px', padding: '10px', borderRight: '1px solid #ccc' }}>
            <Link to={`/users`}>
              <button>Manage Users</button>
            </Link>
            <h3>Hobbies</h3>
            <input
                type="text"
                placeholder="Search hobbies..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                style={{ width: '95%', marginBottom: '10px', padding: '5px' }}
            />
            <div>
                {filteredHobbies.map((hobby, index) => (
                    <DraggableHobby key={index} hobby={hobby} />
                ))}
            </div>
        </div>
    );
};

const DraggableHobby: React.FC<{ hobby: string }> = ({ hobby }) => {
    const [{ isDragging }, drag] = useDrag(() => ({
        type: 'HOBBY',
        item: { hobby },
        collect: (monitor) => ({
            isDragging: monitor.isDragging(),
        }),
    }));

    return (
        <div
            ref={drag}
            style={{
                padding: '8px',
                marginBottom: '5px',
                backgroundColor: isDragging ? '#ddd' : '#f0f0f0',
                border: '1px solid #ccc',
                cursor: 'grab',
            }}
        >
            {hobby}
        </div>
    );
};

export default Sidebar;
