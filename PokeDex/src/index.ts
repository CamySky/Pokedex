import express, { Request, Response } from "express";
import path from "path";

const app = express();
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, "/views"));

interface PokemonDetail {
    name: string;
    sprites: {
      front_default: string;
    };
    types: {
      type: {
        name: string;
      };
    }[];
    height: number;
    weight: number;
  }

app.get('/', function (request: Request, response: Response) {
    fetch("https://pokeapi.co/api/v2/pokemon?limit=20")
        .then(function (res) {
            return res.json();
        })
        .then(function (data) {
            response.render("index", data)
        });
});

app.get('/pokemon/:name', function (request: Request, response: Response) {
    const name = request.params.name;
    fetch(`https://pokeapi.co/api/v2/pokemon/${name}`) 
        .then(res => res.json())
        .then(data => {
            const pokemon: PokemonDetail = data; 
            response.render('detalhes', { pokemon });
        });
});

app.listen(3000, function () {
    console.log("Server is running");
})
