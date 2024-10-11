interface InputProps {
    placeholder: string
}

const Input: React.FC<InputProps> = ({placeholder}) => {
    return (
        <input type="text" placeholder={placeholder} className="border border-[#171717] rounded-sm px-2 py-2 bg-background"/>
    )
}

export default Input