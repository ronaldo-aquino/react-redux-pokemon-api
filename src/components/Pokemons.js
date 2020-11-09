import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
    getPokemonsAction,
    nextPokemonsAction,
    previousPokemonsAction,
    pokemonDetalhe,
} from "../redux/pokeDucks";
import Pokemon from "./Pokemon";

const Pokemons = () => {
    const dispatch = useDispatch();
    const { results, previous } = useSelector((store) => store.pokemons);
    const pokemons = results;

    useEffect(() => {
        dispatch(getPokemonsAction());
    }, [dispatch]);

    return (
        <div className="row">
            <div className="col-md-6">
                <h3>Lista de pokemons</h3>
                <div className="d-flex justify-content-between">
                    {previous !== null && (
                        <button
                            className="btn btn-dark"
                            onClick={() => dispatch(previousPokemonsAction())}
                        >
                            Previous Pokemons
                        </button>
                    )}

                    <button
                        className="btn btn-dark"
                        onClick={() => dispatch(nextPokemonsAction())}
                    >
                        Next Pokemons
                    </button>
                </div>
                <ul className="list-group mt-2">
                    {pokemons.map((pokemon) => (
                        <li
                            key={pokemon.name}
                            className="list-group-item text-uppercase"
                        >
                            {pokemon.name}
                            <button
                                className="btn btn-dark btn-sm float-right"
                                onClick={() =>
                                    dispatch(pokemonDetalhe(pokemon.url))
                                }
                            >
                                Info
                            </button>
                        </li>
                    ))}
                </ul>
            </div>
            <div className="col-md-6">
                <h3>Detalhe de um Pokemon</h3>
                <Pokemon />
            </div>
        </div>
    );
};

export default Pokemons;
