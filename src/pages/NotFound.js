import React from 'react'

import { Btn } from '../components/Btn'

export const NotFound = () => (
    <section className="notfound">
        <Btn
        label='Back to Home'
        link='/'/>
        <h1 className="title">404!</h1>
        <h2 className="title is-5">Page not found</h2>
    </section>
)