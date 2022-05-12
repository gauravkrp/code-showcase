import React, { useState } from 'react';

import styles from './tagsInput.module.scss';

const TagsInput: React.FC<any> = ({
  id,
  className,
  placeholder,
  errors,
  name,
  value,
  inputRef,
  returnTags,
  // ...rest
}) => {
  const [input, setInput] = useState('');
  const [tags, setTags] = useState<string[]>(value);
  const [isKeyReleased, setIsKeyReleased] = useState(false);

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setInput(value);
  };

  const onKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    const { key } = e;
    const trimmedInput = input.trim();

    if (key === ',' && trimmedInput.length && !tags.includes(trimmedInput)) {
      e.preventDefault();
      setTags(prevState => [...prevState, trimmedInput]);
      setInput('');
      returnTags([...tags, trimmedInput]);
    }

    if (key === 'Backspace' && !input.length && tags.length && isKeyReleased) {
      const tagsCopy = [...tags];
      const poppedTag = tagsCopy.pop() as any;
      e.preventDefault();

      setTags(tagsCopy);
      setInput(poppedTag);
      returnTags(tagsCopy);
    }

    setIsKeyReleased(false);
  };

  const onKeyUp = () => {
    setIsKeyReleased(true);
  };

  const deleteTag = (index: number) => {
    const tags_ = [...tags].filter((tag, i) => i !== index);
    setTags(tags_);
    returnTags(tags_);
  };

  return (
    <div className={`${styles.tags_container}`} id={id}>
      <div className={styles.tags_wrapper}>
        {tags.map((tag, index) => (
          <div className={styles.tag} key={tag}>
            {tag}
            <button onClick={() => deleteTag(index)}>x</button>
          </div>
        ))}
      </div>
      <input
        type="text"
        value={input}
        name={name}
        placeholder={placeholder ? placeholder : 'Enter a tag'}
        onKeyDown={onKeyDown}
        onChange={onChange}
        onKeyUp={onKeyUp}
        className={`${className ? `${className}` : ''}${errors ? ' is-invalid' : ''}`}
        ref={inputRef}
        // {...rest}
      />
    </div>
  );
};

export default TagsInput;
