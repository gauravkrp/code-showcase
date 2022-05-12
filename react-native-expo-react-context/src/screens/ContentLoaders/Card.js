import React from 'react';
import ContentLoader, { Circle, Rect  } from 'react-content-loader';


const Card = props => {
  return (
    <ContentLoader viewBox="0 0 260 160" height={160} width={260} {...props}>
      <Circle cx="50" cy="30" r="30" />
      <Rect x="10" y="70" rx="3" ry="3" width="40" height="10" />
      <Rect x="60" y="70" rx="3" ry="3" width="70" height="10" />
      <Rect x="140" y="70" rx="3" ry="3" width="20" height="10" />
      <Rect x="10" y="90" rx="3" ry="3" width="90" height="10" />
      <Rect x="110" y="90" rx="3" ry="3" width="70" height="10" />
      <Rect x="10" y="110" rx="3" ry="3" width="70" height="10" />
      <Rect x="90" y="110" rx="3" ry="3" width="60" height="10" />
    </ContentLoader>
  );
}

export default Card;
