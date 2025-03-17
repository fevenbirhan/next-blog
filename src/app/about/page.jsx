export default function About() {
    return (
      <div className='min-h-screen flex items-center justify-center'>
        <div className='max-w-2xl mx-auto p-3 text-center'>
          <div>
            <h1 className='text-3xl font font-semibold text-center my-7'>
              About Feven&apos;s Blog
            </h1>
            <div className='text-md text-gray-500 flex flex-col gap-6'>
              <p>
                Welcome to Feven&apos;s Blog! Created by Feven Belay, this blog
                serves as a personal platform to share her insights and ideas with
                the world. Feven is a Computer Science student at Addis Ababa University, passionate about developing full-stack web applications.
              </p>
  
              <p>
                This website is created using Next.js and{' '}
                <a
                  href='https://go.clerk.com/fgJHKlt'
                  target='_blank'
                  className='text-teal-500 hover:underline'
                >
                  Clerk
                </a>
                .
              </p>
  
            </div>
          </div>
        </div>
      </div>
    );
}