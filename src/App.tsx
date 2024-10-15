import { FC, PropsWithChildren, useEffect, useRef, useState } from 'react'
import cx from 'classnames'
import './App.css'
const tabs = ['tab1', 'tab2', 'tab3']
interface CompProps {
  name: string
  className?: string
}

const Comp: FC<CompProps> = ({ name, className }) => {
  return (
    <div className={`w-full h-screen overflow-y-auto ${className || ''}`}>
      <div className="text-4xl h-52 font-semibold">{name}</div>
      <div className="w-full h-[2000px]"></div>
    </div>
  )
}
interface FadeInInterface {
  in: boolean
  hidden?: boolean
  className?: string
}
const FadeIn: FC<PropsWithChildren<FadeInInterface>> = ({
  in: visible,
  children,
  hidden,
  className,
}) => {
  return (
    <div
      className={cx(
        'transition-opacity duration-1000',
        visible ? 'opacity-100 z-10' : 'opacity-0 z-0',
        hidden ? 'hidden' : 'block',
        className
      )}
    >
      {children}
    </div>
  )
}

// const useDebounceValue = (value: any, time = 500) => {
//   const [debounceValue, setDebounceValue] = useState(value)
//   const timeRef = useRef<any>()
//   useEffect(() => {
//     timeRef.current = setTimeout(() => {
//       setDebounceValue(value)
//     }, time)

//     return () => clearTimeout(timeRef.current)
//   }, [value, time])

//   return debounceValue
// }

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
    }, 0)
  }

  const timerRef = useRef<ReturnType<typeof setTimeout>>()

  useEffect(() => {
    timerRef.current = setTimeout(() => {
      const data: Record<string, boolean> = {}
      tabs.forEach((tab, i) => {
        data[tab] = false
        if (i === current) data[tab] = true
      })
      setActiveTab(data)
    }, 3000)

    return () => clearTimeout(timerRef.current)
  }, [current])

  return (
    <div>
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
      <div className="relative w-full">
        {tabs.map((tab, i) => {
          return (
            <FadeIn
              key={tab}
              className="absolute w-full top-0 left-0"
              in={current === i}
              hidden={!activeTab[tabs[i]]}
            >
              {renderComponent(i)}
            </FadeIn>
          )
        })}
      </div>
    </div>
  )
}

export default App
