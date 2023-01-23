export class ExpressRouterAdapter {
  adapt(router: any) {
    return async (req: any, res: any) => {
      const httpRequest = {
        user: req.user,
        body: req.body,
      };
      const httpResponse = await router.route(httpRequest);
      res.status(httpResponse.statusCode).json(httpResponse.body);
    };
  }
}
