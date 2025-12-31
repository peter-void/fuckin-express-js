export const validate =
  ({ body, params, query }) =>
  (req, res, next) => {
    try {
      if (body) req.body = body.parse(req.body);
      if (params) req.params = body.parse(req.params);
      if (query) req.query = body.parse(req.query);
      next();
    } catch (error) {
      next(error);
    }
  };
