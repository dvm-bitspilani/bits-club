export default function RelevantInfo(props){
    return(
        <div className="task">
            {/* <h3 className="heading-2">Task-1</h3> */}
            <p className="text">{props.info[0]}</p>
        </div>
    )
}