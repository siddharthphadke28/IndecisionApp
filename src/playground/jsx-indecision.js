console.log("app.js is running");

function getSubtitle(subtitle){
    if(subtitle){
        return <p>{subtitle}</p>;
    }
}

const app = {
    title: 'Indecison App',
    subtitle: 'Some Info',
    options: []
};

const onFormSubmit = (e) => {
    e.preventDefault();
    const option = e.target.elements.option.value;
    if(option){
        app.options.push(option);
        e.target.elements.option.value = '';
        renderIndecisionApp();
    }

};

const onMakeDecision = () => {
    const randomNum = Math.floor(Math.random() * app.options.length);
    const option = app.options[randomNum];
    console.log(option);
}; 


const removeAll = (e) => {
    app.options = [];
    renderIndecisionApp();
};
const appRoot = document.getElementById('app');


const renderIndecisionApp = () => {
    const template =( 
        <div>
            <h1>{app.title}</h1> 
            {app.subtitle && <p>{app.subtitle}</p>}
            <p>{app.options.length > 0 ? 'Here are your options: ' : 'No Options'}</p>
            <button disabled={app.options.length === 0} onClick={onMakeDecision}>What Should I Do?</button>
            <button onClick={removeAll}>Remove All</button>
            <ol>
                {
                   app.options.map((option) => <li key={option}>{option}</li>) 
                }
            </ol>
            <form onSubmit={onFormSubmit}>
                <input type="text" name="option"/>
                <button>Add Option</button>
            </form>
        </div>);

        ReactDOM.render(template, appRoot);
};
renderIndecisionApp();



