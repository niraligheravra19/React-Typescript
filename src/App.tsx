
import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import StateRoute from './routes/StateRoute';
import ContextRoute from './routes/ContextRoute';
import { Data } from './types/dataTypes';
import ReduxRoute from './routes/ReduxRoute';

const App: React.FC = () => {
    const [data, setData] = useState<Data[]>([]);

    const handleAddOrUpdate = (newData: Data) => {
        if (newData.id) {
            setData((prev) =>
                prev.map((item) => (item.id === newData.id ? newData : item))
            );
        } else {
            const newId = data.length ? Math.max(...data.map((d) => d.id)) + 1 : 1;
            setData((prev) => [...prev, { ...newData, id: newId }]);
        }
    };

    const handleDelete = (id: number) => {
        setData((prev) => prev.filter((item) => item.id !== id));
    };

    return (
        <Router>
            <nav>
                <Link to="/state">State </Link> |
                <Link to="/context">Context</Link> | 
                <Link to="/redux">Redux</Link>
            </nav>
            <Routes>
                <Route
                    path="/state"
                    element={
                        <StateRoute
                            data={data}
                            onAddOrUpdate={handleAddOrUpdate}
                            onDelete={handleDelete}
                        />
                    }
                />
                <Route
                    path="/context"
                    element={
                        <ContextRoute
                          
        
                        />
                    }
                />
                 <Route
                    path="/redux"
                    element={
                        <ReduxRoute
                          
        
                        />
                    }
                />
            </Routes>
        </Router>
    );
};

export default App;
