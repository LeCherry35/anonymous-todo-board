import React from 'react'

interface TextProps {
    children: React.ReactNode;
    type: "heading" | "title" | "text" ;
}

const Text = ({children, type='text'}:TextProps) => {
    if(type === "heading"){
        return <h2 className="text-xl font-bold m-2 capitalize text-center text-zinc-700">{children}</h2>
    }
    if(type === "title"){
        return <h4 className="text-md font-bold mb-2 capitalize text-zinc-700">{children}</h4>
    }
    if(type === "text"){
        return <p className="break-all text-zinc-700">{children}</p>
    }
    else return <></>
}

export default Text