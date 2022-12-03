import Dice from "./Dice"
import React from "react"
import { nanoid } from "nanoid"
import Confetti from "react-confetti"

function Main() {
    const [dices, setDices] = React.useState(() => generateNewField())
    const [tenzies, setTenzies] = React.useState(false)
    const [rolls, setRolls] = React.useState(0)
    const [startDate, setStartDate] = React.useState(new Date())
    const [bestTime, setBestime] = React.useState(() => JSON.parse(localStorage.getItem("tenzies_best_time")) || 0);
    const [confettiWidth, setConfettiWidth] = React.useState(window.innerWidth);

    const setWindowDimensions = () => {
        setConfettiWidth(window.innerWidth);
    }

    React.useEffect(() => {
        const userTimezoneOffset = new Date().getTimezoneOffset() * 60000;
        console.log(bestTime !== 0 ? `Your best time is: ${new Date(bestTime + userTimezoneOffset).toLocaleTimeString()}` : "You didn't beat game yet")
        localStorage.setItem("tenzies_best_time", JSON.stringify(bestTime))
    }, [bestTime])

    React.useEffect(() => {
        window.addEventListener('resize', setWindowDimensions);
        return () => {
            window.removeEventListener('resize', setWindowDimensions);
        }
    }, [])

    var dicesElements = dices.map(d => <Dice key={d.id} value={d.value} isHeld={d.isHeld} handleClick={() => toggleHeld(d.id)}/>)

    React.useEffect(() => {
        const dice = dices[0]
        const isHeld = dices.every(d => d.isHeld)
        const isEquals = dices.every(d => d.value == dice.value)

        if (isHeld && isEquals) {
            setTenzies(true)
            console.log(`Won in ${rolls} rolls!` )
            const time = new Date() - startDate
            const userTimezoneOffset = new Date().getTimezoneOffset() * 60000;
            const dateTime = new Date(time + userTimezoneOffset)
            console.log(`Your time ${dateTime.toLocaleTimeString()}`)
            if (bestTime == 0 || dateTime < bestTime) {
                setBestime(dateTime.getSeconds() * 1000)
            }
        }
    }, [dices])

    function toggleHeld(id) {
        setDices(prevDices => prevDices.map(d => {
            if (d.id === id) {
                return {
                    ...d,
                    isHeld: !d.isHeld
                }
            } else {
                return d;
            }
        }))
    }

    function generateNewField() {
        return Array(10).fill().map(() => {
            return {
                isHeld: false,
                value: Math.ceil(Math.random() * 6),
                id: nanoid()
            }
        })
    }

    function reroll() {
        setDices(prevDices => {
            return prevDices.map(dice => {
                return dice.isHeld ? dice : {...dice, value: Math.ceil(Math.random() * 6)}
            })
        })
        incRolls()
    }

    function newGame() {
        setDices(generateNewField)
        setTenzies(false)
        setRolls(0)
        setStartDate(new Date())
    }

    function incRolls() {
        setRolls((prevRolls) => prevRolls + 1)
    }

    return (
        <main>
            <h1>Tenzies</h1>
            <p>Roll until all dice are the same. Click each die to freeze it at its current value between rolls.</p>
            <div className="dice-container">
                {dicesElements}
            </div>
            <button className="reset-button" onClick={tenzies ? newGame : reroll}>{tenzies ? "New Game" : "Roll"}</button>
            {tenzies && <Confetti
                width={confettiWidth}
            />}
        </main>
    )
}

export default Main