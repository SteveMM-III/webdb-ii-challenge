
exports.seed = function( knex ) {
  // Deletes ALL existing entries
  return knex( 'cars' )
    .truncate()
    .then( () => {
      // Inserts seed entries
      return knex('cars').insert( [
        { VIN: "JH4KA4540LC016127", make: "Acura", model: "Legend", mileage: 123456 },
        { VIN: "1D4HR38N13F581006", make: "Dodge", model: "Durango", mileage: 123457 },
        { VIN: "5N3AA08CX7N805813", make: "Infiniti", model: "QX56", mileage: 123458 },
        { VIN: "1FMCU14T6JU400773", make: "Ford", model: "Bronco II", mileage: 123459 },
        { VIN: "JT6HF10U3Y0133607", make: "Lexus", model: "RX 300", mileage: 123460 },
        { VIN: "2HGES15252H603204", make: "Honda", model: "Civic", mileage: 123461 },
        { VIN: "WP0AA2A79BL017244", make: "Porsche", model: "Panamera", mileage: 123462 },
        { VIN: "JT2SV12E8G0417278", make: "Toyota", model: "Camry", mileage: 123463 },
        { VIN: "WVWAA71K08W201030", make: "Volkswagen", model: "Rabbit", mileage: 123464 },
        { VIN: "JN6MD06S2BW031939", make: "Datsun", model: "Pickup", mileage: 123465 }
      ] );
    } );
};
