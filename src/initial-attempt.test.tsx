import React from "react"
import {screen, render} from "@testing-library/react"

import {InitialAttempt} from "./initial-attempt";

describe("InitialAttempt", () => {
    it("should render the component", () => {
        render(<InitialAttempt contentLanguage="en_US" message="World"/>);

        expect(screen.getByText(/Hello World/)).toBeInTheDocument();
    })
})
