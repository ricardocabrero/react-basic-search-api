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
    componentDidMount(){
        this._handleStorage()
    }
    render(){
        const { resultsStorage } = this.state
        return(
            <section className="results">
                <h1 className="title">Results page</h1>
                <Btn
                    label='Back to Home'
                    link='/'/>
                <CardList
                movies={resultsStorage}
                />
            </section>
        )
    }
}