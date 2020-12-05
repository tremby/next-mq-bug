import styled from 'styled-components'

function useMobile() {
	const [mobile, setMobile] = React.useState(null);
	const callback = React.useCallback((e) => {
		setMobile(e.matches);
	}, []);
	React.useEffect(() => {
		const mqlist = window.matchMedia("(max-width: 767px)");
		mqlist.addEventListener("change", callback);
		setMobile(mqlist.matches);
		return function cleanup() {
			mqlist.removeEventListener("change", callback);
		}
	}, []);
	return mobile;
}

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

function Content({ mobile }) {
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

function InitMobile() {
	const mobile = useMobile();
	return <Content mobile={mobile} />;
}

// These two components are the same in this version, since I don't need to
// initialize `mobile` to anything since useEffect doesn't run during SSR and
// raise an exception.

function InitDesktop() {
	const mobile = useMobile();
	return <Content mobile={mobile} />;
}

export default function Home() {
	// If the viewport width hint is initialized to false (i.e. SSR as if
	// desktop width), you'll get a broken view, even if you then resize
	// wider/narrower.
	//
	// If the viewport width hint is initialized to true (i.e. SSR as if
	// mobile width), you'll get a different broken view, even if you then
	// resize narrower/wider.
	//
	// You only see the correct view if the page loads when the width is the
	// same as how the hint was initialized. It's then still correct with
	// resizes.

	const [initialMobile, setInitialMobile] = React.useState(null);
	const currentMobile = useMobile();
	if (initialMobile == null && currentMobile != null) {
		setInitialMobile(currentMobile);
	}

	return (
		<>
			<h2>Width on initial render</h2>
			<p>{initialMobile === true ? "mobile" : initialMobile === false ? "desktop" : "unknown"}</p>

			<h2>Width hint initialized to mobile</h2>
			<InitMobile />

			<h2>Width hint initialized to desktop</h2>
			<InitDesktop />
		</>
	);
}
