import { useEffect ,useState}from 'react'
import { Loader,Card, FormField} from './component'

const Home = () => {
 const [ loading ,setLoading] = useState(false);
 const [ allPosts, setAllpost] =useState(null);
  
 return (
   <section>
     <div>
        <h1 className=' font-extrabold text-[#222328] text-[32px]'>The communiy Showcase</h1>
        <p className='mt-2 text-slate-500 text-[16px] max-w-[500px]'>browse through a collection of imaginative and vuisually stunning images by DAllE AI</p>
     </div>
       <div className=' mt-16'>
        <FormField/>
       </div>
       <div className=' mt-10'>
        { loading ? (
            <div className=" flex justify-center items-center">
                <Loader/>
            </div>
        ):(<></>)}
       </div>
   </section>
  )
}

export default Home
