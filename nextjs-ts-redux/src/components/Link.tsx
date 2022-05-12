import React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';

interface CardProps {
  href?: any;
  children?: any;
}

const MyLink = ({ href, children }: CardProps) => {
  const router = useRouter();
  //console.log(href, router.asPath)
  let className = children.props.className || '';
  if (router.asPath === href || router.asPath.includes(href)) {
    className = `${className} active-page`;
  }

  return <Link href={href}>{React.cloneElement(children, { className })}</Link>;
};

export default MyLink;
