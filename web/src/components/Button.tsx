type ButtonType = {
    classes?: string;
    img?: string;
    text: string;
    typeBtn?: "submit" | "reset" | "button" | undefined;
    disabled?: boolean;
}

export default function Button({classes ="", img, text = "", typeBtn = "button", disabled = false}: ButtonType){
    return (
        <button className={`h-[52px] w-full max-w-max flex items-center justify-center gap-2 text-white rounded-md bg-[#1E6F9F] px-4 ${classes}`} disabled={disabled} type={typeBtn}>
            <p>{text}</p>
            {img && <img src={img}  className="w-4 h-4"/>}
        </button>
    )
}