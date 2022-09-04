import {nanoid} from "nanoid"

function Dice(props) {
    let dots = [<span key={nanoid()} className="dot"></span>]
    for (let i = 1; i < props.value; ++i) {
        dots.push(<span key={nanoid()} className="dot"></span>)
    }
    return (
        <div onClick={props.handleClick} className={`dice ${props.isHeld ? "held" : ""}`}>
            <span>
                {dots}
            </span>
        </div>
    )
}

export default Dice