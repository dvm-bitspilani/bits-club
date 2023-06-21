export default function ImgContainer3(props) {
    return (
        <div className="slider-img-box">
            <div className="img-container-3">
                <img src="../src/assets/thumbnail3.png" alt="" />
            </div>
            <p>Card number {props.cardNo}</p>
        </div>
    )
}