import React, { Component } from 'react'

import { CardList } from '../components/CardList'
import { Btn } from '../components/Btn'

export class Results extends Component {
    constructor(props){
        super(props)
        this.storage = window.sessionStorage
        this.state = {
            resultsStorage: []
        }
    }
    _handleStorage(){
        const { resultsStorage } = this.state
        for( let i = 0; i < this.storage.length; i++){
            resultsStorage.push(JSON.parse(this.storage.getItem(JSON.parse(i))))
        }
        this.setState({
            resultsStorage
        })
    }
    conditionalLocalStorageBtn(){
        const localStorage = window.localStorage.length > 0
        if(localStorage){
            return <Btn label="Favorite list" link="/favorites"/>
        }
    }
    componentDidMount(){
        this._handleStorage()
    }
    render(){
        const { resultsStorage } = this.state
        const noResults = window.sessionStorage.length === 0
        ? <small>Oops! No results found, <span>please, return to Home page for search</span></small>
        : <CardList movies={resultsStorage}/>
        return(
            <section className="results">
                <h1 className="title">Results page</h1>
                <div className="btn-wrapper">
                    <Btn
                        label='Back to Home'
                        link='/'/>
                    {this.conditionalLocalStorageBtn()}
                </div>
                {noResults}
            </section>
        )
    }
}