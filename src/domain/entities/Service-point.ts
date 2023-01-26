interface IPropsServicePoint {
  name: string;
  desc: string;
}
export class ServicePoint {
  private props: IPropsServicePoint;
  get getProps() {
    return this.props;
  }
  constructor(props: IPropsServicePoint) {
    this.props = props;
  }
}
