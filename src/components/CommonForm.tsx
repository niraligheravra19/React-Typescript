import React, { useEffect, useState } from "react";
import { Data } from "../types/dataTypes";

interface CommonFormProps {
    onSave: (data: Data) => void;
    selectedData: Data | null;
    onClearSelection: () => void;
}

const CommonForm: React.FC<CommonFormProps> = ({
    onSave,
    selectedData,
    onClearSelection,
}) => {
    const [formData, setFormData] = useState<Data>({
        id: 0,
        name: "",
        city: "",
        age: 0,
    });

    useEffect(() => {
        if (!selectedData) {
            setFormData({ id: 0, name: "", city: "", age: 0 });
        } else {
            setFormData(selectedData);
        }
    }, [selectedData]);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if(!formData.name || !formData.city || !formData.age){
            alert("Please fill all fields");
            return;
        }
        onSave(formData);
        setFormData({ id: 0, name: "", city: "", age: 0 });
        onClearSelection();
    };

    return (
        <form>
            <input
                type="text"
                placeholder="Name"
                value={formData.name ||''}
                onChange={(e) =>
                    setFormData({ ...formData, name: e.target.value })
                }required
            />
            <br />
            <br />
            <input
                type="text"
                placeholder="City"
                value={formData.city || ''}
                onChange={(e) =>
                    setFormData({ ...formData, city: e.target.value })
                }
                required
            />
            <br />
            <br />
            <input
                type="number"
                placeholder="Age"
                value={formData.age || ''}
                onChange={(e) =>
                    setFormData({ ...formData, age: Number(e.target.value) })
                }
                required
            />
            <br />
            <br />
            <button type="submit" onClick={handleSubmit}>
                {selectedData ? "Edit" : "Save"}
            </button>
            <br />
            <br />
        </form>
    );
};

export default CommonForm;






