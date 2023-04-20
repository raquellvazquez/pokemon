import {NoFavorites} from '../../../components/ui';
import { Layout } from '../../../components/layouts';
import { useEffect, useState } from 'react';
import { localStorageFavorites } from '../../../utils';
import { Grid, Card } from '@nextui-org/react';
import FavoritesPokemos from '../../../components/pokemon/FavoritesPokemos';

const Favorites = () => {

  const [pokemons, setPokemons] = useState<number[]>([]);

  useEffect(() => {
   setPokemons(localStorageFavorites.pokemons());
  }, []);
  

  return (
    <Layout title='Mis pokemones favoritos'>
      {
        pokemons.length === 0 ? (
          <NoFavorites />
        ) : (
          <FavoritesPokemos pokemons={pokemons} />
        )
      }
       
    </Layout>
  )
}

export default Favorites