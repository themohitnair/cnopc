interface NavButtonProps { 
    link: string
    label: string
}

const NavButton: React.FC<NavButtonProps> = ({link, label}) => {
    return (
        <a href={link}>
            <button className="px-4 py-2 rounded-sm hover:bg-hov">
                {label}
            </button>
        </a>        
    )
}

export default NavButton