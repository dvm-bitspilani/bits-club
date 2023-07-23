
export default function ImgContainer3(props) {

    const wordLimit = 50
    return (
        <div className="slider-img-box">
            
            <div className="img-container-3">
                <img src={props.img} alt="" />
            </div>
            <p>{props.title} <br />
            {props.desc.length < wordLimit && props.desc}
            {props.desc.length >= wordLimit && props.desc[wordLimit] + "..."}
            </p>
        </div>
    )
}