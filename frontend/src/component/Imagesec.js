import pic from './space.webp';

const Imagesec = () => {
    return (
        <>
            <div className="relative mt-0">
                <img
                    style={{ height: '100vh', width: '100%', objectFit: 'fill', objectPosition: 'center top' }} 
                    src={pic}
                    alt="Space"
                    
                />
                <div className="pt-16 md:pt-4 absolute inset-0 flex flex-col justify-center items-center">
                    <div className='lg:flex'>
                        <div className='flex md:flex-row justify-center items-center'>
                            <h1 className='animate-slide100 opacity-0 text-4xl md:text-5xl lg:text-6xl font-bold text-black pr-2 md:pr-4'>Satellite</h1>
                            <h1 className='animate-slide200 opacity-0 text-4xl md:text-5xl lg:text-6xl font-bold text-black pr-2 md:pr-4'>Imaginary</h1>
                            <h1 className='animate-slide300 opacity-0 text-4xl md:text-5xl lg:text-6xl font-bold text-black pr-2 md:pr-4'>Based</h1>
                        </div>

                        <div className='flex md:flex-row justify-center items-center'>
                            <h1 className='animate-slide400 opacity-0 text-4xl md:text-5xl lg:text-6xl font-bold text-black pr-2 md:pr-4'>Building</h1>
                            <h1 className='animate-slide500 opacity-0 text-4xl md:text-5xl lg:text-6xl font-bold text-black pr-2 md:pr-4'>Survey</h1>
                        </div>
                    </div>

                    <div className='flex md:flex-row justify-center items-center'>
                        <h1 className='animate-slide600 opacity-0 text-4xl md:text-5xl lg:text-6xl font-bold text-black pr-2 md:pr-4'>Using</h1>
                        <h1 className='animate-slide700 opacity-0 text-4xl md:text-5xl lg:text-6xl font-bold text-black pr-2 md:pr-4'>Machine</h1>
                        <h1 className='animate-slide800 opacity-0 text-4xl md:text-5xl lg:text-6xl font-bold text-black pr-2 md:pr-4'>Learning</h1>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Imagesec;
