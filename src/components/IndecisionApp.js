import React from 'react';
import AddOptions from './AddOption';
import Options from './Options';
import Header from './Header';
import Action from './Action';
import OptionModal from './OptionModal';

export default class IndecisionApp extends React.Component{
    state =  {
        options: [],
        selectedOption:undefined
    }
    handleDeleteOptions = ()  =>{
        this.setState(() => ({options: []}));
    }
    clearPickedOptionModal = () => {
        this.setState(() => ({selectedOption: undefined}))
    }
    handleDeleteOption = (optionToRemove) => {
        this.setState((prevState) => ({
            options: prevState.options.filter((option) => optionToRemove !== option)
        }));
    }
    handlePickOption = () => {
        let randomNum = Math.floor(Math.random() * this.state.options.length);
        let randomOption = this.state.options[randomNum];
        this.setState(() => ({
            selectedOption: randomOption
        }))
    }

    handleAddOption = (option) => {
        if(!option){
            return 'Enter a valid Option to add item!'
        }else if(this.state.options.indexOf(option) > -1){
            return 'Item already exists';
        }

        this.setState((prevState) => ({
            options: prevState.options.concat(option)
        }));
    }
    componentDidMount() {
        try{
            const json = localStorage.getItem('options');
            const options = JSON.parse(json);
    
            if(options){
                this.setState(() => ({options}));
            }          
           } catch(e){
                 //Do nothing at all       
           }            
        
        
    }
    componentDidUpdate(prevProps, prevState){
        
        if(prevState.options.length !== this.state.options.length){
            const json = JSON.stringify(this.state.options);
            localStorage.setItem('options',json);
        }
    }
    
    render(){
        
        const subtitle = 'Put your life in the hands of a Computer';
        return (
            <div>
                <Header subtitle={subtitle}/>
                <div className="container body__background">
                    <Action 
                        handlePickOption={this.handlePickOption}
                        hasOptions = {this.state.options.length > 0}
                    />
                <div className="widget">
                    <Options 
                        options={this.state.options}
                        handleDeleteOptions={this.handleDeleteOptions}
                        handleDeleteOption={this.handleDeleteOption}
                    />
                    <AddOptions 
                        handleAddOption = {this.handleAddOption}
                    />
                    </div>
                    
                </div>
        
                <OptionModal 
                    selectedOption={this.state.selectedOption}
                    clearPickedOptionModal={this.clearPickedOptionModal}
                />
            </div>
        );
    }
}