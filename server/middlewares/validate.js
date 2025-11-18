/**
 * Validates the request body against a given Yup schema.
 *
 * @function validateRequest
 * @param {Yup.Schema} schema - The schema to validate against.
 * @returns {Function} A middleware function that validates the request body.
 *
 * @example
 * // Creates a middleware that validates the request body against the schema
 * const validateBody = validateRequest(
 *   yup.object().shape({
 *     name: yup.string().required(),
 *     email: yup.string().email().required(),
 *   })
 * );
 *
 * app.post("/users", validateBody, (req, res) => {
 *   // Code to handle the request
 * });
 */
 const validateRequest = (schema) => {
  return async (req, res, next) => {
    try {
      req.body = await schema.validate(req.body, {
        abortEarly: false,
        stripUnknown: true,
      });
      next();
    } catch (err) {
      res.status(400).json({
        message: "Validation failed.",
        errors: err.errors,
      });
    }
  };
};

export default validateRequest;
