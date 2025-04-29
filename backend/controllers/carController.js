const { Car } = require('../models');

exports.addCarForUser = async (req, res) => {
  const { userId } = req.params;
  const { model, color, license_plate } = req.body;

  try {
    const car = await Car.create({
      user_id: userId,
      model,
      color,
      license_plate,
    });

    res.status(201).json({ message: 'Car added successfully!', car });
  } catch (error) {
    console.error('❌ Error adding car:', error);
    res.status(500).json({ error: 'Failed to add car' });
  }
};

exports.getCarsByUserId = async (req, res) => {
    const { userId } = req.params;
  
    try {
      // Find cars for the specific user
      const cars = await Car.findAll({
        where: { user_id: userId },
      });
  
      if (cars.length === 0) {
        return res.status(404).json({ message: 'No cars found for this user.' });
      }
  
      res.status(200).json(cars);
    } catch (error) {
      console.error('❌ Error fetching cars:', error);
      res.status(500).json({ error: 'Failed to fetch cars' });
    }
  };