import Loader from '../Loader';

export default function Button(props: any) {
  const { el, className, label, type, onClick, isSubmitting, children, ...rest } = props;

  const btnClasses = `btn ${className ?? ''}`;
  const content = children ?? label;

  if (el === 'anchor') {
    return (
      <a aria-label="Link" className={btnClasses} {...rest}>
        {content}
      </a>
    );
  }

  if (el === 'span') {
    return (
      <span aria-label="Button" className={btnClasses} onClick={onClick} {...rest}>
        {content}
      </span>
    );
  }

  return (
    <button
      aria-label="Button"
      className={btnClasses}
      type={type ? type : 'button'}
      {...rest}
      onClick={onClick}
    >
      {isSubmitting ? <Loader as="span" fillColor="#ffffff" size="tiny" /> : content}
    </button>
  );
}
