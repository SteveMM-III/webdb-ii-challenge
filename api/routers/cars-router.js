const express = require( 'express' );

const db = require( '../../data/dbConfig' );

const router = express.Router();

router.get( '/', ( req, res ) => {
  db( 'cars' )
    .then( cars => { res.json( cars ); } )
    .catch( error => {
      console.log( error );
      res.status( 500 ).json( { error: 'Failed to retrieve cars' } );
    } );
} );

router.get( '/:id', ( req, res ) => {
  const { id } = req.params;

  db( 'cars' )
    .where( { id } )
    .first()
    .then( car => {
      car ?
        res.status( 200 ).json( car ) :
        res.status( 404 ).json( { message: 'the specified car was not found' } );
    } )
    .catch( error => {
      console.log( error );
      res.status( 500 ).json( { error: 'Failed to retrieve car' } );
    } );
} );

router.post( '/', ( req, res ) => {
  const carData = req.body;

  db( 'cars' )
    .insert( carData )
    .then( ids => {
      db( 'cars' )
        .where( { id: ids[ 0 ] } )
        .then( newCarEntry => { res.status( 201 ).json( newCarEntry );
      } )
    } )
    .catch( error => {
      console.log( error );
      res.status( 500 ).json( { error: 'Failed to store the car data' } );
    } );
} );

module.exports = router;