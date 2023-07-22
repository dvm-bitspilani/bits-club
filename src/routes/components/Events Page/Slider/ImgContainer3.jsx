
export default function ImgContainer3(props) {
    return (
        <div className="slider-img-box">
            
            <div className="img-container-3">
                <img src={props.img} alt="image not found" />
            </div>
            <p>{props.title} <br />
            {props.desc}
            </p>
        </div>
    )
}