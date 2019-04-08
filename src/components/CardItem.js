import React, { Component } from 'react'
import PropTypes from 'prop-types'

import  NoFoundImg  from '../img//no-img-found.jpg'
import { Link } from 'react-router-dom'

export class CardItem extends Component {
    static propTypes = {
        title: PropTypes.string,
        poster: PropTypes.string,
        year: PropTypes.string,
        id: PropTypes.string
    }
    _replaceImgeNotFound = () => {
        this.img.src = NoFoundImg    
     }
    render(){
        const { title, poster, year, id } = this.props
        return(
        <Link to={`/detail/${id}`} className="card">
            <div className="card-image">
                <figure className="image">
                    <img
                    onError={this._replaceImgeNotFound} 
                    ref={imgRef => this.img = imgRef}
                    src={poster} alt={title}/>
                </figure>
            </div>
            <div className="card-content">
                <div className="media">
                    <div className="media-content">
                        <p className="title is-4">{title}</p>
                        <p className="subtitle is-6">{year}</p>
                    </div>
                </div>
            </div>
        </Link> 
        )
    }
}