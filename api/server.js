const express = require( 'express' );
const helmet  = require( 'helmet'  );

const CarsRouter = require( './routers/cars-router' );

const server = express();

function logger( req, res, next ) {
  console.log( `${ req.method } to ${ req.originalUrl }` );
  next();
}

server.get( '/', ( req, res ) => {
  res.send( '<h3>DB Challenge II - api/knex migrations/seeds</h3>' );
} );

server.use( helmet()       );
server.use( express.json() );
server.use( logger         );

server.use( '/api/cars', CarsRouter );

module.exports = server;
