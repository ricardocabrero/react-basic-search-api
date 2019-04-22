import React, { Component } from 'react'

export class Addfavorites extends Component {
    constructor(props){
        super(props)
        this.state = {
            btnAdd: true,
            isItem: false
        }
        this.idCollection = []
        this.param = undefined
        this.nameStorage = 'favorites'
    }
    
    _handleButton = (e) => {
        e.preventDefault()
        this.setState({
            btnAdd: !this.state.btnAdd,
        })
    }
    _takeUrlParam(){
        const url = window.location.href
        var param = url.split('tt')
        this.param = param[2]
    }
    _checkIsItem(){
        this.idCollection = window.localStorage.getItem(this.nameStorage)
        this.idCollection = this.idCollection.split(',') 
        for(let i = 0; i < this.idCollection.length; i++){
            if(this.param === this.idCollection[i]){
                this.setState({
                    btnAdd: false,
                    isItem: true
                })
                break;
            }
        } 
    } 
    _updateStorage(){
        const { btnAdd, isItem} = this.state
        let posDelete

        this.idCollection = window.localStorage.getItem(this.nameStorage)
        this.idCollection = this.idCollection.split(',')
        if(!btnAdd && !isItem){
            this.idCollection.push(this.param)
            window.localStorage.setItem(this.nameStorage, this.idCollection)
        }
        if(btnAdd && isItem){
            if(this.idCollection.length > 1){
                posDelete = this.idCollection.indexOf(this.param)
                this.idCollection.splice(posDelete,1)
                window.localStorage.setItem(this.nameStorage, this.idCollection)
            }
            else{
                window.localStorage.clear()
            }
        }
    }
    _createStorage(){
        const { btnAdd } = this.state

        if(!btnAdd){
            this.idCollection = this.param
            window.localStorage.setItem(this.nameStorage, this.idCollection)
         }
    }
    _handleStorage  = () => {
        const isLocalStorage = window.localStorage.length > 0

        isLocalStorage ? this._updateStorage()
        : this._createStorage()
    }
    componentDidMount(){
        this._takeUrlParam()
        window.localStorage.length > 0 && this._checkIsItem()
    }
    componentWillUnmount(){
        this._handleStorage()
    }
    render(){
        const { btnAdd } = this.state
        const textCurrent = btnAdd ? 'Add to favorites' : 'Remove from favorites'

        return(
            <button 
            onClick={this._handleButton}
            className={`button is-info${btnAdd ? ' no-favorite' : ' favorite'}`}>
            {textCurrent}
            </button>
        )
    }
}