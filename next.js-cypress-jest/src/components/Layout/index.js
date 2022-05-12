import React, { Component } from 'react';

export default function withLayout(PageComponent) {
  return class LayoutWrapped extends Component {
    render() {
      return (
        <>
          {/* {pageSEOConfig && <NextSEO {...seoConfig} />} */}
          <PageComponent {...this.props} {...this.state} />
        </>
      );
    }
  };
}
