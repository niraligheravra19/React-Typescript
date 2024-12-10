import React from "react";

type Data = {
    id: number;
    name: string;
    city: string;
    age: number;
};

type DataTableProps = {
    data: Data[];
    onEdit: (id: number) => void;
    onDelete: (id: number) => void;
};

const DataTable: React.FC<DataTableProps> = ({ data, onEdit, onDelete }) => {
    return (
        <table border={1}>
            <thead>
                <tr>
                    
                    <th>Name</th>
                    <th>City</th>
                    <th>Age</th>
                  
                </tr>
            </thead>
            <tbody>
                {data.map((item) => (
                    <tr key={item.id}>
                       
                        <td>{item.name}</td>
                        <td>{item.city}</td>
                        <td>{item.age}</td>
                       
                    </tr>
                ))}
            </tbody>
        </table>
    );
};

export default DataTable;
