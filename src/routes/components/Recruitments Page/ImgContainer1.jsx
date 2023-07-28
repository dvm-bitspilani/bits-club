export default function ImgContainer1(props){
    const imgstyle = {
        tintColor: "blue"
    }

    return (
        <div className="img-container-1">
            <img src={props.src} alt="" style={imgstyle} onError={(e) => (e.target.src = "/assets/NAB.png")}/>
        </div>
    )
}