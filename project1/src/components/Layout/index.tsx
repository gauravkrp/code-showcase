import { NextPage } from 'next'
import React, { Component } from 'react'

import Header from './Header'
import Footer from './Footer'
import SideBar from './Sidebar'

function withLayout(PageComponent: NextPage, headerBgColor:string='white', ) {
  return class LayoutWrapped extends Component {
    constructor(props:any) {
      super(props)
    }

    componentDidMount() {
      //console.log('Wrapped Dashboard Component', 'thisProp-', this.props)
    }

    render() {
      return(
        <div className="app-origin-wrapper">
          <div className='layout-sidebar'>
            <SideBar {...this.props} {...this.state} />
            <Footer />
          </div>
          <div className='layout-mainblock'>
            {/* <Header bgColor={headerBgColor} {...this.props} {...this.state} /> */}
            <div className='app-main-container'>
              <PageComponent {...this.props} {...this.state} />
            </div>
          </div>
        </div>
      )
    }
  }
}

export default withLayout