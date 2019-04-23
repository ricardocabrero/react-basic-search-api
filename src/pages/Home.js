import React, { Component } from 'react'
import { Link } from 'react-router-dom'

import { Title } from '../components/Title'
import { Search } from '../components/Search'
import { CardList } from '../components/CardList'

export class Home extends Component {
    state = {
        results: [],
        usedSearch: false,
        hasFavorites: false
    }
    _handleSessionStorage(dataSession){
        if(window.sessionStorage.length > 0){
            window.sessionStorage.clear()
        }
        for(let i = 0; i < dataSession.length; i++){
          window.sessionStorage.setItem(i,JSON.stringify(dataSession[i]))
        }
    }
    _handleResults = (results) => {
        this.setState({ results, usedSearch: true })
        this._handleSessionStorage(results)
    }
    _renderResults = () => {
        const { results } = this.state
        if(results.length === 0){
          return <p>No results found</p>
        }
        return(
          <CardList
          movies={results}
          />
        )               
    }
    componentDidMount(){
        if(window.localStorage.length > 0){
            this.setState({
                hasFavorites: true
            })
        }
    }
    render(){
        const { hasFavorites } = this.state
        const  favorites =  hasFavorites
        ? <Link className="favorites-link" title="Your favorites" to="/favorites">Your favorites</Link>
        : ""
        return(
            <section className="home">
                <Title>
                Search Movies
                </Title>
                <Search
                onResults={this._handleResults}
                />
                { this.state.usedSearch 
                ? this._renderResults()
                : <small>Please, use the form to search a movie <span>(enter the full title or a keyword)</span></small>
                } 
                {favorites}  
            </section>    
        )
    }
}