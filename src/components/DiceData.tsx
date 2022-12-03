interface DiceData {
    value: number;
    isHeld: boolean;
    clickHandler: React.MouseEventHandler<HTMLDivElement>;
    id: string;
}

export default DiceData;