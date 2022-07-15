export interface WordProps {
    text: string;
    value: number;
}

export default function Word({text, value}: WordProps) {
    return (
    <div 
        style={{'fontSize': `${20 * value}px`}}
        className="text-center"
    >
        {text}
    </div>)
}