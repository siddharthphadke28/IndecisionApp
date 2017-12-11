class IndecisionApp extends React.Component{
    constructor(props){
        super(props);
        this.handleDeleteOptions = this.handleDeleteOptions.bind(this);
        this.handlePickOption = this.handlePickOption.bind(this);
        this.handleAddOption = this.handleAddOption.bind(this);
        this.handleDeleteOption = this.handleDeleteOption.bind(this);
        this.state = {
            options : []
        };
    }
    componentDidMount(){
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
            console.log("saving")
        }
    }
    handleDeleteOptions() {
        this.setState(() => ({options: []}));
    }
    handleDeleteOption(optionToRemove){
        this.setState((prevState) => ({
            options: prevState.options.filter((option) => optionToRemove !== option)
        }));
    }
    handlePickOption(){
        let randomNum = Math.floor(Math.random() * this.state.options.length);
        let randomOption = this.state.options[randomNum];
        return alert (randomOption);
    }

    handleAddOption(option){
        if(!option){
            return 'Enter a valid Option to add item!'
        }else if(this.state.options.indexOf(option) > -1){
            return 'Item already exists';
        }

        this.setState((prevState) => ({
            options: prevState.options.concat(option)
        }));
    }
    render(){
        
        const subtitle = 'Put your life in the hands of a Computer';
        return (
            <div>
                <Header subtitle={subtitle}/>
                <Action 
                    handlePickOption={this.handlePickOption}
                    hasOptions = {this.state.options.length > 0}/>
                <Options 
                    options={this.state.options}
                    handleDeleteOptions={this.handleDeleteOptions}
                    handleDeleteOption={this.handleDeleteOption}
                    
                />
                <AddOptions 
                    handleAddOption = {this.handleAddOption}
                />
            </div>
        );
    }
}

const Header = (props) => {
    return (
         <div>
            <h1>{props.title}</h1>
            {props.subtitle && <h2>{props.subtitle}</h2>}
        </div>
        ); 
}
Header.defaultProps = {
    title: 'Indecision'
}

const Action =  (props) => {
    return (
        <div>
            <button 
            onClick={props.handlePickOption}
            disabled={!props.hasOptions}
            > 
                What Should I Do?
            </button>
        </div>
    );
}



const Options = (props) => {
    return (
        <div>
        <button onClick={props.handleDeleteOptions}>Remove All</button>
        {props.options.length === 0  && <p>Please add an option to get started!</p>}
            {
                    props.options.map((option) => (
                        <Option 
                            key={option} 
                            optionText={option}
                            handleDeleteOption = {props.handleDeleteOption}
                        />
                    ))
            }
            
        </div>
        );
}


const Option = (props) => {
    return(
        <div>
            {props.optionText}
            <button 
                onClick={(e) => {
                    props.handleDeleteOption(props.optionText)
                }}
            >
                Remove
            </button>
        </div>
    );
}



class AddOptions extends React.Component{
    constructor(props){
        super(props);
            this.handleAddOption = this.handleAddOption.bind(this); 
            this.state ={
                error: undefined
            }
    }
    handleAddOption(e){
        e.preventDefault();
        const option = e.target.elements.option.value.trim();
        const error = this.props.handleAddOption(option);;
    
    this.setState((prevState) => ({error}));

    if(!error){
        e.target.elements.option.value = '';
    }
    }
    render(){
        return (
            <div>
                {this.state.error && <p>{this.state.error}</p> }
                <form onSubmit={this.handleAddOption}>
                    <input type="text" name="option"/>
                    <button>Add Option</button>
                </form>
            </div>
        )
    }
}

ReactDOM.render(<IndecisionApp />,document.getElementById('app'));