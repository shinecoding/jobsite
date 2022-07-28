import React from 'react'
import Head from 'next/head'
import Script from 'next/script'
import Header from './Header'
import Footer from './Footer'

const Layout = ({children, title = 'Jobbee - Find Your Job Now'}) => {
  return (
    <div>
        <Head>
            <title>{title}</title>
            <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.2.0/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-gH2yIJqKdNHPEq0n4Mqa/HGKIhSkIHeL5AyhkYV8i59U5AR6csBvApHHNl/vI1Bx" crossorigin="anonymous"></link>
            <Script src="https://code.jquery.com/jquery-3.6.0.slim.js" integrity="sha256-HwWONEZrpuoh951cQD1ov2HUK5zA5DwJ1DNUXaM6FsY=" crossorigin="anonymous"></Script>
            <Script src="https://kit.fontawesome.com/9edb65c86a.js" crossOrigin="anonymous"></Script>
            <Script strategy="beforeInteractive" src="https://cdn.jsdelivr.net/npm/popper.js@1.16.1/dist/umd/popper.min.js"></Script>
            <Script strategy="beforeInteractive" src="https://cdn.jsdelivr.net/npm/bootstrap@4.5.3/dist/js/bootstrap.min.js"></Script>
        </Head>
        
        <Header/>
        {children}
        <Footer/>


    </div>
  )
}

export default Layout