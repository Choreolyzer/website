export default function Landing({toggleShow}) {
    return (
        <div className="w-screen h-screen grid">
            <div className="place-self-center">
                <p className="text-9xl">
                    Choreolyzer
                </p>
                <p className="text-2xl">
                    <a href={"#"} onClick={toggleShow}>
                        Try it out ->
                    </a>
                </p>
            </div>
        </div>
    )
}