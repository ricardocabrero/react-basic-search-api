import React, { Component } from 'react'
import PropTypes from 'prop-types'

import { CardItem } from './CardItem'

export class CardList extends Component {
    static propTypes = {
        movies: PropTypes.array
    }
    render(){
        const { movies } = this.props
        return(
            <div className='list-wrapper'>
                {movies.map(movie => ( 
                        <div 
                        key={movie.imdbID}
                        className="card-wrapper">            
                            <CardItem
                            id={movie.imdbID}
                            title={movie.Title}
                            poster={movie.Poster}
                            year={movie.Year}/>  
                        </div>                    
                        )          
                    )
                }
            </div>
        )
    }
}