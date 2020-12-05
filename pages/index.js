import styled from 'styled-components'
import { down } from "styled-breakpoints";
import { useBreakpoint } from "styled-breakpoints/react-styled";

const Container = styled.div`
	display: flex;
	gap: 2rem;
`;

const All1 = styled.p`
	color: red;
`

const All2 = styled.p`
	color: orange;
`

const DesktopOnly1 = styled.p`
	color: blue;
`

const DesktopOnly2 = styled.p`
	color: purple;
`

const MobileOnly = styled.p`
	color: green;
`

export default function Home() {
	// If you set this to false and refresh with a narrow viewport, you'll
	// get a broken view, even if you then resize wider/narrower.
	//
	// If you set this to true and refresh with a wide viewport, you'll get
	// a different broken view, even if you then resize narrower/wider.
	//
	// You only see the correct view if mobile is initialized to false and
	// you refresh with a narrow viewport (it's then still correct with
	// resizes) or you initialize it to true and you refresh with a wide
	// viewport (it's then still correct with resizes).
	let mobile = false;

	try {
		mobile = useBreakpoint(down("sm"));
	} catch {
		// Do nothing; we're probably doing SSR
	}
	return (
		<Container>
			<All1>all 1 (red)</All1>
			{!mobile && (
				<DesktopOnly1>desktop only 1 (blue)</DesktopOnly1>
			)}
			<All2>all 2 (orange)</All2>
			{!mobile && (
				<DesktopOnly2>desktop only 2 (purple)</DesktopOnly2>
			)}
			{mobile && (
				<MobileOnly>mobile only (green)</MobileOnly>
			)}
		</Container>
	);
}
