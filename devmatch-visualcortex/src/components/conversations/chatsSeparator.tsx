import HorizontalSeparator from '@/components/ui/separators/horizontalSeparator'

const ChatsSeparator = () => {
  return (
    <div className="relative p-2 select-none">
        <div className="-top-0.5 left-0 absolute flex justify-center items-center w-full"><span className="bg-[oklch(60%_0_0)] shadow shadow-glass-shadow-heavy p-0.5 px-4 rounded-xl text-xs">2 days ago</span></div>
        <HorizontalSeparator />
      </div>
  )
}

export default ChatsSeparator
