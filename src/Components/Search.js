import React from 'react';
import '../Styles/Search.css';
import Loupe from '../Images/glass.png';
import Cancel from '../Images/cross.png';
import SmallRecipe from './SmallRecipe';
import API from '../Services/Api';
class Search extends React.Component {
  constructor (props) {
    super(props);
    this.state = {
      filter: [],
      currentSearch: '',
      recipes: []
    };
    this.handleGetRecipes = this.handleGetRecipes.bind(this);
  }

  handleGetRecipes = () => {
    const url = `/recipes/?search=${this.state.currentSearch}`;
    API.get(url)
      .then((res) => res.data)
      .then((data) => {
        this.setState({
          recipes: [data]
        });
      });
  };

  handleChange = (event) => {
    this.setState({ currentSearch: event.target.value });
  };

  handleAddfilter = async () => {
    const currentFilter = [];
    const newFilter = currentFilter.concat(this.state.currentSearch);
    if (this.state.currentSearch) {
      this.setState({ filter: newFilter, currentSearch: '' });
    }
    this.handleGetRecipes();
    this.props.history.push(`/rechercher/?search=${this.state.currentSearch}`);
  };

  handleDelete = (str) => {
    const newFilter = this.state.filter.filter((e) => str !== e);
    this.setState({ filter: newFilter, recipes: [] });
    this.props.history.push('/rechercher');
  };

  handleKeyDown = (event) => {
    // permet d'effectuer la recherche avec entrée
    if (event.key === 'Enter' && event.target.value) {
      event.preventDefault();
      const currentSearch = event.target.value;
      this.setState({ currentSearch });
      this.handleAddfilter(currentSearch);
      event.target.blur();
    }
  };

  render () {
    const recipes = this.state.recipes;
    return (
      <div className='recherche-container'>
        <div className='Loupe'>
          <h5>Recherche simple</h5>
          <div className='search-field'>
            <div className='filter-list'>
              {this.state.filter.map((e) => (
                <p
                  key={e}
                  onClick={() => this.handleDelete(e)}
                  className='filter-name'
                >
                  {e}
                  <img src={Cancel} alt='cancel' />
                </p>
              ))}
            </div>
            <div className='search-block'>
              <div className='my-search'>
                <label className='label'>
                  <p>J'ai envie de : </p>
                </label>
                <input
                  id='search'
                  name='search'
                  type='text'
                  placeholder='Rechercher'
                  value={this.state.currentSearch}
                  onChange={this.handleChange}
                  onKeyDown={this.handleKeyDown}
                />
              </div>
              <button className='btn-search' onClick={this.handleAddfilter}>
                <img src={Loupe} alt='search' />
                Rechercher
              </button>
            </div>
            <div className='result'>
              <div className='filter-recipes-container'>
                {recipes.length === 0 ? (
                  <p>Entrez votre recherche.</p>
                ) : (
                  recipes[0].data.map((recipe) => {
                    return (
                      <div className='filtered-recipes' key={recipe.id}>
                        <SmallRecipe r={recipe} />
                      </div>
                    );
                  })
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Search;
