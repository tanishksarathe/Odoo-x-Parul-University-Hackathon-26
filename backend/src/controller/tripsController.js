export const tripRegisterController = async (req, res, next) => {
  try {
    const {
      title,
      description,
      budget,
      start_date,
      end_date,
      is_public,
      packing_items,
    } = req.body;

    const userId = req.user.id;

    if (!title || !description || !budget || !start_date || !end_date) {
      return res.status(400).json({
        message: "All fields are required",
      });
    }

    const sql = `
      INSERT INTO trips
      (user_id, title, description, budget, start_date, end_date, is_public)
      VALUES (?, ?, ?, ?, ?, ?, ?)
    `;

    connection.query(
      sql,
      [userId, title, description, budget, start_date, end_date, is_public],

      (err, results) => {
        if (err) {
          console.error("DB Error", err);
          return res.status(500).json({
            message: "Database error",
          });
        }

        const tripId = results?.insertId;

        // PACKING ITEMS INSERT
        if (packing_items?.length > 0) {
          const packingSql = `
            INSERT INTO packing_items
            (item_name, trip_id)
            VALUES ?
          `;

          const packingValues = packing_items.map((item) => [item, tripId]);

          connection.query(
            packingSql,
            [packingValues],
            (err, packingResult) => {
              if (err) {
                console.error(err);

                return res.status(500).json({
                  message: "Packing items insert failed",
                });
              }

              res.status(201).json({
                success: true,
                message: "Trip created successfully",

                data: {
                  id: tripId,
                  user_id: userId,
                  title,
                  description,
                  budget,
                  start_date,
                  end_date,
                  is_public,

                  packing_items,
                },
              });
            },
          );
        } else {
          res.status(201).json({
            success: true,
            message: "Trip created successfully",

            data: {
              id: tripId,
              user_id: userId,
              title,
              description,
              budget,
              start_date,
              end_date,
              is_public,

              packing_items,
            },
          });
        }
      },
    );
  } catch (error) {
    next(error);
  }
};


export const activityAddController = async (req, res, next) => {

    try {
        
        

    } catch (error) {
        next(error);
    }

}

export const addStopsController = async (req, res, next) => {

    try {
        
    

    } catch (error) {
        next(error);
    }

}