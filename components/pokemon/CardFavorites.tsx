import {FC} from 'react'
import { Card} from '@nextui-org/react';
import { useRouter } from 'next/router';

interface CardFavoritesProps {
 pokemonId: number
}

const CardFavorites: FC<CardFavoritesProps> = ({pokemonId}) => {

  const router = useRouter();

  const onHandleClick = () => {
    router.push(`/pokemon/${pokemonId}`);
  }
  
  return (
    <Card hoverable clickable css={{padding:10}} onClick={onHandleClick}>
        <Card.Image 
        src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/${pokemonId}.svg`} 
        width={'100%'}
        height={140}
        />
    </Card>
  )
}

export default CardFavorites