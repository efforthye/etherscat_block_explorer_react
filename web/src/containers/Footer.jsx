import FooterComponent from "../components/Footer"

const FooterContainer = () => {

    const moveTop = () => {
        window.scrollTo({
            top: 0,
            behavior: "smooth",
        });
    };

    return <FooterComponent moveTop={moveTop} />
}

export default FooterContainer