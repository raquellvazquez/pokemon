import { FC } from 'react';
import { Grid } from '@nextui-org/react';
import CardFavorites from './CardFavorites';

interface FavoritesPokemosProps {
  pokemons: number[]
}

const FavoritesPokemos : FC<FavoritesPokemosProps> = ({pokemons}) => {
  return (
    <Grid.Container gap={2} direction='row' justify='flex-start'>
      {
        pokemons.map(id => (
          <Grid xs={6} sm={3} md={2} xl={1} key={id}>
            <CardFavorites pokemonId={id} />
          </Grid>
        ))
      }
    </Grid.Container>
  )
}

export default FavoritesPokemos