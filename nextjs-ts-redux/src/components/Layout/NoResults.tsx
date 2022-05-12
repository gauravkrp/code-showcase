import React from 'react';
import EmptyDiv_SVG from '../../../public/assets/svg/empty.svg';

const NoResults = (props: any) => {
  return (
    <div className="text-center no-results-div">
      <div>
        <EmptyDiv_SVG />
      </div>
      {/* <Image  src='/assets/images/empty.png' alt='No Results found.' /> */}
      <p>{props.data}</p>
      {props.children}
    </div>
  );
};

export default NoResults;
