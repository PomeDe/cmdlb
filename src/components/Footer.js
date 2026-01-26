import React from 'react'

export default function Footer({lang}) {
    return (
        <footer className='bg-gray-900 p-6 text-center text-gray-400 mt-10   top-[100vh] w-full'>
            <div className='flex flex-row justify-evenly items-center'>
                                <p className='w-1/4'>@2025 Copyright</p>
                <div className='flex flex-row w-2/3 justify-around'>
                    <div className='flex flex-col text-left space-y-3'  >
                    {
(lang)?<p className='text-2xl text-white font-semibold '>Contact</p> : <p className='text-2xl text-white font-semibold '>Холбоо барих</p>
}
                    <p className='text-lg '>+976 69963388 </p>
                    <div className='flex flex-row items-center space-x-3'>
                        <img src='https://upload.wikimedia.org/wikipedia/commons/thumb/0/05/Facebook_Logo_%282019%29.png/500px-Facebook_Logo_%282019%29.png' className='w-5 h-5' />
                        <p>@Comedy Lab</p>
                    </div>
                    <div className='flex flex-row items-center space-x-3'>
                        <img src='https://upload.wikimedia.org/wikipedia/commons/thumb/a/a5/Instagram_icon.png/500px-Instagram_icon.png' className='w-5 h-5' />
                        <p>@comedylaboratory</p>
                    </div>
                    <div className='flex flex-row items-center space-x-3'>
                        <img src='https://upload.wikimedia.org/wikipedia/commons/thumb/7/7e/Gmail_icon_%282020%29.svg/330px-Gmail_icon_%282020%29.svg.png' className='w-5 h-4' />
                        <p>comedylabmn@gmail.com</p>
                    </div>
                </div>
                <div className='flex flex-col text-left space-y-3 w-80'  >
                    {(lang)?<p className='text-2xl text-white font-semibold'>Address</p> : <p className='text-2xl text-white font-semibold'>Хаяг</p>}
                    <p className='text-lg w-full'>LIBERTY PUB, Чингисийн өргөн чөлөө, Тэмээтэй хөшөөний хойно, Их хуралдай төвийн 1 давхарт Ulaanbaatar, Mongolia</p>
                    
                </div>
                </div>

            </div>
        </footer>
    )
}
