const NotFoundMiddleware= (req, res, next) => {
  res.status(404).send({ status: 404, message: 'Resource not found' });
};

export default NotFoundMiddleware;