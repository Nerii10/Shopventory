import { useEffect, useRef, useState } from "react";
import "../styles/Input.css";
import { motion, scale } from "framer-motion";

export default function Input({
  type,
  children,
  style,
  width,
  height,
  value,
  setValue,
  onClick,
  search,
  disabled,
  required,
  options,
}) {
  const sizing = { width, height };

  const sizingStyle = {
    "--width": `${sizing.width}`,
    "--height": `${sizing.height}`,
  };

  if (type === "button" || type === "submit") {
    return (
      <Button
        disabled={disabled}
        required={required}
        type={type}
        onClick={onClick}
        style={style}
        sizingStyle={sizingStyle}
      >
        {children}
      </Button>
    );
  }

  if (type === "text" || type === "number") {
    return (
      <Char
        disabled={disabled}
        required={required}
        type={type}
        style={style}
        sizingStyle={sizingStyle}
        value={value || ""}
        setValue={setValue}
        children={children}
      />
    );
  }

  if (type === "date") {
    return (
      <Date
        disabled={disabled}
        required={required}
        type={type}
        setValue={setValue}
        value={value}
        style={style}
        sizingStyle={sizingStyle}
      >
        {children}
      </Date>
    );
  }

  if (type === "select") {
    return (
      <Select
        options={options}
        disabled={disabled}
        required={required}
        search={search}
        type={type}
        setValue={setValue}
        value={value}
        style={style}
        sizingStyle={sizingStyle}
      >
        {children}
      </Select>
    );
  }

  return null;
}

function Button({
  onClick,
  required,
  disabled,
  type,
  style,
  children,
  sizingStyle,
}) {
  return (
    <div className="input_container" style={sizingStyle}>
      <motion.button
        whileTap={{ scale: 0.95 }}
        whileHover={{ scale: 1.05 }}
        required={required}
        disabled={disabled}
        type={type}
        style={style}
        className="input button"
        onClick={() => {
          onClick();
        }}
        transition={{ duration: 0.25, ease: "circOut" }}
      >
        {children}
      </motion.button>
    </div>
  );
}

function Char({
  required,
  disabled,
  type,
  style,
  children,
  sizingStyle,
  value,
  setValue,
}) {
  return (
    <div className="input_container" style={sizingStyle}>
      <p className={value != "" ? "input_label hidden" : "input_label"}>
        {children}
      </p>
      <input
        required={required}
        disabled={disabled}
        value={value}
        onChange={(e) => setValue(e.target.value)}
        type={type}
        style={style}
        className="input text"
      />
    </div>
  );
}

function Date({
  required,
  disabled,
  type,
  style,
  children,
  sizingStyle,
  value,
  setValue,
}) {
  return (
    <div className="input_container" style={sizingStyle}>
      <p className={value != "" ? "input_label hidden" : "input_label"}>
        {children}
      </p>
      <input
        required={required}
        disabled={disabled}
        value={value}
        onChange={(e) => setValue(e.target.value)}
        type={type}
        style={style}
        className="input date"
      />
    </div>
  );
}

function Select({
  required = false,
  options = [],
  disabled = false,
  style = {},
  children,
  sizingStyle = {},
  value,
  setValue,
  search = false,
}) {
  const [searchTerm, setSearchTerm] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef(null);

  useEffect(() => {
    if (!search) return;

    const sel = options.find((opt) => opt.code === value);

    if (sel) {
      setSearchTerm(sel.label);
    } else {
      setSearchTerm(searchTerm);
    }
  }, [value, options, search]);

  const filteredOptions = search
    ? options.filter((opt) =>
        opt.label.toLowerCase().includes(searchTerm.toLowerCase())
      )
    : [];

  useEffect(() => {
    function handleClickOutside(event) {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target)
      ) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  if (search) {
    return (
      <div className="input_container" style={sizingStyle} ref={containerRef}>
        <p className={searchTerm !== "" ? "input_label hidden" : "input_label"}>
          {children}
        </p>

        <input
          required={required}
          disabled={disabled}
          type="text"
          className="input text"
          style={style}
          value={searchTerm}
          onChange={(e) => {
            const newTerm = e.target.value;
            setSearchTerm(newTerm);
            setIsOpen(true);
            if (newTerm === "") {
              setValue("");
            }
          }}
          onFocus={() => setIsOpen(true)}
        />

        <div
          className={
            !isOpen || filteredOptions.length === 0
              ? "input_search_container_hidden"
              : "input_search_container"
          }
        >
          {filteredOptions.map((opt) => (
            <p
              key={opt.value}
              className="input_search_input"
              onClick={() => {
                setValue(opt);
                setSearchTerm(opt.label);
                setIsOpen(false);
              }}
            >
              {opt.label.split("/").map((labelPart, idx) => (
                <span key={idx} style={{ display: "block", width: "100%" }}>
                  {labelPart}
                </span>
              ))}
            </p>
          ))}
        </div>
      </div>
    );
  }

  // Tryb standardowy <select>
  return (
    <div className="input_container" style={sizingStyle}>
      <p className={value !== "" ? "input_label hidden" : "input_label"}>
        {children}
      </p>

      <select
        required={required}
        disabled={disabled}
        style={style}
        className="input select"
        value={value}
        onChange={(e) => {
          setValue(e.target.value);
        }}
      >
        <option value="" disabled hidden>
          {children}
        </option>

        {options.map((opt) => (
          <option key={opt.value} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>
    </div>
  );
}
