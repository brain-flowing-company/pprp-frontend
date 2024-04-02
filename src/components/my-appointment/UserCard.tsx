import Image from 'next/Image';

export default function UserCard({
    role,
    profilePicSrc,
    name,
    tel
} : {
    role: string,
    profilePicSrc: string,
    name: string,
    tel: string
}) {
    return (
        <div className="flex flex-col">
            <div className="font-semibold medium-large-text mb-5">
                {role}
            </div>
            <div className="flex flex-row mx-auto w-full">
                <div className='my-auto w-40 relative flex aspect-square items-center justify-center overflow-hidden rounded-full'>
                    <Image 
                        src={profilePicSrc}
                        alt='profile pic'
                        draggable={false}
                        fill
                        objectFit='cover'
                        // layout='responsive'
                    />
                </div>
                <div className='flex flex-col font-medium medium-large-text my-auto mx-auto'>
                    <div>
                        {name}
                    </div>
                    <div>
                        {tel}
                    </div>
                </div>
            </div>
        </div>
    )
}