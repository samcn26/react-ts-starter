import { FC, PropsWithChildren, useEffect, useRef, useState } from 'react'
import cx from 'classnames'
import './App.css'
const tabs = ['tab1', 'tab2', 'tab3']
const Comp = ({ name, className }: any) => {
  return (
    <div className={`w-full h-screen overflow-y-auto ${className || ''}`}>
      <div className="w-full h-[2000px]"></div>
      <div className="text-4xl h-52 font-semibold">{name}</div>
    </div>
  )
}
interface FadeInInterface {
  in: boolean
  hidden: boolean
}
const FadeIn: FC<PropsWithChildren<FadeInInterface>> = ({
  in: visible,
  children,
  hidden,
}) => {
  return (
    <div
      className={`transition-opacity duration-500 ${visible ? 'opacity-100 z-10' : 'opacity-0 z-0'} ${hidden ? 'hidden' : 'block'}`}
    >
      {children}
    </div>
  )
}

function App() {
  const [current, setCurrent] = useState(0)
  const [loadDic, setLoadDic] = useState({ [tabs[current]]: true })
  // optimize display none
  const [activeTab, setActiveTab] = useState({ [tabs[current]]: true })
  const renderComponent = (i: number) => {
    const tab = tabs[i]
    if (!loadDic[tab]) return null // 如果条件不满足，返回 null
    // const condition = i===current && loadDic[tab] === true // 修改为使用 tab 作为键
    switch (tab) {
      case 'tab1':
        return <Comp name={tab} className="bg-pink-500" />
      case 'tab2':
        return <Comp name={tab} className="bg-yellow-500" />
      case 'tab3':
        return <Comp name={tab} className="bg-blue-500" />
      default:
        return <Comp name={tab} className="bg-pink-500" />
    }
  }
  const handleClick = (i: number) => {
    if (i === current) return
    const prvTab = current
    // lazyload
    if (!loadDic[i]) {
      setLoadDic((prv) => ({
        ...prv,
        [tabs[i]]: true,
      }))
    }
    // 打开active限制
    setActiveTab((prv) => ({
      ...prv,
      [tabs[i]]: true,
    }))

    setTimeout(() => {
      setCurrent(i)
    }, 0);
  }

  const timerRef = useRef<any>()

  useEffect(() => {
    clearTimeout(timerRef.current)
    timerRef.current = setTimeout(() => {
      const data: any = {}
      tabs.forEach((tab, i) => {
        data[tab] = false
        if(i === current) data[tab] = true
      })
      setActiveTab(data)
    }, 500);

  }, [current])


  return (
    <div className="overflow-hidden">
      {
        <div className="flex space-x-4">
          {tabs.map((tab, i) => (
            <button
              key={tab}
              className={`p-2 rounded ${current === i ? 'bg-gray-300' : 'bg-gray-200'}`}
              onClick={() => {
                handleClick(i)
              }}
            >
              {tab}
            </button>
          ))}
        </div>
      }
      {tabs.map((tab, i) => {
          return (
            <div key={tab} className='absolute w-full'>
              <FadeIn in={current === i} hidden={!activeTab[tabs[i]]}>
                {renderComponent(i)}
              </FadeIn>
            </div>
          )
        })}
    </div>
  )
}

export default App
