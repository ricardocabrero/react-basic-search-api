import React, { Component } from 'react'

const URL_API = 'http://www.omdbapi.com/?apikey=',
API_KEY = 'a5182dec'

export class Search extends Component {
    state = {
        inputMovie: ''
    }
    _handleChange = (e) => {
        this.inputEl.value = this.inputEl.value.toUpperCase()
        this.setState({
            inputMovie: e.target.value
        })        
    }
    _handleSubmit = (e) => {
        const { inputMovie } = this.state
        e.preventDefault();
        fetch(`${URL_API}${API_KEY}&s=${inputMovie}`)
        .then( res => res.json())
        .then( data => {
            const { Search = [] } = data
            this.props.onResults(Search)
        })
    }
    componentDidMount(){
        this.inputEl.focus()
    }
    render(){
        return(
            <div className="search-wrapper">
                <form 
                onSubmit={this._handleSubmit}
                action="">
                    <div className="field has-addons">
                        <div className="control">
                            <input
                            ref={ inputEl => this.inputEl = inputEl }
                            onChange={this._handleChange}
                            className="input" type="text" placeholder="Search a movie..."/>
                        </div>
                        <div className="control">
                            <button className="button is-info">
                                Search
                            </button>
                        </div>
                    </div>  
                </form> 
          </div>
        )
    }
}