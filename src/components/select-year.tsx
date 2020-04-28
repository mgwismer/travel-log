import React, { useCallback } from 'react';
import Select from 'react-select';

type OwnProps = {
    year: string;
    changeYear: (year: string) => {};
}

export const SelectYear: React.FC<OwnProps> = ({ year, changeYear }) => {
    const years = [{value: '1964', label: '1964'}, {value: '1980', label: '1980'}]
    const handleYearChange = useCallback((event) => {
        changeYear(event.value)
    }, [])

    return (
        <Select
            multi={false}
            options={years}
            onChange={handleYearChange}
        />
    )
}