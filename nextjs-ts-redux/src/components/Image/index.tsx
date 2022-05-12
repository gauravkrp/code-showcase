import Image from 'next/image';
import styles from './image.module.scss';

const MyImage = (props: any) => {
  const { alt = '', src, layout = 'fill', ...rest } = props;
  return (
    <div className={styles['image-wrapper']}>
      <Image alt={alt} src={src} layout={layout} {...rest} />
    </div>
  );
};

export default MyImage;
