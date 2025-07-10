import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { CommandDialog, CommandInput, CommandItem, CommandList } from '@/components/ui/command'
import { SearchIcon } from 'lucide-react';


const DashboardCommand = () => {

  const [open, setOpen] = useState(false)

  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault()
        setOpen(open => !open)
      }
    }

    document.addEventListener("keydown", down)
    return () => document.removeEventListener("keydown", down)
  }, [])



  return (
    <>
      <Button
        className="h-9 w-[240px] justify-start font-normal text-muted-foreground hover:text-muted-foreground"
        variant="outline"
        size="sm"
        onClick={() => setOpen(open => !open)}
      >
        <SearchIcon size={16} />
        Search
        <kbd className="ml-auto pointer-events-none inline-flex h-5 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-xs font-medium text-muted-foreground">
          <span className="text-xs">&#8984;K</span>
        </kbd>
      </Button>
      <CommandDialog open={open} onOpenChange={setOpen}>
        <CommandInput placeholder='Find a meeting or agent' />
        <CommandList>
          <CommandItem>Test</CommandItem>
        </CommandList>
      </CommandDialog>
    </>
  )
}

export default DashboardCommand