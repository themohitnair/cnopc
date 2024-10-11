import NavButton from "./NavButton"

const Header = () => {
    return (
        <header className="top-0 sticky m-10">
            <div className="header text-center  text-5xl">
                <a href="/">
                    synopsi
                </a>
            </div>
            <div className="navbutts flex gap-x-10 justify-center mt-5">
                <NavButton link="/about" label="About"/>
                <NavButton link="https://github.com/themohitnair/synopsi" label="Source Code"/>
            </div>
        </header>
    )
}

export default Header