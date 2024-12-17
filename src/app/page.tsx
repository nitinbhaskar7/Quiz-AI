import React from 'react'
import './extra.css'
const page = () => {
  return (
    <div className='bg'>

      <section className="one">
        <main className='font-sans'>
          <div className="flex justify-center ">
            <div className=" w-2/5 text-5xl p-16 flex  justify-center">
              <h2 className='text-[50] font-bold text-center '>We Inspire to<br /><span className='text-green-400 text-[60px] '>Learn</span></h2>
            </div>
            <div className="  w-2/5 p-16">
              <p className=" text-xl font-bold text-center">
                We inspire to learn and not to read.
                Encouraging out of the box thinking is our number one priority with the future great minds of the world. We aim to foster these resilient young minds to pave the way we move forward as a society.
              </p>
            </div>
          </div>
        </main>
      </section>

      <section className="two">
        <main className='font-sans'>
          <div className="flex justify-center ">
            <div className=" w-2/5 text-5xl p-16 flex  justify-center">
              <h2 className='text-[50] font-bold text-center'>How do we
                <br />
                <span className='text-red-500 text-[60px]'>
                  Work
                </span> ? </h2>
            </div>
            <div className="  w-2/5 p-16">
              <p className=" text-xl font-bold text-center">
              We strive to get better and deliver higher quality and up-to-date content for students in our work here at the Virtual Classroom. We create systems that manage your child's informal learning effectively and safely.
              </p>
            </div>
          </div>
        </main>
      </section>

      <section className="two">
        <main className='font-sans'>
          <div className="flex justify-center ">
            <div className=" w-2/5 text-5xl p-16 flex  justify-center">
              <h2 className='text-[50] font-bold text-center'>Why choose
                <br />
                <span className='text-purple-500 text-[60px]'>
                  Us 
                </span> ? </h2>
            </div>
            <div className="  w-2/5 p-16">
              <p className=" text-xl font-bold text-center">
              Our out-of-the-box approach and hunger for more innovation is why you should choose us for the informal education of you child in the field of science. We provide a distraction-less and fun learning platform for your child at all times.
              </p>
            </div>
          </div>
        </main>
      </section>

      <footer>
        <div className="container">
          <p>&copy; 2023 Virtual Classroom. All rights reserved.</p>
        </div>
      </footer>

      <script src="script.js"></script>
    </div>
  )
}

export default page
