import { useState, useRef, useEffect } from "react";
import { RiArrowDownSLine } from "react-icons/ri"
import "./CustomSelect.css";

function CustomSelect({ options, value, onChange, placeholder }) {
  const [isOpen, setIsOpen] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (ref.current && !ref.current.contains(e.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSelect = (option) => {
    onChange(option.value);  // 🔥 Mandamos solo el value simple ("all", "newest", etc.)
    setIsOpen(false);
  };

  // Buscar el objeto de la opción actual
  const selectedOption = options.find((option) => option.value === value);

  return (
    <div onClick={() => setIsOpen(!isOpen)} className="custom-select" ref={ref}>
      <div className="custom-select-header" >
        <span>{selectedOption ? selectedOption.label : placeholder || "Seleccionar"}</span>
        <RiArrowDownSLine className={`chevron ${isOpen ? "rotate" : ""}`} />
      </div>
      {isOpen && (
        <ul className="custom-select-options">
          {options.map((option) => (
            <li
              key={option.value}
              className={`option ${value === option.value ? "selected" : ""}`}
              onClick={() => handleSelect(option)}
            >
              {option.label}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default CustomSelect;
