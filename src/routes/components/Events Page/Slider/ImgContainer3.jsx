
export default function ImgContainer3(props) {
    return (
        <div className="slider-img-box">
            
            <div className="img-container-3">
                <img src="../public/assets/thumbnail3.png" alt="" />
            </div>
            <p>{props.desc} <br />
            {"From " + new Date(props.start).toLocaleString() + " to " + new Date(props.end).toLocaleString()}
            </p>
        </div>
    )
}