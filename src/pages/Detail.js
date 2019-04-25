import React, { Component } from 'react'
import PropTypes from 'prop-types'

import { Btn } from '../components/Btn'
import { Addfavorites } from '../components/Addfavorites'
import  NoFoundImg  from '../img//no-img-found.jpg'

const URL_API = 'http://www.omdbapi.com/?apikey=',
API_KEY = 'a5182dec'

export class Detail extends Component {
    static propTypes = {
        match: PropTypes.shape({
            params: PropTypes.object,
            isExact: PropTypes.bool,
            path: PropTypes.string,
            url: PropTypes.string
        })
    }
    state = {
        movie: {},
        hasSession: false
    }
    _fetchMovie({ id }){
        fetch(`${URL_API}${API_KEY}&i=${id}`)
        .then( res => res.json())
        .then( movie => {
            this.setState({ movie })            
        })
    }
    _replaceImgeNotFound = () => {
        this.img.parentNode.className += ' not-found-img'
        this.img.src = NoFoundImg    
     }
    componentDidMount(){
        const { movieId } = this.props.match.params  
        this._fetchMovie({ id: movieId })
        if(window.sessionStorage.length !== 0){
            this.setState({
                hasSession: true
            })
        }
    }
    render(){
        const { movie, hasSession } = this.state
        const { Title, Poster, Plot, Actors, Director, Year } = movie
        const session = hasSession 
        ? <Btn label='Back to results' link='/results'/>
        : <Btn label="Favorite list" link="/favorites"/>
        return(
            <section className="detail">
                <div className="btn-wrapper">
                    <Btn
                    label='Home'
                    link='/'/>
                    {session}
                    <Addfavorites/>
                </div>
                <div className="card">
                    <div className="card-image">
                        <figure className="image">
                        <img 
                        onError={this._replaceImgeNotFound}
                        ref={imgRef => this.img = imgRef}
                        src={Poster} alt={Title}/>
                        </figure>
                    </div>
                    <div className="card-content">
                        <div className="media">
                            <div className="media-content">
                                <h1 className="title is-4">{Title}</h1>
                                <p className="title is-5"><strong>Director:</strong>&nbsp;{Director}</p>
                                <p className="subtitle is-6"><strong>Actors:</strong>&nbsp;{Actors}</p>
                                <p className="subtitle is-6"><strong>Summary:</strong>&nbsp;{Plot}</p>
                                <p className="subtitle is-6"><strong>Year:</strong>&nbsp;{Year}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        )
    }
}