import { Suspense, useRef, useState } from 'react'
import emailjs from '@emailjs/browser'
import Fox from '../models/Fox';
import { Canvas } from '@react-three/fiber';
import useAlert from '../hooks/useAlert';
import Alert from '../components/Alert';
import Loader from '../components/Loader'

const Contact = () => {
  const formRef = useRef();

  const [form, setForm] = useState({name: '', email:'', message:''})
  const [isLoading, setIsLoading] = useState(false);
  const [currentAnimation, setCurrentAnimation] = useState('idle');

  const {alert, showAlert, hideAlert} = useAlert();

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsLoading(true);
    setCurrentAnimation('hit');

    emailjs.send(
      import.meta.env.VITE_APP_EMAILJS_SERVICE_ID,
      import.meta.env.VITE_APP_EMAILJS_TEMPLATE_ID,
      {
        form_name: form.name,
        to_name: "Toby",
        from_email: form.email,
        to_email:'tobythaung@gmail.com',
        message: form.message
      },
      import.meta.env.VITE_APP_EMAILJS_PUBLIC_KEY
    ).then(() => {
      setIsLoading(false);
      showAlert({show: true, text:'Message Sent Successfully.', type:'success'})
      //TODO: Hide an Alert

      setTimeout(() => {
        hideAlert();
        setCurrentAnimation('idle');
        setForm({name:'', email:'', message:''})
      }, [3000])
    }).catch((error) => {
      setIsLoading(false);
      setCurrentAnimation('idle');
      console.log(error);
      
      showAlert({show: true, text:'Message Send Failed', type:'danger'})
    })
  }

  const handleChange = (e) => {
    setForm({...form, [e.target.name]: e.target.value})
  }

  const handleFocus = () => {
    setCurrentAnimation('walk');
  }

  const handleBlur = () => {
    setCurrentAnimation('idle');
  }

  return (
    <section className='relative flex lg:flex-row flex-col max-container'>
      {alert.show && <Alert {...alert}/>}

      <div className='flex-1 min-w-[50%] flex flex-col'>
        <h1 className='head-text'>Get in Touch</h1>

        <form
          ref={formRef}
          className='w-full flex flex-col gap-7 mt-14'
          onSubmit={handleSubmit}
        >
          <label className='text-black-500 font-semibold'>
            Name
            <input
              type="text"
              name="name"
              className='input'
              placeholder='Ketchup'
              value={form.name}
              onChange={handleChange}
              onFocus={handleFocus}
              onBlur={handleBlur}
            />
          </label>

          <label className='text-black-500 font-semibold'>
            Email
            <input
              type="email"
              name="email"
              className='input'
              placeholder='ketchup@gmail.com'
              value={form.email}
              onChange={handleChange}
              onFocus={handleFocus}
              onBlur={handleBlur}
            />
          </label>
          
          <label className='text-black-500 font-semibold'>
            Your Message
            <textarea
              type="text"
              name="message"
              className='input'
              placeholder='Reach out to me for anything'
              value={form.message}
              onChange={handleChange}
              onFocus={handleFocus}
              onBlur={handleBlur}
            />
          </label>
          
          <button 
            type="submit"
            className='btn'
            disabled={isLoading}
            onFocus={handleFocus}
            onBlur={handleBlur}
            >
              {isLoading ? 'Sending...' : 'Send Message'}
          </button>
        </form>
      </div>

      <div className='lg:w-1/2 w-full lg:h-auto md:h-[550px] h-[350px]'>
        <Canvas
          camera={{
            position: [0,0,5],
            fov: 75,
            near: 0.1,
            far: 1000
          }}>
            <directionalLight intensity={2.5} position={[0,0,1]}/>
            <ambientLight intensity={0.5}/>
            
            <Suspense fallback={<Loader/>}>
              <Fox
                currentAnimation={currentAnimation}
                position={[0.2, 1.5, 0]}
                rotation={[12.6,-0.6,0]}
                scale={[0.4,0.4,0.4]}
              />
            </Suspense>
        </Canvas>
      </div>
    </section>
  )
}

export default Contact