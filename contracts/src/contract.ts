import { Field, Circuit, circuitMain, public_, Gadgets } from 'o1js';

export class Main extends Circuit {
  @circuitMain
  static main(@public_ x: Field, y: Field) {
    Gadgets.rangeCheck64(y);
    let y3 = y.square().mul(y);
    y3.assertEquals(x);
  }
}
