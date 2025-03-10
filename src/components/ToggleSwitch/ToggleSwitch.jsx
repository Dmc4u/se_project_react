import { useContext } from "react";
import "./ToggleSwitch.css";
import CurrentTemperatureUnitContext from "../contexts/CurrentTemperatureUnitContext";

export default function ToggleSwitch({ className }) {
    const { currentTemperatureUnit, handleToggleSwitchChange } = useContext(CurrentTemperatureUnitContext);

    return (
        <label className={`toggle-switch ${className}`}>
            <input 
                onChange={handleToggleSwitchChange} 
                type="checkbox" 
                className="toggle-switch__checkbox" 
                checked={currentTemperatureUnit === 'C'}
            />
            <span className="toggle-switch__circle"></span>
            <span className="toggle-switch__text toggle-switch__text__F">F</span>
            <span className="toggle-switch__text toggle-switch__text__C">C</span>
        </label>
    );
}