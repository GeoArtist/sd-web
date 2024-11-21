import {useState} from 'react';


export function useToogle(defaultValue: boolean ): [boolean, (value: boolean) => void] {
    const [value, setValue] = useState(defaultValue);

    function toogleValue(value: boolean){
        setValue(currentValue => typeof value === 'boolean' ? value : !currentValue);

    }
    return [value, toogleValue];
}