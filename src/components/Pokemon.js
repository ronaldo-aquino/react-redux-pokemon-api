import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { pokemonDetalhe } from "../redux/pokeDucks";

const Pokemon = () => {
    const dispatch = useDispatch();
    const pokemon = useSelector((store) => store.pokemons.pokemonDetail);
    useEffect(() => {
        const fetData = () => {
            dispatch(pokemonDetalhe());
        };
        fetData();
    }, [dispatch]);

    return pokemon ? (
        <div className="card">
            <div className="card-body">
                <img
                    src={pokemon.img}
                    alt={pokemon.name}
                    className="img-fluid"
                />
                <div className="card-title">{pokemon.name}</div>
                <p className="card-text">
                    Alto: {pokemon.height} | Largura: {pokemon.weight}
                </p>
            </div>
        </div>
    ) : null;
};

export default Pokemon;
