import { useState, useRef, createRef } from 'react';
import styles from './style.module.scss';
import PropTypes from 'prop-types';

/**
 * The Component expects an options array of objects with the following properties: { label, value }
 * The component returns the selected object via onChange method
 *
 */
const CustomSelect = ({ label, options, error, onChange }) => {
  const [selected, setSelected] = useState(null);
  const elementsRef = useRef(options.map(() => createRef()));

  const handleSelect = option => {
    setSelected(option.value);
    onChange(option);
  };

  return (
    <div className={styles.custom_select_wrapper}>
      <label id="custom-select" className={styles.label}>{label}</label>

      <ul id="custom-select" className={styles.custom_select_container} aria-labelledby="custom-select">
        {options.map((option, idx) => (
          <li key={option.value}>
            <button
              id={option.label}
              ref={elementsRef.current[idx]}
              type="button"
              className={`btn${selected === option.value ? ` ${styles.selected}` : ''}`}
              onClick={() => handleSelect(option)}
              aria-label={option.label}
            >
              {option.label}
            </button>
          </li>
        ))}
      </ul>
      {error && <p data-cy="select-error" aria-invalid="true" className="error">{error}</p>}
    </div>
  );
};

export default CustomSelect;

CustomSelect.propTypes = {
  label: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  options: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
      value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
    }),
  ).isRequired,
};
