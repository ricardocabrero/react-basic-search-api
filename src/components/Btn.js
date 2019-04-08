import React, { Component } from 'react'
import propTypes from 'prop-types'
import { Link } from 'react-router-dom'

export class Btn extends Component {
    static propTypes = {
        label: propTypes.string,
        link: propTypes.string
    }
    render(){
        const { link, label } = this.props
        return(
            <Link 
            to={link}
            className="button is-info">{label}</Link> 
        )
    }
}



