import React from 'react';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import getMusics from '../services/musicsAPI';
import MusicCard from '../components/MusicCard';

class Album extends React.Component {
  constructor() {
    super();
    this.state = {
      songs: [],
    };
  }

  componentDidMount() {
    this.musicFetch();
  }

musicFetch = async () => {
  // referência para o destructuring do match.params: https://trybecourse.slack.com/archives/C01LCSLCZ8D/p1620508201224900
  const { match: { params: { id } } } = this.props;
  this.setState({
    songs: await getMusics(id),
  });
}

artistDetails = () => {
  const { songs } = this.state;
  if (songs !== '') {
    return (
      <p data-testid="artist-name">
        {`Artista: ${songs.map((song) => song.artistName)}`}
      </p>);
  }
}

render() {
  const { songs } = this.state;
  if (songs !== '') {
    return (
      <div data-testid="page-album">

        <Header />
        {this.artistDetails()}
        <p data-testid="album-name">
          {`Álbum: ${songs.map((song) => song.collectionName)}`}
        </p>
        {songs.map((song, i) => {
          if (i !== 0) {
            return (
              <MusicCard
                key={ song.trackName }
                trackName={ song.trackName }
                previewUrl={ song.previewUrl }
              />);
          }
          return (null);
        })}
        ;
      </div>
    );
  }
}
}

Album.propTypes = {
  match: PropTypes.string.isRequired,
  params: PropTypes.string.isRequired,
};

export default Album;
