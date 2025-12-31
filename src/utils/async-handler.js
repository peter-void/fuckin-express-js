export const asyncHandler = (func) => {
  return (req, res, next) => {
    new Promise((resolve) => resolve(func(req, res, next))).catch((error) =>
      next(error)
    );
  };
};
