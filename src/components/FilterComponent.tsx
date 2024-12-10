import React from "react";

type FilterComponentProps = {
    fields: string[];
    uniqueValues: string[];
    onFieldChange: (field: string) => void;
    onValueChange: (value: string) => void;
    onFilter: () => void;
    onShowAll: () => void;
};

const FilterComponent: React.FC<FilterComponentProps> = ({
    fields,
    uniqueValues,
    onFieldChange,
    onValueChange,
    onFilter,
    onShowAll,
}) => {
    return (
        <div>
            <label htmlFor="select-field">Select Field</label>
            <select onChange={(e) => onFieldChange(e.target.value)}>
                <option value="">Select Field</option>
                {fields.map((field) => (
                    <option key={field} value={field}>
                        {field}
                    </option>
                ))}
            </select>
            <br/><br/>
            <label htmlFor="select-uniqueValue">Select Unique Value</label>
            <select onChange={(e) => onValueChange(e.target.value)}>
                <option value="">Select Value</option>
                {uniqueValues.map((value) => (
                    <option key={value} value={value}>
                        {value}
                    </option>
                ))}
            </select>
            <button onClick={onFilter}>Filter</button>
            <button onClick={onShowAll}>Show All</button>
        </div>
    );
};

export default FilterComponent;
