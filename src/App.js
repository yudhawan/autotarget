import {StopIcon,TrashIcon,SwitchVerticalIcon,ClockIcon,PlayIcon,XIcon} from '@heroicons/react/outline'
import TargetImage from './target.png'
import TargetImageDown from './target_down.png'
import { useEffect, useState, } from 'react';
function App() {
  const [target,settarget]=useState([])
  const [play,setplay]=useState(false)
  const [timer,settimer]=useState(null)
  const [save,setsave]=useState([])
  const [namasesi,setnamasesi] = useState('')
  const [selected,setselected] = useState('')
  const [validation,setvalidation] = useState('')
  const [ip,setip]=useState(()=>null)
  function validationSession(){
    if(target.length<1) return setvalidation('Tidak ada yang bisa disimpan')
    if(save.find(val => val.nama===namasesi)) return setvalidation('Nama sudah ada')
    if(namasesi==='' || namasesi===null) return setvalidation('Isi nama dulu')
    setvalidation('')
    setnamasesi('')
    return setsave([...save, {nama:namasesi,target:target}])
  }
  function deleteSession(nama){
    let data = save.filter(val => val.nama!==nama)
    setsave(data)
  }
  const drop = e =>{
    e.preventDefault();
    var x = e.clientX - 20 - e.target.offsetLeft+'px'
    var y = e.clientY - 20 - e.target.offsetTop+'px'
    if(target.length==0) settarget([{
      id:1,top:y,left:x,status:false,time:null,ip:'', timerRun:()=>{
        if(this.time){
          
        }
      }
    }])
    if(target.length>0) {
      const last =target[target.length-1].id
      const newid = last+1
      settarget([...target,{id:newid,top:y,left:x,status:false,time:null,ip:'', timerRun:''}])
    }
  }
  const dragOver = e =>{
    e.preventDefault();
  }
  const dragStart = e =>{
    e.dataTransfer.setData('card','0');
  }
  const deleteTarget = id => settarget(target.filter(target=>target.id!=id))
  const switchTarget = id => settarget(target.map(target=>{
    if(target.id==id) target.status=!target.status
    return target
  }))
  const playAction = ()=> {
    setplay(true)
    
  }
  const stopAction = ()=> {
    setplay(false)
    
  }
  return (
  <>
  <div className="lg:px-24 px-4 flex justify-center w-full h-[100vh] bg-black z-10">
    <div className="flex justify-between w-full h-full border border-slate-400 divide-x divide-gray-400">
      {/* map */}
      <div className="w-[85%] h-full flex justify-center flex-wrap items-end overflow-auto relative " onDrop={drop} onDragOver={dragOver}>
        {
          target?.map((item,index)=>{
            return(
              <div key={index+1} style={{left:item.left, top:item.top}} id={item.id} className={`w-24 p-1 h-48 rounded-md shadow-md border-gray-300 border flex flex-col justify-center items-center absolute `}>
                {(timer==item.id)?<div className='w-24 h-40 bg-transparent backdrop-blur-md flex flex-col absolute top-0 left-0 justify-center items-center p-1 space-y-1'>
                  <p className='text-white text-xs font-bold'>Input Timer :</p>
                  <input type='number' className='outline-none border border-gray-400 rounded-md w-20 px-1' min='0' onChange={(e)=> {
                    settarget(target.map(target=>{
                      if(target.id==item.id) {
                        target.time=e.target.value*1000
                        if(e.target.value==0) target.time=null
                      }
                      return target
                  }))}} />
                  <button className='w-fit px-2 py-1 bg-green-600 text-white rounded-md text-xs' onClick={()=>settimer(null)}>Save</button>
                </div>:<></>}
                {(ip==item.id)?<div className='w-24 h-40 bg-transparent backdrop-blur-md flex flex-col absolute top-0 left-0 justify-center items-center p-1 space-y-1'>
                  <p className='text-white text-xs font-bold'>Input IP :</p>
                  <input type='text' className='outline-none border border-gray-400 rounded-md w-20 px-1' onChange={(e)=> {
                    settarget(target.map(target=>{
                      if(target.id==item.id) target.ip=e.target.value
                      return target
                  }))}} />
                  <button className='w-fit px-2 py-1 bg-green-600 text-white rounded-md text-xs' onClick={()=>setip(null)}>Save</button>
                </div>:<></>}
                <p className='bg-white font-bold text-xs absolute top-2 left-2 rounded-full px-1'>#{item.id}</p>
                <TrashIcon className={`rounded-full bg-red-400 text-white w-5 h-5 p-1 cursor-pointer absolute top-2 right-2`} onClick={()=>deleteTarget(item.id)}/>
                <img src={item.status?TargetImage:TargetImageDown} className="bg-cover w-full h-full" />
                <div className='w-full bg-slate-100 rounded-md flex space-x-1 justify-center p-1'>
                  {
                    !item.time?<>{item.status?<SwitchVerticalIcon className={`bg-green-400 rounded-full text-white w-5 h-5 p-1 cursor-pointer`} onClick={()=>switchTarget(item.id)}/>:<SwitchVerticalIcon className={`bg-red-400 rounded-full text-white w-5 h-5 p-1 cursor-pointer`} onClick={()=>switchTarget(item.id)}/>}</>:<></>
                  }
                  <ClockIcon className={`rounded-full bg-orange-400 text-white w-5 h-5 p-1 cursor-pointer`} onClick={()=>{
                    if(item.id==timer) return settimer(null)
                    return settimer(item.id)
                    }} />
                  <div className={`rounded-full bg-indigo-400 text-white w-5 h-5 p-1 cursor-pointer text-xs flex justify-center items-center`} onClick={()=>setip(item.id)}>IP</div>
                </div>
              </div>
            )
          })
        }
      </div>
      {/* panel */}
      <div className="w-[15%] h-full flex flex-col justify-center items-center space-y-2 py-2">
        <div draggable onDragStart={dragStart} id='0' className='w-24 p-1 h-48 rounded-md shadow-md border-gray-300 border flex flex-col justify-center items-center '>
          <img src={TargetImage} className="bg-cover w-full h-full" />
          <div className='w-full bg-slate-100 rounded-md flex space-x-1 justify-center p-1'>
            <SwitchVerticalIcon className={`rounded-full bg-green-400 text-white w-5 h-5 p-1 cursor-pointer`} />
            <ClockIcon className={`rounded-full bg-orange-400 text-white w-5 h-5 p-1 cursor-pointer`} />
            <TrashIcon className={`rounded-full bg-red-400 text-white w-5 h-5 p-1 cursor-pointer`} />
          </div>
        </div>
        <div className='flex space-x-2 w-full h-40 justify-center items-center border-y border-slate-500 cursor-pointer'>
          {!play&&<PlayIcon className={`rounded-full bg-indigo-400 text-white w-14 h-14 p-1 `} onClick={playAction}/>}
          {play&&<StopIcon className={`rounded-full bg-red-400 text-white w-14 h-14 p-1 `} onClick={stopAction}/>}
          {play?<p className='text-gray-300 text-2xl select-none'>Stop</p>:<p className='text-gray-300 text-2xl select-none'>Play</p>}
          {/* <CogIcon className={`rounded-full bg-gray-400 text-white w-7 h-7 p-1 cursor-pointer`} />   */}
        </div>
        <div className='w-full h-full flex flex-col relative overflow-y-auto px-2 space-y-1'>
          <p className='underline text-sm text-slate-400 self-end cursor-pointer' onClick={()=>settarget([])}>Clear</p>
          {target?.map(item=>
          <div className='flex justify-between px-2 py-1 rounded-md border border-slate-400 w-full h-auto' >
            <p className='text-xs font-semibold text-gray-300 select-none cursor-pointer' onClick={()=>setip(item.id)}>Target {item.id}</p>
            <div className='flex space-x-1'>
              {item.status?<SwitchVerticalIcon className={`bg-green-400 rounded-full text-white w-5 h-5 p-1 cursor-pointer`} onClick={()=>switchTarget(item.id)}/>:<SwitchVerticalIcon className={`bg-red-400 rounded-full text-white w-5 h-5 p-1 cursor-pointer`} onClick={()=>switchTarget(item.id)}/>}
              <ClockIcon className={`rounded-full bg-orange-400 text-white w-5 h-5 p-1 cursor-pointer`} onClick={()=>{
                if(item.id==timer) return settimer(null)
                return settimer(item.id)
                }} />
              <TrashIcon className={`rounded-full bg-red-400 text-white w-5 h-5 p-1 cursor-pointer`} onClick={()=>deleteTarget(item.id)}/>
            </div>
          </div>)}
        </div>
        <div className='w-full h-[35rem] border-t border-white p-2 flex flex-col items-center space-y-1'>
          <p className='text-white'>Save Session </p>
          <div className='p-1 rounded-lg border border-violet-200 w-36 bg-white'><input className='outline-none w-full' value={namasesi} placeholder="Nama" type="text" onChange={(e)=> setnamasesi(e.target.value)}/></div>
          {validation&&<p className='text-sm text-red-400'>{validation}</p>}
          <button className='bg-green-400 rounded-lg px-2 text-white font-semibold' onClick={validationSession}>Save</button>
          <div className='mt-1 flex flex-wrap gap-2 w-full'>
            {
              save?.map((val,index)=><div key={index} onClick={()=>{
                setselected(val.nama)
                settarget(val.target)
              }} className={`mt-2 cursor-pointer rounded-lg flex items-center space-x-1 px-2 ${selected===val.nama?'text-white bg-orange-400':'text-gray-500 bg-violet-100'}`}>
                <p>{val.nama}</p>
                <XIcon className={`${selected===val.nama?'text-white bg-red-400':'text-gray-500'} rounded-full w-4 h-4`} onClick={()=>deleteSession(val.nama)}/>
                </div>)
            }
          </div>
        </div>
      </div>

      
    </div>
  </div>
  </>);
}

export default App;
