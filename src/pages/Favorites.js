import React, { Component } from 'react'

import { CardList } from '../components/CardList'
import { Btn } from '../components/Btn'

const URL_API = 'http://www.omdbapi.com/?apikey=',
API_KEY = 'a5182dec'

export class Favorites extends Component {
    constructor(props){
        super(props)
        this.urlIds = window.localStorage.getItem('favorites').split(',')
        this.arr = []
        this.state = {
            favorites: []
        }
    }
    _handleUrls = (id) => {
        fetch(`${URL_API}${API_KEY}&i=tt${id}`)
        .then( res => res.json())
        .then( data => {
           this.arr.push(data)
           this.setState(() => ({
               favorites: this.arr,
               clear: false
            })
           )
        })
    }
    _handleFavorites(){
        this.urlIds.map(this._handleUrls)
    }
    _handleClear =() => {
        this.setState({
            clear: !this.state.clear
        })
        this._clearList()
    }
    _clearList(){
        const { clear } = this.state
        if(!clear){
            window.localStorage.clear()
        }
    }
    componentDidMount(){
        this._handleFavorites()
    }
    render(){
        const { favorites, clear } = this.state
        const clearList = clear
        ? ""
        : <div>
            <small>For delete one item from list access to detail</small>
            <CardList movies={favorites}/>
        </div>
        return(
            <section className="favorites">
                <h1 className="title">
                    Favorites
                </h1>
                <div className="btn-wrapper">
                    <Btn
                    label='Home'
                    link='/'/>
                    <Btn
                    label='Results'
                    link='/results'/>
                    <button
                    onClick={this._handleClear}
                    disabled={clear} 
                    className="button is-info">Clear list</button>
                </div>
                {clearList}
            </section>
        )
    }
}