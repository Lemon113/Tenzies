import {nanoid} from "nanoid"
import DiceData from "./DiceData"

function Dice(data: DiceData) {
    let dots = [<span key={nanoid()} className="dot"></span>]
    for (let i = 1; i < data.value; ++i) {
        dots.push(<span key={nanoid()} className="dot"></span>)
    }
    return (
        <div onClick={data.clickHandler} className={`dice ${data.isHeld ? "held" : ""}`}>
            <span>
                {dots}
            </span>
        </div>
    )
}

export default Dice;
