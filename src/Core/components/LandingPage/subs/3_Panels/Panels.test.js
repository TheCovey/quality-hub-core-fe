import React from "react";
import Panels from "./Panels";
import * as rtl from "@testing-library/react";

afterEach(rtl.cleanup);

test("is rendering", () => {
  rtl.render(<Panels />);
});
