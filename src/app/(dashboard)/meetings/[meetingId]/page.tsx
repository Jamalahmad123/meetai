

interface Props {
  params: Promise<{ meetingId: string }>
}

const Page = async ({ params }: Props) => {
  const { meetingId } = await params


  return (
    <div>Meeting {meetingId}</div>
  )
}

export default Page