

interface CommentProps {
    name: string;
    email: string;
    body: string;
}

export default function Comment({ name, email, body }: CommentProps) {
    return (
        <div className={` bg-gray-100 p-4 rounded-lg mb-2`}>
            <div className="flex items-center mb-2">
                <div className="bg-gray-400 rounded-full w-8 h-8 flex items-center justify-center text-white font-bold mr-2">
                    {name.charAt(0).toUpperCase()}
                </div>
                <p className="font-bold">
                    {name.split(" ")[0]}
                </p>
                <p className="text-gray-500 ml-2">({email})</p>
            </div>
            <p>{body}</p>
        </div>
    );

}
