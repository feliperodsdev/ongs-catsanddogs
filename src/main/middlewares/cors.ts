export const cors = () => {
  return (req: any, res: any, next: any) => {
    res.set("access-control-allow-origin", "*");
    res.set("access-control-allow-methods", "*");
    res.set("access-control-allow-headers", "*");
    next();
  };
};
