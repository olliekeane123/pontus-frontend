import Navigation from "./Navigation"

const Header = () => {
    return (
        <section className="flex border-b-2 border-amber-950 w-full text-2xl justify-between pl-6 pr-6 h-20 items-center">
            <p>Pontus</p>
            <Navigation></Navigation>
        </section>
    )
}

export default Header
