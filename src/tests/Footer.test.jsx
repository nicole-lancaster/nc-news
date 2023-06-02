import { render } from "@testing-library/react";
import Footer from "../components/Footer";

describe('Footer', () => {
    test('should match rendered snapshot', () => {
        const {asFragment} = render(<Footer/>)
        expect(asFragment()).toMatchSnapshot()
    })
})