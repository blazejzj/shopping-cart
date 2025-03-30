import mainPageImage from "../assets/mainPage.svg";

export default function HomePage() {
    return (
        <div className="homepage-container">
            <h1 className="logo">
                Welcome To Shop <b className="logo-single-letter">U</b>
            </h1>
            <div className="homepage-image-container">
                <p>
                    Discover a world of style and simplicity right at your
                    fingertips. At Shop U, we bring you a handpicked collection
                    of products designed to inspire your everyday life. Whether
                    you're searching for the latest trends or timeless
                    essentials, our curated selection has something for
                    everyone. Step into Shop U and experience shopping that's
                    easy, fun, and uniquely you.
                </p>
                <img
                    src={mainPageImage}
                    alt="MainPageImage"
                    width={400}
                    height={400}
                />
            </div>
        </div>
    );
}
