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

router.get( '/:id', validateCarId, ( req, res ) => {
  req.car ?
    res.status( 200 ).json( req.car ) :
    res.status( 404 ).json( { message: 'the specified car was not found' } );
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

router.put( '/:id', validateCarId, ( req, res ) => {
  const { id }  = req.params;
  const changes = req.body;

  db( 'cars' )
    .where( { id } )
    .update( changes )
    .then( count => {
      count > 0 ?
        res.status( 200 ).json( { message: `${ count } record(s) updated` } ) :
        res.status( 404 ).json( { message: 'Car not found'                } );
    } )
    .catch( error => {
      console.log( error );
      res.status( 500 ).json( { error: 'Error updating the car' } );
    } );
} );

router.delete( '/:id', validateCarId, ( req, res ) => {
  const { id } = req.params;

  db( 'cars' )
    .where( { id } )
    .del()
    .then( count => {
      count > 0 ?
        res.status( 200 ).json( { message: `${ count } record(s) removed`           } ) :
        res.status( 404 ).json( { message: "The car's record(s) was/were not found" } );
    } )
    .catch( error => {
      console.log( error );
      res.status( 500 ).json( { error: 'Error removing the car' } );
    } );
} );

function validateCarId( req, res, next ) {
  const { id } = req.params;
  
  db( 'cars' )
    .where( { id } )
    .first()
    .then( car => {
      if ( car ) { req.car = car; next(); }
      else { res.status( 404 ).json( { message: "car id not found" } ) }
    } )
    .catch( error => {
      console.log( error );
      res.status( 500 ).json( { error: "error validating car id" } );
    } );
}

module.exports = router;