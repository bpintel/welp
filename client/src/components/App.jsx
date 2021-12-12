import React from 'react';
import Axios from 'axios';
import List from './List.jsx'

class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            displayChoice: false,
            // Dummy Data to be replaced by componentDidMount() calls.
            choices: ["Howling Rays", "Halal Guys", "Wendys"],
            restaurant: ''
        }
        this.getDataFromDatabase = this.getDataFromDatabase.bind(this)
        this.handleAddClick = this.handleAddClick.bind(this)
        this.handleRandom = this.handleRandom.bind(this)

    }

    componentDidMount() {
        this.getDataFromDatabase()
    }

    getDataFromDatabase() {
        Axios.get('/app/main')
            .then((results) => {
                this.setState({
                    choices: results.data
                }, () => console.log(this.state))
            })
            .catch((err) => { console.error(err) })
    }

    handleChange(e) {
        e.preventDefault() // preventing page from refreshing on form submission

        this.setState({
            [e.target.name]: e.target.value
        }, () => console.log(this.state))
    }

    handleAddClick() {
        if (this.state.restaurant.length < 1) {
            window.alert('Please enter at least one character.')
        } else {
            let { restaurant } = this.state;
            Axios.post("/app/main", {
                restaurant: restaurant,
            })
                .then(() => this.setState({ restaurant: "" })) // sets state back to blank to force re-render
                .catch((err) => console.err(err));
        }
    }

    handleClearClick() {
        let { restaurant } = this.state
        Axios.delete('/app/main', {
            restaurant: restaurant
        })
            .then(() => this.setState({ restaurant: '' })) // sets state back to blank to force re-render
            .catch(err => console.err(err))
    }

    handleRandom(e) {
        e.preventDefault();
        this.setState({
            displayChoice: !this.state.displayChoice
        })
    }

    render() {
        if (this.state.displayChoice) {
            return (
                <div>
                    <form>
                        <input placeholder="Restaurant" name="restaurant" onChange={this.handleChange.bind(this)} className="inputBar"></input>
                        <button onClick={this.handleAddClick.bind(this)} id="addButton">Add</button>
                        <button onClick={this.handleClearClick.bind(this)} id="clearButton">Clear</button>
                        <h3>Your choice is: </h3>
                        <h1>{this.state.choices[Math.floor(Math.random() * this.state.choices.length)]}</h1>
                        <button onClick={(e) => this.handleRandom(e)} id="randomButton">Go!</button>
                    </form>
                </div>
            )
        } else if (!this.state.choices.length) {
            return (
                <div>
                    <form>
                        <input placeholder="Restaurant" name="restaurant" onChange={this.handleChange.bind(this)} className="inputBar"></input>
                        <button onClick={this.handleAddClick.bind(this)} id="addButton">Add</button>
                        <button onClick={this.handleClearClick.bind(this)} id="clearButton">Clear</button>
                        <h3 title="Get it?!?! Because of State. lolol.">Add restaurants to get stated!</h3>
                        <button onClick={(e) => this.handleRandom(e)} id="randomButton">Go!</button>
                    </form>
                </div>
            )
        } else {
            return (
                <div>
                    <form>
                        <input placeholder="Restaurant" name="restaurant" onChange={this.handleChange.bind(this)} className="inputBar"></input>
                        <button onClick={this.handleAddClick.bind(this)} id="addButton">Add</button>
                        <button onClick={this.handleClearClick.bind(this)} id="clearButton">Clear</button>
                        <List choices={this.state.choices} />
                        <button onClick={(e) => this.handleRandom(e)} id="randomButton">Go!</button>
                    </form>
                </div>
            )
        }
    }
}

export default App;