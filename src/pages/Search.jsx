import React from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import searchAlbumsAPI from '../services/searchAlbumsAPI';
import Loading from '../components/Loading';

class Search extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      artist: '',
      inputData: '',
      results: '',
      hideForm: false,
    };
  }

  handleChange = ({ target }) => {
    const { name } = target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    this.setState({
      [name]: value,
    });
  }

 showAlbumResults = () => {
   //  estava tentando usar igualdade no primeiro if. Com a ajuda do Lucas Farias consegui resolver com length: https://github.com/tryber/sd-014-a-project-trybetunes/pull/83/files
   const { inputData, results } = this.state;
   if (results !== '' && results.length > 0) {
     return (
       <div>
         <h4>
           {`Resultado de álbuns de: ${inputData}`}
         </h4>
         {results.map((album) => (
           <Link
             data-testid={ `link-to-album-${album.collectionId}` }
             key={ album.collectionId }
             to={ `/album/${album.collectionId}` }
           >
             <p>{album.collectionName}</p>
           </Link>
         ))}
       </div>
     );
   }
   if (results === '') {
     return null;
   }
   return (
     <div>
       <h4>Nenhum álbum foi encontrado</h4>
     </div>
   );
 }

 apiHandler = async () => {
   const { artist } = this.state;
   this.setState({
     results: await searchAlbumsAPI(artist),
     hideForm: false,
   });
 }

 buttonClick = () => {
   const { artist } = this.state;
   this.setState({
     inputData: artist,
     artist: '',
     hideForm: true,
   });
   this.apiHandler();
 }

 searchForm = () => {
   const { artist, hideForm, results } = this.state;
   const two = 2;
   if (hideForm === false) {
     return (
       <div data-testid="page-search">
         <form>
           <label htmlFor="artist">
             <input
               name="artist"
               type="text"
               data-testid="search-artist-input"
               value={ artist }
               onChange={ this.handleChange }
             />
           </label>
         </form>
         <button
           type="button"
           data-testid="search-artist-button"
           disabled={ artist.length < two }
           onClick={ this.buttonClick }
         >
           Pesquisar

         </button>
       </div>
     );
   }
   if (results === '') { return <Loading />; }
   return (null);
 }

 render() {
   return (
     <div>
       <Header />
       {this.searchForm()}
       {this.showAlbumResults()}
     </div>
   );
 }
}

export default Search;
